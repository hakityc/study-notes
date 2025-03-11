# JavaScript面试题

<script setup lang="ts">
    import AnswerBlock from '@/components/common/answer-block.vue'
</script>

## JavaScript基本类型和引用类型有哪些，存储上有什么区别？

<AnswerBlock >

**基本类型**：Number、String、Boolean、Undefined、null、Symbol  
**引用类型**：Object、Array、Function、Date、RegExp等  

**存储区别**：  

- 基本类型值存储在**栈内存**，复制时直接复制值  
- 引用类型值存储在**堆内存**，栈中存储内存地址，复制时复制地址  
- 基本类型值不可变，引用类型值可变
</AnswerBlock>

## 说说你了解的js数据结构？

<AnswerBlock>

常见数据结构：  

1. **数组**：连续内存空间存储数据  
2. **链表**：非连续内存存储，适合频繁插入/删除  
3. **栈**：LIFO（后进先出），常用push/pop操作  
4. **队列**：FIFO（先进先出），常用enqueue/dequeue操作  
5. **字典**：键值对存储，类似对象  
6. **散列表**：基于哈希函数实现快速查找  
7. **树**：层级结构，如二叉树、红黑树  
8. **图**：节点和边组成的网络结构  
9. **堆**：特殊的树结构，用于优先队列
</AnswerBlock>

## DOM常见的操作有哪些？

<AnswerBlock>
<template #tip>

**创建**、**增删改查**、属性、样式、事件
</template>

**DOM操作分类**：  

1. **创建节点**：createElement、createTextNode、createDocumentFragment  
2. **添加节点**：appendChild、insertBefore  
3. **删除节点**：removeChild
4. **更新节点**：textContent、innerText、innerHTML、setAttribute  
5. **获取节点**：getElementById、querySelector、getElementsByClassName
6. **属性操作**：getAttribute、hasAttribute  
7. **样式操作**：style属性、classList  
8. **事件绑定**：addEventListener、onclick  

<template #expansion>

1. textContent、innerText 和 innerHTML 区别
   - textContent：只返回文本，包含 `<script>` 和 `<style>` 内容，不解析标签，性能好且安全，不考虑样式
   - innerText：只返回可见文本，忽略 `<script>` 和 `<style>` 内容，不解析标签，性能稍差，考虑样式
   - innerHTML：返回含标签的完整 HTML 内容，解析标签，性能差，直接使用用户输入有 XSS 风险

</template>
</AnswerBlock>

## 说说你对BOM的理解，常见的BOM对象你了解哪些？

<AnswerBlock>
<template #tip>

路由、浏览器信息、宽高、DOM树、打印、定时器

</template>

**BOM（浏览器对象模型）**：  

- 用于与浏览器窗口交互的API  
- 顶级对象是`window`，包含以下常用对象：  
  - **location**：获取/操作URL（href、search、hash）  
  - **history**：操作浏览历史（back、forward、go）  
  - **navigator**：获取浏览器信息（userAgent、language）  
  - **screen**：获取屏幕信息（width、height）  
  - **document**：DOM树的入口  
  - **console**：控制台输出  
  - **setTimeout/setInterval**：定时器  
</AnswerBlock>

## ==和===区别，分别在什么情况使用？

<AnswerBlock>
<template #tip>

类型转换

</template>

**区别**：  

- `==`：宽松相等，会进行类型转换  
- `===`：严格相等，必须类型和值都相同  

**使用场景**：  

- 推荐优先使用`===`避免类型转换陷阱  
- 以下情况可使用`==`：  
  - 判断`null`/`undefined`（`obj == null`）  
  - 表单未初始化字段（`value == ''`）  
  - 特定业务逻辑需要类型转换时
</AnswerBlock>

## typeof与instanceof区别？

<AnswerBlock>

**区别**：  

- `typeof`：返回原始类型字符串（对引用类型除函数外都返回"object"）  
- `instanceof`：检查对象是否是某个构造函数的实例  

**示例**：  

```javascript
typeof null // "object"
typeof [] // "object"
typeof function(){} // "function"

[] instanceof Array // true
{} instanceof Object // true
```

**注意**：  

- `typeof`无法准确判断复杂引用类型  
- `instanceof`无法判断基本类型  
- 精确判断可用`Object.prototype.toString.call()`
</AnswerBlock>

## JavaScript原型与原型链的特点是什么？

<AnswerBlock>

**原型特点**：  

