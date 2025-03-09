# ES6面试题

<script setup lang="ts">
    import AnswerBlock from '@/components/common/answer-block.vue'
</script>

## 说说var、let、const之间的区别

<AnswerBlock>

**核心区别**：  

| 特性          | var                          | let                          | const                        |
|---------------|------------------------------|------------------------------|------------------------------|
| **作用域**    | 函数作用域                   | 块级作用域                   | 块级作用域                   |
| **变量提升**  | 存在（初始化前为`undefined`） | 不存在（暂时性死区）         | 不存在（暂时性死区）         |
| **重复声明**  | 允许                         | 不允许                       | 不允许                       |
| **可修改性**  | 允许                         | 允许                         | 不允许（引用类型可修改值）   |
| **全局对象**  | 绑定到`window`               | 不绑定                       | 不绑定                       |

**典型场景**：  

- `var`：遗留代码，需避免使用  
- `let`：块级作用域变量  
- `const`：常量或不希望被修改的引用  
</AnswerBlock>

## ES6中数组新增了哪些扩展？

<AnswerBlock>

**主要扩展**：  

1. **扩展运算符（...）**  
   - 合并数组：`[...arr1, ...arr2]`  
   - 解构赋值：`const [a, ...rest] = [1, 2, 3]`  
   - 转换类数组对象：`[...document.querySelectorAll('div')]`  

2. **构造函数新增方法**  
   - `Array.from()`：将类数组转为数组  
   - `Array.of()`：创建数组（避免`Array(3)`的歧义）  

3. **实例方法**  
   - `find()`/`findIndex()`：按条件查找元素  
   - `includes()`：检查元素是否存在  
   - `flat()`/`flatMap()`：数组扁平化  
   - `copyWithin()`：复制并替换元素  

4. **迭代方法**  
   - `keys()`、`values()`、`entries()`：返回迭代器  
   - `forEach()`：遍历数组  

**示例**：  

```javascript
const arr = [1, 2, [3, 4]];
arr.flat(); // [1, 2, 3, 4]
```  

</AnswerBlock>

## 函数新增了哪些特性？

<AnswerBlock>

**主要特性**：  

1. **参数默认值**  

   ```javascript
   function greet(name = 'Guest') { /* ... */ }
   ```  

2. **剩余参数（Rest Parameters）**  

   ```javascript
   function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }
   ```  

3. **箭头函数（Arrow Function）**  
   - 简洁语法：`const add = (a, b) => a + b;`  
   - 绑定外层`this`，无`arguments`对象  

4. **函数属性**  
   - `name`：返回函数名（包括`bind`后的名称）  
   - `length`：参数个数（忽略默认值和剩余参数）  

5. **严格模式**  
   - 参数默认值、解构赋值或扩展运算符存在时，函数内部不可显式声明严格模式  

**注意**：箭头函数不能作为构造函数，没有`prototype`属性。  
</AnswerBlock>

## 对象新增了哪些特性？

<AnswerBlock>

**主要特性**：  

1. **属性简写**  

   ```javascript
   const x = 1, y = 2;
   const obj = { x, y }; // { x: 1, y: 2 }
   ```  

2. **属性名表达式**  

   ```javascript
   const key = 'prop';
   const obj = { [key]: 'value' };
   ```  

3. **`Object.assign()`**  
   - 合并对象：`Object.assign(target, source1, source2)`  
   - 浅拷贝  

4. **`Object.is()`**  
   - 严格比较：`Object.is(NaN, NaN)` → `true`  

5. **`Object.entries()`/`Object.values()`**  
   - 遍历键值对或值  

6. **`Reflect` API**  
   - 操作对象属性的函数式方法：`Reflect.get(obj, 'key')`  

**示例**：  

```javascript
const obj = { a: 1, b: 2 };
Object.entries(obj); // [ ['a', 1], ['b', 2] ]
```  

</AnswerBlock>

## 如何理解Promise？使用场景？

<AnswerBlock>

**核心概念**：  

- **状态**：`pending` → `fulfilled`/`rejected`  
- **特点**：解决回调地狱，链式调用，统一异步处理  

**关键方法**：  

- `then()`：处理成功回调  
- `catch()`：处理错误  
- `finally()`：无论状态如何都会执行  

**构造函数方法**：  

- `all()`：等待所有Promise完成  
- `race()`：竞速，取最快完成的Promise  
- `resolve()`/`reject()`：创建已完成/拒绝的Promise  

