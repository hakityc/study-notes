# TypeScript面试题

<script setup lang="ts">
    import AnswerBlock from '@/components/common/answer-block.vue'
</script>

## 说说你对TypeScript的理解？与JavaScript的区别？

<AnswerBlock >

### 1.1 是什么  

TypeScript是JavaScript的类型超集，支持ES6类、接口、继承、泛型等特性，提供静态类型检查，在编译阶段即可发现类型错误。它专为大型应用开发设计，最终需编译为JavaScript运行。

### 1.2 特性  

- **类型批注**：显式声明变量类型（如`let str: string`）。  
- **类型推断**：未声明类型时自动推断（如`let num = 123`推断为`number`）。  
- **接口**：定义对象结构（如`interface Person { name: string; age: number }`）。  
- **元组**：固定长度和类型的数组（如`let tuple: [string, number] = ['a', 1]`）。  
- **枚举**：预定义常数集合（如`enum Color { Red, Green }`）。  
- **泛型**：参数化类型（如`function returnItem<T>(para: T): T`）。  

### 1.3 区别  

| **特性**         | **TypeScript**                     | **JavaScript**                |  
|------------------|-----------------------------------|-------------------------------|  
| **类型系统**     | 静态类型检查                      | 动态类型（运行时检查）        |  
| **文件后缀**     | `.ts`/`.tsx`/`.dts`               | `.js`                        |  
| **模块支持**     | 支持ES模块和命名空间              | 仅ES6+支持模块               |  
| **编译阶段**     | 需要编译为JS                      | 直接运行                      |  
| **扩展性**       | 支持接口、抽象类等面向对象特性    | 基于原型链的简单扩展          |  

</AnswerBlock>

## TypeScript数据类型有哪些？与JavaScript的区别？

<AnswerBlock >

### 2.1 是什么  

TypeScript在JavaScript基础类型上扩展了更多类型，增强类型安全性。

### 2.2 数据类型  

- **基本类型**：`boolean`、`number`、`string`、`null`、`undefined`  
- **复杂类型**：`array`、`tuple`、`enum`、`any`、`void`、`never`、`object`  
- **高级类型**：交叉类型（`T & U`）、联合类型（`T | U`）、类型别名等  

### 2.3 区别  

- **静态检查**：TypeScript在编译时检查类型错误，JavaScript仅运行时检查。  
- **新增类型**：如`tuple`、`enum`、`void`、`never`等，增强类型表达能力。  
- **类型注解**：TypeScript支持显式类型声明，JavaScript依赖动态推断。  

</AnswerBlock>

## TypeScript高级类型有哪些？各有什么作用？

<AnswerBlock >

### 3.1 交叉类型（`T & U`）  

将多个类型合并为一个类型，包含所有类型的特性。  
**示例**：  

```typescript
interface A { a: string }
interface B { b: number }
type AB = A & B; // 同时拥有a和b属性
```

### 3.2 联合类型（`T | U`）  

允许变量为多种类型之一。  
**示例**：  

```typescript
type ID = string | number;
let userId: ID = "123"; // 或 123
```

### 3.3 类型别名  

为类型定义别名，简化复杂类型。  
**示例**：  

```typescript
type Callback = (data: any) => void;
```

### 3.4 类型约束  

通过`extends`限制泛型类型范围。  
**示例**：  

```typescript
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
```

### 3.5 映射类型  

基于已有类型创建新类型。  
**示例**：  

```typescript
type ReadonlyProps<T> = { readonly [P in keyof T]: T[P] };
```

### 3.6 条件类型  

根据条件选择类型。  
**示例**：  

```typescript
type TypeName<T> = T extends string ? "string" : T extends number ? "number" : "other";
```

</AnswerBlock>

## 说说你对TypeScript中接口的理解？应用场景？

<AnswerBlock >

### 4.1 是什么  

接口用于定义对象的结构（属性和方法），是类型检查的契约。支持继承和实现。

### 4.2 使用方式  

- **定义接口**：  

  ```typescript
  interface User {
    name: string;
    age?: number; // 可选属性
    readonly id: string; // 只读属性
  }
  ```