- 每个函数都有`prototype`属性，指向原型对象  
- 原型对象默认有`constructor`属性指向构造函数  
- 实例对象通过`__proto__`访问原型  

**原型链特点**：  

- 实例对象通过`__proto__`层层向上查找属性  
- 最终指向`Object.prototype`，其`__proto__`为`null`  
- 原型链实现了继承机制  
- 修改原型对象会影响所有实例
</AnswerBlock>

## 说说你对作用域链的理解？

<AnswerBlock>

**作用域链**：  

- 函数执行时创建的作用域层级链  
- 查找变量时从当前作用域开始，逐层向上查找  
- 包含：  
  - 全局作用域  
  - 函数作用域（闭包形成作用域链）  
  - 块级作用域（ES6引入`let`/`const`）  

**特点**：  

- 词法作用域（静态作用域）在定义时确定  
- 作用域链决定了变量的可见性  
- 闭包会保持作用域链不被释放
</AnswerBlock>

## 谈谈this对象的理解？

<AnswerBlock>

**this的绑定规则**：  

1. **默认绑定**：独立函数调用时指向`window`（严格模式`undefined`）  
2. **隐式绑定**：对象方法调用时指向调用对象  
3. **显式绑定**：`call`/`apply`/`bind`指定this  
4. **new绑定**：构造函数调用时指向新创建的对象  
5. **箭头函数**：继承外层作用域的this  

**优先级**：`new` > `call/apply/bind` > 隐式绑定 > 默认绑定  

**注意**：  

- 箭头函数没有自己的this  
- 事件处理函数的this指向触发元素  
- 闭包中的this取决于定义时的作用域
</AnswerBlock>

## 说说new操作符具体干了什么？流程是怎样的？如何手写？

<AnswerBlock>

**new操作符流程**：  

1. 创建空对象`obj`  
2. 设置`obj.__proto__ = 构造函数.prototype`  
3. 执行构造函数，绑定this为obj  
4. 返回obj（若构造函数返回对象则使用该对象）  

**手写实现**：  

```javascript
function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}
```

</AnswerBlock>

## bind、call、apply区别？如何实现一个bind？

<AnswerBlock>

**区别**：  

- `call`：立即执行，参数列表传递  
- `apply`：立即执行，数组形式传参  
- `bind`：返回新函数，可延迟执行  

**手写bind**：  

```javascript
Function.prototype.myBind = function(context, ...args) {
  const self = this;
  return function(...newArgs) {
    return self.apply(this instanceof self ? this : context, [...args, ...newArgs]);
  };
};
```

</AnswerBlock>

## JavaScript中执行上下文和执行栈是什么？

<AnswerBlock>

**执行上下文**：  

- 代码执行时的环境，包含：  
  - 变量对象（存储变量、函数声明）  
  - 作用域链  
  - this指向  

**类型**：  

1. 全局执行上下文（1个）  
2. 函数执行上下文（每个函数调用创建）  
3. eval执行上下文（不建议使用）  

**执行栈**：  

- 后进先出（LIFO）的栈结构  
- 存储执行上下文  
- 每次函数调用压入新上下文，执行完毕弹出  
</AnswerBlock>

## 说说JavaScript中的事件模型？

<AnswerBlock>

**事件流阶段**：  

1. 捕获阶段（从window到目标元素）  
2. 目标阶段（事件触发元素）  
3. 冒泡阶段（从目标元素到window）  

**事件模型**：  

1. **DOM0级**：直接绑定（`onclick`），单事件绑定  
2. **DOM2级**：`addEventListener`，支持多事件和阶段控制  
3. **IE模型**：`attachEvent`（已废弃）  

**事件委托**：  

- 利用事件冒泡减少事件绑定数量  
- 适合动态元素事件处理  
- 注意事件冒泡层级和性能
</AnswerBlock>

## 事件代理是什么？有哪些应用场景？

<AnswerBlock>

**事件代理**：  

- 将事件绑定到父元素，通过事件冒泡触发目标元素  

**应用场景**：  

1. 动态列表项事件处理  
2. 大量相似元素事件绑定  
3. 减少内存占用（尤其是移动端）  
4. 复杂层级结构中的事件处理  

**优缺点**：  

- 优点：减少事件绑定数，动态元素自动支持  
- 缺点：可能影响事件响应速度，需注意事件类型（如`focus`不冒泡）
</AnswerBlock>

## 说说你对闭包的理解？闭包使用场景有哪些？

