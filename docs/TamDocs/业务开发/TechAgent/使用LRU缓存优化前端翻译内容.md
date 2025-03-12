# 前端性能优化实践：巧用LRU缓存提升数据翻译效率

## 性能瓶颈的发现

在开发新闻数据导出功能时，我们遇到了一个典型的性能问题：当用户频繁点击导出按钮时，系统会重复调用翻译接口对标题和摘要进行中译英操作。这不仅造成了以下问题：

服务器资源浪费（相同内容重复翻译）

用户等待时间增加（每次导出都需要重新翻译）

API调用成本上升（按量计费的翻译服务）

以包含100条新闻的列表为例，每次导出需要发送200个翻译请求（标题+摘要），若用户连续点击3次导出，就会产生600次重复请求！

API调用成本上升（按量计费的翻译服务）

## 为什么使用 LRU 缓存？

LRU（最近最少使用）缓存是一种常见的缓存管理策略，能够自动删除最久未被访问的数据，确保缓存中的数据保持高效且不会占用过多内存。相比普通 Map 缓存，LRU 具备以下优点：

- **自动清理旧数据**，防止缓存无限增长
- **提高命中率**，优先保留最常用的数据
- **优化性能**，减少不必要的 API 调用

在翻译场景中，我们可以使用 LRU 缓存存储翻译结果，避免重复翻译，提高应用的响应速度。

---

## 代码实现

### 1. LRU 缓存工具hook

首先实现LRU 缓存工具hook。

```typescript
export const useLRUCache = () => {
    const maxSize = 100;
    const cache = shallowRef(new Map<string, string>());

    // 添加或更新缓存，并在超过容量时移除最久未使用的项
    const setCache = (key: string, value: string) => {
        // 如果 key 已存在，先删除以便后续重新插入，保证最新顺序
        if (cache.value.has(key)) {
            cache.value.delete(key);
        }
        cache.value.set(key, value);
        // 当缓存大小超过限制，删除最早插入的那个键（即最久未使用的）
        if (cache.value.size > maxSize) {
            const firstKey = cache.value.keys().next().value || '';
            cache.value.delete(firstKey);
        }
    };

    // 获取缓存数据，同时更新其使用顺序
    const getCache = (key: string) => {
        if (!cache.value.has(key)) return null;
        const value = cache.value.get(key) || '';
        // 删除后重新插入，使其成为最新使用的项
        cache.value.delete(key);
        cache.value.set(key, value);
        return value;
    };

    const clearCache = () => {
        cache.value.clear();
    };

    return {
        cache,
        setCache,
        getCache,
        clearCache,
    };
};
```

### 2. 在 Vue 组件中使用 LRU 缓存

```typescript
<script lang="ts" setup>
const titleCache = new LRUCache(1000);
const abstractCache = new LRUCache(1000);

const handleTranslate = async () => {
  translateLoading.value = true;

  const translationBatch = {
    titles: [] as string[],
    titleIndices: [] as number[],
    abstracts: [] as string[],
    abstractIndices: [] as number[],
  };

  dataList.value.forEach((item, index) => {
    if (!titleCache.get(item.title)) {
      translationBatch.titles.push(item.title);
      translationBatch.titleIndices.push(index);
    }
    if (!abstractCache.get(item.abstract)) {
      translationBatch.abstracts.push(item.abstract);
      translationBatch.abstractIndices.push(index);
    }
  });

  const [translatedTitles, translatedAbstracts] = await Promise.all([
    translationBatch.titles.length > 0
      ? translateMultipleText({ texts: translationBatch.titles, to: "english", from: "chinese_simplified" })
      : Promise.resolve([]),
    translationBatch.abstracts.length > 0
      ? translateMultipleText({ texts: translationBatch.abstracts, to: "english", from: "chinese_simplified" })
      : Promise.resolve([]),
  ]);

  translatedTitles.forEach((text, index) => {
    titleCache.set(translationBatch.titles[index], text);
  });
  translatedAbstracts.forEach((text, index) => {
    abstractCache.set(translationBatch.abstracts[index], text);
  });

  const translatedData = dataList.value.map((item) => {
    return {
      ...item,
      title_en: titleCache.get(item.title) || "",
      abstract_en: abstractCache.get(item.abstract) || "",
    };
  });

  translateLoading.value = false;
  return translatedData;
};
</script>
```

---

## 关键优化点

### 1. **LRU 缓存策略**

- **自动清理旧缓存**，防止内存溢出。
- **限制缓存最大条目**，默认最多存储 1000 条。
- **更新访问时间**，最近使用的内容优先保留。

### 2. **批量处理**

- 只翻译**未缓存**的内容，减少 API 请求。
- 批量提交翻译请求，提升效率。
- 结合缓存结果，整合最终翻译数据。

### 3. **性能提升**

- 相同文本仅翻译一次，**避免重复调用 API**。
- **减少网络请求**，优化用户体验。
- **缓存命中率高**，常见翻译内容几乎不会重新请求。

### 4. **可靠性增强**

- 处理空字符串，避免错误。
- **保持数据不可变性**，确保原始数据不受影响。
- **正确映射缓存结果**，避免数据错乱。

---

## 适用场景

该优化方案适用于以下情况：

✅ **数据重复率高**：

- 例如用户导出数据时，相同内容可能多次出现。

✅ **频繁预览翻译内容**：

- 翻译结果无需反复请求，可直接命中缓存。

✅ **网络环境较差**：

- 通过减少 API 请求，优化加载速度。

✅ **大规模翻译需求**：

- 在处理大量文本翻译时，降低服务器压力，提高响应速度。

---

## 进一步优化

1. **调整缓存大小**
   - 可根据业务需求调整 `LRUCache` 的 `maxSize` 参数。

2. **持久化缓存**
   - 结合 `localStorage` 或 IndexedDB 存储缓存，跨页面复用。

3. **增加缓存统计**
   - 记录缓存命中率，分析缓存效果。

4. **哈希存储长文本**
   - 对较长的文本计算哈希值作为缓存键，避免冗余存储。

---

## 结论

通过引入 **LRU 缓存策略**，我们可以有效减少翻译 API 请求次数，提升翻译性能，优化用户体验。这种方法特别适用于**内容重复率较高的场景**，可显著降低系统负担，同时让翻译体验更流畅。

如果你的应用有类似的翻译需求，不妨尝试 LRU 缓存，相信它会带来不错的优化效果！🚀