- **实现接口**：  

  ```typescript
  class Person implements User {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  ```

### 4.3 应用场景  

- **函数参数校验**：确保参数结构符合预期。  
- **React组件Props**：定义组件接收的属性类型。  
- **第三方库类型声明**：通过`.d.ts`文件为JS库添加类型支持。  

</AnswerBlock>

## 说说你对TypeScript中类的理解？与JavaScript类的区别？

<AnswerBlock >

### 5.1 是什么  

类是面向对象编程的基础，封装数据和方法。TypeScript扩展了ES6类，支持修饰符、抽象类等。

### 5.2 核心特性  

- **继承**：使用`extends`实现单继承。  

  ```typescript
  class Animal { move() { /* ... */ } }
  class Dog extends Animal { bark() { /* ... */ } }
  ```

- **修饰符**：  
  - `public`（默认）：公开访问  
  - `private`：仅类内部访问  
  - `protected`：类及子类访问  
- **静态成员**：通过`static`定义类级属性/方法。  
- **抽象类**：包含抽象方法，需子类实现。  

### 5.3 与JavaScript区别  

| **特性**       | **TypeScript**                     | **JavaScript**                |  
|----------------|-----------------------------------|-------------------------------|  
| **类型检查**   | 支持属性和方法的类型声明          | 无类型检查                    |  
| **修饰符**     | 支持`public`/`private`/`protected` | 无                          |  
| **抽象类**     | 支持                            | 不支持                        |  
| **编译阶段**   | 需要编译                          | 直接运行                      |  

</AnswerBlock>

## 说说你对TypeScript中枚举的理解？应用场景？

<AnswerBlock >

### 6.1 是什么  

枚举是一组命名常数的集合，用于替代魔法字符串或数字。

### 6.2 类型  

- **数字枚举**：  

  ```typescript
  enum Direction { Up, Down, Left, Right }
  // 自动赋值：Up=0, Down=1...
  ```

- **字符串枚举**：  

  ```typescript
  enum Status { Success = "success", Error = "error" }
  ```

- **异构枚举**：混合类型值。  

### 6.3 应用场景  

- **状态机**：定义明确的状态集合。  
- **配置选项**：替代硬编码的字符串或数字。  
- **提高可读性**：用命名常量替代魔术值。  

</AnswerBlock>

## 说说你对TypeScript中函数的理解？与JavaScript函数的区别？

<AnswerBlock >

### 7.1 是什么  

函数是可执行的代码块。TypeScript扩展了函数类型定义和重载能力。

### 7.2 核心特性  

- **类型声明**：  

  ```typescript
  function add(a: number, b: number): number { return a + b; }
  ```

- **可选参数**：使用`?`标记可选参数。  

  ```typescript
  function greet(name?: string) { /* ... */ }
  ```

- **剩余参数**：使用`...rest`接收多个参数。  

  ```typescript
  function sum(...nums: number[]): number { return nums.reduce((a, b) => a + b, 0); }
  ```

- **函数重载**：为同一函数定义不同参数类型。  

  ```typescript
  function format(input: string): string;
  function format(input: number): number;
  function format(input: any): any { return input; }
  ```

### 7.3 与JavaScript区别  

| **特性**       | **TypeScript**                     | **JavaScript**                |  
|----------------|-----------------------------------|-------------------------------|  
| **类型检查**   | 参数和返回值类型必须匹配          | 无类型限制                    |  
| **可选参数**   | 显式标记`?`                       | 依赖默认值或`undefined`        |  
| **重载**       | 支持                            | 不支持                        |  

</AnswerBlock>

## 说说你对TypeScript中泛型的理解？应用场景？

<AnswerBlock >

### 8.1 是什么  

泛型允许定义参数化类型，提高代码复用性和类型安全。

### 8.2 使用方式  

- **函数泛型**：  

  ```typescript
  function returnItem<T>(para: T): T { return para; }
  ```

- **接口泛型**：  

  ```typescript
  interface Container<T> { value: T; }
  ```