<AnswerBlock>

**闭包定义**：  

- 函数内部嵌套函数，内部函数引用外部变量  

**特性**：  

- 延长变量生命周期  
- 形成私有作用域  

**使用场景**：  

1. 私有变量（模块模式）  
2. 函数柯里化  
3. 缓存计算结果（记忆函数）  
4. 事件处理函数保持状态  
5. 迭代器实现  

**注意**：  

- 过度使用可能导致内存泄漏  
- 闭包会增大内存开销  
- 箭头函数不会创建新的闭包作用域
</AnswerBlock>

## 概述JavaScript类型转换机制？

<AnswerBlock>

**类型转换分类**：  

1. **显式转换**：  
   - `Number()`：转换为数值  
   - `String()`：转换为字符串  
   - `Boolean()`：转换为布尔值  
   - `parseInt()`/`parseFloat()`：解析字符串为数字  

2. **隐式转换**：  
   - 算术运算（`+`、`-`等）  
   - 比较运算（`==`、`>`等）  
   - 逻辑判断（`if`、`&&`等）  

**转换规则**：  

- 字符串拼接使用`+`会触发转换  
- 布尔转换中`0`、`null`、`undefined`、`NaN`、`''`为`false`  
- 对象转换会先调用`valueOf()`，再调用`toString()`
</AnswerBlock>

## 深拷贝浅拷贝的区别？如何实现一个深拷贝？

<AnswerBlock>

**区别**：  

- 浅拷贝：复制对象引用，修改会影响原对象  
- 深拷贝：递归复制所有层级属性  

**实现方法**：  

1. **JSON方法**：`JSON.parse(JSON.stringify())`（不支持函数、循环引用）  
2. **递归实现**：  

   ```javascript
   function deepClone(obj) {
     if (typeof obj !== 'object' || obj === null) return obj;
     const clone = Array.isArray(obj) ? [] : {};
     for (const key in obj) {
       if (obj.hasOwnProperty(key)) {
         clone[key] = deepClone(obj[key]);
       }
     }
     return clone;
   }
   ```

3. **第三方库**：`lodash.cloneDeep`、`_.cloneDeep`  
4. **结构化克隆**：`structuredClone()`（现代浏览器支持）
</AnswerBlock>

## Javascript中如何实现函数缓存？函数缓存有哪些应用场景？

<AnswerBlock>

**实现方法**：  

1. **闭包缓存**：  

   ```javascript
   function memoize(fn) {
     const cache = new Map();
     return function(...args) {
       const key = JSON.stringify(args);
       if (cache.has(key)) return cache.get(key);
       const result = fn.apply(this, args);
       cache.set(key, result);
       return result;
     };
   }
   ```

2. **装饰器模式**  
3. **WeakMap优化**（避免内存泄漏）  

**应用场景**：  

1. 高频调用的计算密集型函数  
2. 递归优化（斐波那契数列等）  
3. 组件状态缓存  
4. 接口请求防抖  
5. 表单验证规则缓存
</AnswerBlock>

## JavaScript字符串的常用方法有哪些？

<AnswerBlock>

**常用方法**：  

1. **操作方法**：  
   - `concat()`：拼接字符串  
   - `slice()`/`substring()`/`substr()`：截取子串  
   - `trim()`/`trimStart()`/`trimEnd()`：去除空白  
   - `repeat()`：重复字符串  
   - `padStart()`/`padEnd()`：填充字符串  

2. **转换方法**：  
   - `split()`：分割字符串为数组  
   - `toLowerCase()`/`toUpperCase()`：大小写转换  

3. **查询方法**：  
   - `charAt()`：获取指定位置字符  
   - `indexOf()`/`lastIndexOf()`：查找子串位置  
   - `includes()`/`startsWith()`/`endsWith()`：判断包含关系  

4. **正则方法**：  
   - `match()`/`matchAll()`：匹配正则  
   - `search()`：查找匹配位置  
   - `replace()`：替换匹配内容  
</AnswerBlock>

## 数组的常用方法有哪些？

<AnswerBlock>

**常用方法**：  

1. **操作方法**：  
   - `push()`/`pop()`：末尾增删  
   - `shift()`/`unshift()`：头部增删  
   - `splice()`：任意位置增删  
   - `concat()`：合并数组  
   - `slice()`：截取数组  

2. **排序方法**：  
   - `sort()`：自定义排序  
   - `reverse()`：反转数组  

