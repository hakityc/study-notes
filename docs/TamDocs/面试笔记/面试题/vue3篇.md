
# Vue3面试题

<script setup lang="ts">
    import AnswerBlock from '@/components/common/answer-block.vue'
</script>

## Vue3.0所采用的Composition Api与使用的Options Api有什么不同?

<AnswerBlock >

**核心区别**：  

- **逻辑组织**：Composition API按功能组织代码，Options API按选项组织  
- **复用机制**：Composition API通过自定义Hook复用逻辑，Options API依赖Mixin  
- **类型支持**：Composition API更友好的TypeScript支持  
- **this指向**：Composition API中无this，减少上下文问题  

**具体对比**：  

| 特性               | Options API                          | Composition API                          |
|--------------------|--------------------------------------|------------------------------------------|
| 代码组织           | 按data/computed/methods/watch分块    | 按功能逻辑聚合在setup函数中              |
| 逻辑复用           | Mixin（存在命名冲突和数据来源问题） | 自定义Hook（高内聚，无冲突）             |
| 响应式数据         | this.xxx直接访问                     | 通过ref/reactive显式创建响应式变量      |
| 类型推导           | 需要复杂的类型声明                   | 直接支持TypeScript类型推断               |
| 大型组件维护       | 碎片化代码导致可读性差               | 功能集中便于维护                         |

**示例代码**：  

```javascript
// Options API
export default {
  data() { return { count: 0 } },
  computed: { double() { return this.count * 2 } },
  methods: { increment() { this.count++ } }
}

// Composition API
import { ref, computed } from 'vue'
export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)
    const increment = () => count.value++
    return { count, double, increment }
  }
}
```

</AnswerBlock>

## Vue3设计目标是什么？做了哪些优化？

<AnswerBlock >

**设计目标**：更小、更快、更友好  

**核心优化**：  

1. **体积优化**  
   - Tree-shaking支持：按需引入API（如仅引入`ref`而非整个Vue包）  
   - 模块化拆分：将编译器、响应式系统等拆分为独立包  

2. **性能优化**  
   - **编译优化**：静态提升、事件监听缓存、SSR优化  
   - **响应式系统**：基于Proxy替代Object.defineProperty，支持动态属性检测  
   - **Diff算法**：引入PatchFlag标记静态节点，减少比较范围  

3. **开发者体验优化**  
   - Composition API：逻辑复用更灵活  
   - TypeScript原生支持  
   - 更友好的错误提示  

**响应式系统对比**：  

```javascript
// Vue2实现
Object.defineProperty(obj, 'key', {
  get() { /* 依赖收集 */ },
  set() { /* 触发更新 */ }
})

// Vue3实现
const proxy = new Proxy(obj, {
  get(target, key) { /* 依赖收集 */ },
  set(target, key, value) { /* 触发更新 */ }
})
```

</AnswerBlock>

## 用Vue3.0实现一个Modal组件的设计思路？

<AnswerBlock >

**实现步骤**：  

1. **目录结构**  

   ```
   ├── plugins/
   │   └── modal/
   │       ├── Modal.vue    # 核心组件
   │       ├── index.ts     # 插件入口
   │       ├── config.ts    # 配置项
   │       └── locale/      # 多语言支持
   ```

2. **核心组件设计**  
   - 使用Teleport组件将模态框挂载到body  
   - 支持多种内容类型：字符串、渲染函数、JSX  
   - 可配置标题、确认/取消按钮、加载状态  

3. **API设计**  
   - 组件形式：通过`v-model`控制显示状态  
   - 函数形式：`app.config.globalProperties.$modal.show()`  
   - 事件处理：通过`onConfirm`/`onCancel`回调  

4. **事件处理**  

   ```javascript
   // Modal.vue
   const handleConfirm = () => {
     emit('update:modelValue', false)
     props.onConfirm?.()
   }
   ```

5. **响应式实现**  

   ```javascript
   // 使用Composition API管理状态
   import { reactive, toRefs } from 'vue'
   const state = reactive({
     visible: false,
     title: '',
     content: ''
   })
   ```

</AnswerBlock>

## Vue3编译阶段做了哪些优化？

<AnswerBlock >

**主要优化点**：  

1. **静态提升**  
   - 将静态节点提升到渲染函数外，避免重复创建  

   ```javascript
   // 优化前
   _createVNode("div", null, "静态文本")
   
   // 优化后
   const _hoisted_1 = /*#__PURE__*/_createVNode("div", null, "静态文本")
   ```

2. **事件监听缓存**  
   - 缓存事件处理函数，避免每次渲染重新生成  

   ```javascript
   _createVNode("button", { onClick: _cache[0] || (_cache[0] = (...args) => onClick(...args)) })
   ```

3. **SSR优化**  
   - 生成更高效的服务器端渲染代码  

   ```javascript
   _push(`<div>${_ssrInterpolate(state.message)}</div>`)
   ```

4. **PatchFlag标记**  
   - 通过枚举标记不同类型的动态节点，减少diff范围  

   ```javascript
   export const enum PatchFlags {
     TEXT = 1,
     CLASS = 1 << 1,
     STYLE = 1 << 2
   }
   ```

</AnswerBlock>

## Vue3响应式系统为什么用Proxy替代Object.defineProperty？

<AnswerBlock >

**Proxy优势**：  

1. **支持动态属性**  
   - 可检测对象属性的添加/删除  

   ```javascript
   const obj = reactive({})
   obj.foo = 'bar' // 触发响应
   delete obj.foo  // 触发响应
   ```

2. **深层响应式**  
   - 仅在访问嵌套属性时递归代理，避免性能损耗  

   ```javascript
   const state = reactive({ a: { b: 1 } })
   state.a.b = 2 // 自动代理a对象
   ```

3. **支持数组变异方法**  
   - 直接拦截数组的push/pop/splice等方法  

   ```javascript
   const arr = reactive([1, 2, 3])
   arr.push(4) // 触发响应
   ```

4. **更全面的拦截能力**  
   - 支持13种拦截操作（如hasOwnProperty、deleteProperty等）  

**性能对比**：  

| 操作类型       | Object.defineProperty | Proxy |
|----------------|-----------------------|-------|
| 初始化对象     | O(n)                  | O(1)  |
| 深层对象遍历   | 递归性能损耗          | 按需代理 |
| 数组操作       | 需重写方法            | 原生支持 |

</AnswerBlock>

## Vue3.0中Tree-shaking特性如何实现？举例说明？

<AnswerBlock >

**实现原理**：  

- 基于ES6模块的静态分析  
- 打包工具（如Webpack/Rollup）检测未使用的导出  
- Vue3将API拆分为独立模块（如`ref`、`computed`）  

**示例代码**：  

```javascript
// 仅引入需要的API
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
```

**打包体积对比**：  

| 代码示例               | Vue2体积（Gzipped） | Vue3体积（Gzipped） |
|------------------------|--------------------|--------------------|
| 基础组件               | 1.01KB             | 0.93KB             |
| 使用computed/watch     | 1.04KB             | 1.00KB             |

**带来的好处**：  

- 减少冗余代码，提升加载速度  
- 便于长期维护和架构优化  
- 支持更细粒度的按需引入

</AnswerBlock>