**使用场景**：  

- 异步请求（如`fetch`）  
- 批量操作并行执行  
- 复杂流程控制  

**示例**：  

```javascript
fetchData()
  .then(data => process(data))
  .catch(error => handleError(error));
```  

</AnswerBlock>

## 如何理解ES6 Module？使用场景？

<AnswerBlock>

**核心特性**：  

- **静态导入导出**：编译时确定依赖关系  
- **模块化封装**：避免全局污染，增强代码复用性  

**语法**：  

```javascript
// 导出
export const name = 'ES6';
export default class Module {}

// 导入
import { name } from './module.js';
import Module from './module.js';
```  

**动态导入**：  

```javascript
import('./module.js').then(module => { /* ... */ });
```  

**使用场景**：  

- 大型项目代码拆分  
- 第三方库开发  
- 框架组件化（如React/Vue）  

**优势**：  

- 浏览器与Node.js通用  
- 支持Tree Shaking优化  
</AnswerBlock>

## 如何理解Generator？使用场景？

<AnswerBlock>

**核心概念**：  

- **函数暂停与恢复**：通过`yield`实现分步执行  
- **迭代器**：`next()`控制执行流程  

**关键特性**：  

- 函数声明带`*`：`function* gen() { yield 1; }`  
- 状态保存：暂停时保留上下文  

**异步处理**：  

```javascript
function* fetchData() {
  const res = yield fetch('https://api.example.com');
  const data = yield res.json();
  return data;
}
```  

**使用场景**：  

- 异步操作同步化（结合`co`库）  
- 数据流处理  
- Redux-Saga副作用管理  

**优势**：  

- 代码可读性高  
- 内存占用低（按需执行）  
</AnswerBlock>

## 如何理解Decorator？使用场景？

<AnswerBlock>

**核心概念**：  

- **动态扩展类/属性**：不修改原代码，添加功能  
- **语法**：`@decorator`装饰类或属性  

**典型应用**：  

- 日志记录  
- 权限验证  
- 依赖注入  

**示例**：  

```javascript
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Person {
  @readonly name = 'John';
}
```  

**注意**：  

- 装饰器提案处于Stage 2，需Babel编译  
- 类装饰器接收类作为参数，属性装饰器接收属性描述符  

**使用场景**：  

- React高阶组件简化  
- 表单验证  
- 性能监控  
</AnswerBlock>

## 如何理解Set和Map？与WeakSet/WeakMap的区别？

<AnswerBlock>

**Set**：  

- **特性**：元素唯一，无序存储  
- **方法**：`add()`、`delete()`、`has()`  
- **应用**：数组去重、成员检测  

**Map**：  

- **特性**：键值对，支持任意类型键  
- **方法**：`set()`、`get()`、`entries()`  
- **应用**：复杂键值存储  

**WeakSet/WeakMap**：  

- **弱引用**：键对象被垃圾回收时自动移除  
- **限制**：键必须为对象，不可遍历  

**区别对比**：  

| 类型       | 键类型       | 垃圾回收 | 遍历 | 应用场景                     |
|------------|--------------|----------|------|------------------------------|
| Set        | 任意类型     | 不影响   | 支持 | 成员唯一性检查               |
| WeakSet    | 对象         | 自动回收 | 不支持 | DOM节点关联数据             |
| Map        | 任意类型     | 不影响   | 支持 | 键值对存储                   |
| WeakMap    | 对象         | 自动回收 | 不支持 | 临时存储（避免内存泄漏）     |

</AnswerBlock>

## 如何理解Proxy？使用场景？

<AnswerBlock>

**核心概念**：  

- **对象代理**：拦截并自定义对象操作（如属性读写、函数调用）  
- **元编程**：在运行时修改对象行为  

**关键方法**：  

- `get()`：拦截属性读取  
- `set()`：拦截属性设置  
- `deleteProperty()`：拦截删除操作  

**示例**：  

```javascript
const handler = {
  get(target, key) {
    return key in target ? target[key] : 'default';
  }
};
const proxy = new Proxy({}, handler);
proxy.foo; // 'default'
```  

**使用场景**：  

- 数据验证  
- 日志监控  
- 观察者模式  

**优势**：  

- 非侵入式扩展  
- 细粒度控制对象行为  

</AnswerBlock>