3. **迭代方法**：  
   - `forEach()`：遍历数组  
   - `map()`：映射新数组  
   - `filter()`：过滤数组  
   - `reduce()`：累计处理  
   - `some()`/`every()`：条件判断  

4. **查找方法**：  
   - `indexOf()`/`lastIndexOf()`：查找元素位置  
   - `find()`/`findIndex()`：按条件查找  

5. **其他方法**：  
   - `includes()`：判断包含  
   - `flat()`：数组扁平化  
   - `join()`：数组转字符串  
</AnswerBlock>

## 说说你对事件循环的理解？

<AnswerBlock>

**事件循环机制**：  

- JavaScript是单线程，通过事件循环处理异步操作  
- 执行栈处理同步任务，任务队列处理异步回调  

**任务分类**：  

- **宏任务**：`setTimeout`、`setInterval`、`I/O`、`UI渲染`  
- **微任务**：`Promise.then`、`MutationObserver`、`process.nextTick`（Node.js）  

**执行流程**：  

1. 执行同步任务  
2. 执行微任务队列  
3. 执行宏任务队列（每次执行一个宏任务后检查微任务）  

**async/await**：  

- `async`函数返回Promise  
- `await`暂停函数执行，等待Promise resolve  
- 微任务在`await`后立即执行  
</AnswerBlock>

## JavaScript本地存储有哪些方式？它们有什么区别和应用场景？

<AnswerBlock>

**存储方式对比**：  

| 特性          | Cookie          | localStorage      | sessionStorage    | indexedDB       |
|---------------|-----------------|-------------------|-------------------|-----------------|
| 存储大小      | 4KB             | 5-10MB            | 5-10MB            | 无限制          |
| 生命周期      | 自定义过期时间  | 永久              | 会话结束          | 永久            |
| 网络传输      | 自动携带        | 不参与            | 不参与            | 不参与          |
| 作用域        | 同源且同路径    | 同源              | 同源且同窗口      | 同源            |
| API复杂度     | 简单            | 简单              | 简单              | 复杂            |

**应用场景**：  

- Cookie：身份验证、跟踪用户行为  
- localStorage：长期保存配置、用户数据  
- sessionStorage：临时保存会话数据  
- indexedDB：大量数据存储（如离线应用）
</AnswerBlock>

## 大文件上传如何做断点续传？

<AnswerBlock>

**实现步骤**：  

1. **文件分片**：将文件分割为固定大小的块（如10MB）  
2. **生成唯一标识**：计算文件MD5或SHA-1哈希值  
3. **记录上传状态**：保存已上传的分片索引  
4. **分片上传**：并行上传分片，携带唯一标识和分片信息  
5. **断点续传**：检查已上传分片，跳过已完成部分  
6. **合并文件**：服务端按顺序合并所有分片  

**关键技术**：  

- `FileReader`读取文件  
- `XMLHttpRequest`/`Fetch`上传分片  
- `localStorage`记录上传进度  
- 服务端支持分片上传接口  

**优化点**：  

- 并行上传提高速度  
- 错误重试机制  
- 秒传（检查哈希值是否已存在）
</AnswerBlock>

## ajax原理是什么？如何实现？

<AnswerBlock>

**原理**：  

- 通过`XMLHttpRequest`对象异步获取数据  
- 无需刷新页面更新内容  
- 支持JSON、XML等数据格式  

**实现步骤**：  

1. 创建`XMLHttpRequest`对象  
2. 配置请求（`open()`方法）  
3. 监听状态变化（`onreadystatechange`）  
4. 发送请求（`send()`方法）  
5. 处理响应  

**示例代码**：  

```javascript
function ajax(url, options = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method || 'GET', url);
    
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(`HTTP error! status: ${xhr.status}`));
      }
    };
    
    xhr.onerror = () => reject(new Error('Network Error'));
    xhr.send(options.body);
  });
}
```

</AnswerBlock>

## 什么是防抖和节流？有什么区别？如何实现？

<AnswerBlock>

**防抖（Debounce）**：  

- 事件触发后延迟执行，期间多次触发会重新计时  
- 用于搜索框输入、窗口resize等  

**节流（Throttle）**：  

- 事件触发后固定时间内只执行一次  
- 用于滚动加载、高频点击等  

**区别**：  

- 防抖等待事件停止，节流控制执行频率  

**实现代码**：  