- **类泛型**：  

  ```typescript
  class Stack<T> { private items: T[] = []; }
  ```

### 8.3 应用场景  

- **工具函数**：如数组处理、数据映射等通用逻辑。  
- **React组件**：定义可复用组件的Props和State类型。  
- **第三方库开发**：提供类型安全的API。  

</AnswerBlock>

## 说说你对TypeScript装饰器的理解？使用场景？

<AnswerBlock >

### 9.1 是什么  

装饰器是一种元编程语法，用于修改类、方法、属性等的行为。

### 9.2 使用方式  

- **类装饰器**：  

  ```typescript
  function addAge(constructor: Function) {
    constructor.prototype.age = 18;
  }
  @addAge
  class Person { /* ... */ }
  ```

- **方法装饰器**：  

  ```typescript
  function readonly(target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false;
  }
  class MyClass {
    @readonly
    method() { /* ... */ }
  }
  ```

### 9.3 应用场景  

- **日志记录**：自动添加方法调用日志。  
- **权限控制**：验证方法调用权限。  
- **依赖注入**：管理类的依赖关系。  

</AnswerBlock>

## 说说对TypeScript中命名空间与模块的理解？区别？

<AnswerBlock >

### 10.1 模块  

- **ES模块**：使用`import`/`export`实现模块化。  
- **作用**：封装代码，避免全局污染，支持依赖管理。  

### 10.2 命名空间  

- **作用**：组织全局变量，解决命名冲突。  
- **示例**：  

  ```typescript
  namespace MathUtils {
    export function add(a: number, b: number) { return a + b; }
  }
  ```

### 10.3 区别  

| **特性**       | **模块**                         | **命名空间**                  |  
|----------------|----------------------------------|-------------------------------|  
| **作用域**     | 模块作用域（仅导出成员可见）     | 全局作用域（通过对象属性访问）|  
| **依赖管理**   | 显式`import`/`export`           | 无                          |  
| **推荐场景**   | 现代项目开发                    | 遗留代码或类型声明文件        |  

</AnswerBlock>

## 如何在React项目中应用TypeScript？

<AnswerBlock >

### 11.1 准备工作  

- 安装类型声明：  

  ```bash
  npm install @types/react @types/react-dom --save-dev
  ```

### 11.2 核心应用  

- **无状态组件**：  

  ```typescript
  interface Props { name: string; }
  const Greeting: React.FC<Props> = ({ name }) => <div>Hello {name}</div>;
  ```

- **有状态组件**：  

  ```typescript
  class Counter extends React.Component<{}, { count: number }> {
    state = { count: 0 };
    render() { return <button onClick={() => this.setState({ count: this.state.count + 1 })}>Count: {this.state.count}</button>; }
  }
  ```

- **事件处理**：  

  ```typescript
  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target);
  }
  ```

### 11.3 最佳实践  

- 使用`React.FC`定义函数组件，自动推断类型。  
- 为组件Props和State定义接口或类型别名。  
- 利用TypeScript类型检查增强表单验证和状态管理。  

</AnswerBlock>

## 如何在Vue项目中应用TypeScript？

<AnswerBlock >

### 12.1 准备工作  

- 安装依赖：  

  ```bash
  npm install vue-class-component vue-property-decorator --save
  ```

### 12.2 核心应用  

- **组件定义**：  

  ```typescript
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class HelloWorld extends Vue {
    message: string = 'Hello Vue!';
    count: number = 0;

    increment() {
      this.count++;
    }
  }
  ```

- **Props验证**：  

  ```typescript
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class MyComponent extends Vue {
    @Prop({ type: String, required: true })
    title!: string;
  }
  ```

- **计算属性**：  

  ```typescript
  get reversedMessage(): string {
    return this.message.split('').reverse().join('');
  }
  ```

### 12.3 最佳实践  

- 使用`vue-class-component`简化类组件写法。  
- 通过`vue-property-decorator`装饰器管理生命周期和事件。  
- 为Vue实例属性和方法添加类型声明，提升IDE支持。  

</AnswerBlock>