```javascript
// 防抖
function debounce(fn, delay = 100) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流
function throttle(fn, delay = 100) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      fn.apply(this, args);
      lastCall = now;
    }
  };
}
```

</AnswerBlock>

## 如何判断一个元素是否在可视区域？实现方式有哪些？用途和应用场景是什么？

<AnswerBlock>

**实现方式**：  

1. **getBoundingClientRect()**：  

   ```javascript
   function isInViewport(el) {
     const rect = el.getBoundingClientRect();
     return (
       rect.top >= 0 &&
       rect.left >= 0 &&
       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
     );
   }
   ```

2. **Intersection Observer API**：  

   ```javascript
   const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         console.log('元素进入可视区域');
       }
     });
   });
   observer.observe(element);
   ```

**用途与场景**：  

1. 图片懒加载  
2. 无限滚动加载  
3. 广告曝光统计  
4. 动画元素触发  
5. 预加载优化
</AnswerBlock>

## 什么是单点登录？如何实现？

<AnswerBlock>

**单点登录（SSO）**：  

- 用户只需登录一次即可访问多个关联系统  

**实现方式**：  

1. **同域实现**：  
   - 使用Cookie的`domain`属性共享登录状态  

2. **跨域实现**：  
   - **Token机制**：  
     1. 用户登录认证中心获取Token  
     2. 子系统通过Token验证身份  
   - **Cookie传递**：  
     1. 认证中心设置全局Cookie  
     2. 子系统读取该Cookie  

3. **OAuth2.0**：  
   - 通过授权码模式实现第三方登录  

**关键技术**：  

- JWT（JSON Web Token）  
- SSO服务器集中管理认证  
- 跨域通信（CORS、postMessage）  
</AnswerBlock>

## 如何实现上拉加载，下拉刷新？

<AnswerBlock>

**上拉加载**：  

1. 监听`scroll`事件  
2. 判断滚动到底部：  

   ```javascript
   window.addEventListener('scroll', () => {
     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
     const clientHeight = document.documentElement.clientHeight;
     const scrollHeight = document.documentElement.scrollHeight;
     if (scrollTop + clientHeight >= scrollHeight - 50) { // 提前50px加载
       loadMore();
     }
   });
   ```

**下拉刷新**：  

1. 监听`touchstart`、`touchmove`、`touchend`事件  
2. 计算滑动距离触发刷新  
3. 使用`transform`实现动画效果  

**第三方库**：  

- `better-scroll`（移动端）  
- `iscroll`  
- `PullToRefresh.js`  
</AnswerBlock>

## 正则表达式是什么？有哪些匹配规则和常用方法？应用场景有哪些？

<AnswerBlock>

**正则表达式**：  

- 用于匹配、搜索、替换字符串的模式  

**匹配规则**：  

1. **元字符**：`.`、`^`、`$`、`*`、`+`、`?`、`()`、`[]`、`{}`  
2. **量词**：`*`（0+）、`+`（1+）、`?`（0/1）、`{n}`（n次）  
3. **字符类**：`\d`、`\w`、`\s`、`\D`、`\W`、`\S`  
4. **断言**：`(?=...)`、`(?!...)`、`(?<=...)`、`(?<!...)`  
5. **标志**：`g`（全局）、`i`（不区分大小写）、`m`（多行）  

**常用方法**：  

- `test()`：测试匹配  
- `exec()`：执行匹配  
- `match()`：字符串匹配  
- `replace()`：替换匹配内容  
- `split()`：分割字符串  

**应用场景**：  

1. 表单验证（邮箱、手机号）  
2. URL解析  
3. 代码高亮  
4. 日志分析  
5. 搜索替换  
</AnswerBlock>

## 说说你对函数式编程的理解？优缺点有哪些？

<AnswerBlock>

**函数式编程（FP）**：  

- 以函数为核心，强调纯函数和不可变性  
- 避免副作用，通过组合函数实现复杂逻辑  

**核心概念**：  

1. **纯函数**：相同输入永远返回相同输出，无副作用  
2. **不可变性**：数据一旦创建不可修改  
3. **高阶函数**：接受或返回函数的函数  
4. **柯里化**：将多参数函数转换为单参数链  
5. **组合与管道**：通过函数组合实现复杂操作  

**优点**：  

- 可测试性强  
- 易于并行处理  
- 副作用可控  
- 代码复用性高  

**缺点**：  

- 学习曲线陡峭  
- 递归可能导致性能问题  
- 部分场景代码可读性下降  
</AnswerBlock>

## web常见的攻击方式有哪些？如何防御？

<AnswerBlock>

**常见攻击方式**：  

1. **XSS（跨站脚本攻击）**：  
   - 存储型、反射型、DOM型  
   - 防御：转义用户输入，使用`textContent`替代`innerHTML`  

2. **CSRF（跨站请求伪造）**：  
   - 利用用户已登录状态发送恶意请求  
   - 防御：验证Referer，使用CSRF Token  

3. **SQL注入**：  
   - 注入恶意SQL语句  
   - 防御：参数化查询，过滤特殊字符  

4. **DDOS攻击**：  
   - 分布式拒绝服务攻击  
   - 防御：CDN加速，流量清洗  

5. **文件上传漏洞**：  
   - 上传恶意脚本  
   - 防御：文件类型校验，限制上传目录  

**通用防御措施**：  

- 输入验证  
- 输出转义  
- 使用HTTPS  
- 安全头配置（CSP、X-Content-Type）  
- 定期安全审计  
</AnswerBlock>

## 什么是内存泄漏和垃圾回收？JavaScript中会在什么情况出现内存泄漏？

<AnswerBlock>

**内存泄漏**：  

- 不再使用的内存未被释放  

**垃圾回收（GC）**：  

- JavaScript自动管理内存，通过标记-清除算法回收  
- 引用计数（已废弃）  

**常见内存泄漏场景**：  

1. **意外的全局变量**：未声明的变量  
2. **闭包未释放**：闭包引用不再使用的变量  
3. **DOM引用未清理**：移除DOM元素后仍保留引用  
4. **定时器未清除**：`setTimeout`未调用`clearTimeout`  
5. **事件监听器未移除**：`addEventListener`未调用`removeEventListener`  
6. **循环引用**：对象间相互引用  
</AnswerBlock>

## Javascript如何实现继承？

<AnswerBlock>

**继承方式**：  

1. **原型链继承**：  

   ```javascript
   Child.prototype = new Parent();
   ```

   - 缺点：共享原型属性，无法传参  

2. **构造函数继承**：  

   ```javascript
   function Child() {
     Parent.call(this);
   }
   ```

   - 缺点：无法继承原型方法  

3. **组合继承**：  

   ```javascript
   function Child() {
     Parent.call(this);
   }
   Child.prototype = new Parent();
   ```

   - 缺点：调用两次构造函数  

4. **寄生组合继承**：  

   ```javascript
   function createObject(o) {
     function F() {}
     F.prototype = o;
     return new F();
   }
   Child.prototype = createObject(Parent.prototype);
   ```

   - 推荐方式  

5. **ES6类继承**：  

   ```javascript
   class Child extends Parent {
     constructor() {
       super();
     }
   }
   ```

</AnswerBlock>

## 说说Javascript数字精度丢失的问题，如何解决？

<AnswerBlock>

**精度丢失原因**：  

- JavaScript使用IEEE754双精度浮点数，最多精确到53位二进制  
- 小数转二进制可能无限循环，导致精度损失  

**典型问题**：  

```javascript
0.1 + 0.2 // 0.30000000000000004
```

**解决方案**：  

1. **转换为整数运算**：  

   ```javascript
   function add(a, b) {
     const factor = 10 ** Math.max(String(a).split('.')[1]?.length || 0, String(b).split('.')[1]?.length || 0);
     return (a * factor + b * factor) / factor;
   }
   ```

2. **使用第三方库**：  
   - `bignumber.js`  
   - `decimal.js`  

3. **四舍五入处理**：  

   ```javascript
   (0.1 + 0.2).toFixed(10) // "0.3"
   ```

4. **使用二进制浮点数库**：  
   - `binary.js`  
</AnswerBlock>

## 什么是递归和尾递归？有哪些应用场景？

<AnswerBlock>

**递归**：  

- 函数调用自身  

**尾递归**：  

- 递归调用在函数末尾，且返回值仅依赖递归调用结果  
- 可优化为常数空间复杂度  

**应用场景**：  

1. 树/图遍历（前序、中序、后序）  
2. 阶乘计算  
3. 斐波那契数列  
4. 数组扁平化  
5. 分治算法（快速排序、归并排序）  

**尾递归优化示例**：  

```javascript
function factorial(n, acc = 1) {
  if (n === 0) return acc;
  return factorial(n - 1, n * acc);
}
```

</AnswerBlock>
