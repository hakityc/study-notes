# TypeScript常用方法和技巧

### 1. 使用枚举 (Enums)
枚举可以用来定义一组命名常量。这有助于提高代码的可读性和可维护性。

**示例:**
```typescript
enum HttpStatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500
}
```

### 2. 类型别名 (Type Aliases)
类型别名可以让您给一个类型起一个新的名字，这使得类型更加易读且易于理解。

**示例:**
```typescript
type UserId = string;
type UserName = string;

function getUser(userId: UserId): UserName {
  return "John Doe";
}
```

### 3. 交叉类型 (Intersection Types)
交叉类型允许您组合多种类型到一个类型中。

**示例:**
```typescript
interface Person {
  name: string;
}

interface Identifiable {
  id: number;
}

type IdentifiedPerson = Person & Identifiable;

const john: IdentifiedPerson = {
  name: "John Doe",
  id: 123
};
```

### 4. 联合类型 (Union Types)
联合类型允许您指定一个值可以是几种类型之一。

**示例:**
```typescript
function printId(id: number | string) {
  console.log(id);
}

printId(123); // OK
printId("abc"); // OK
```

### 5. 泛型 (Generics)
泛型可以帮助您创建可重用的组件，它们可以在不同的数据类型上工作。

**示例:**
```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
```

### 6. 接口继承 (Inheritance with Interfaces)
接口可以扩展其他接口，这有助于重用类型定义。

**示例:**
```typescript
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear: Bear = {
  name: "Teddy",
  honey: true
};
```

### 7. 类型保护 (Type Guards)
类型保护可以帮助您在运行时确定一个值的确切类型。

**示例:**
```typescript
function isNumber(value: any): value is number {
  return typeof value === "number";
}

function handleValue(x: number | string) {
  if (isNumber(x)) {
    console.log(x.toFixed());
  } else {
    console.log(x.toUpperCase());
  }
}
```

### 8. 声明合并 (Declaration Merging)
声明合并允许您合并多个具有相同名称的接口或类型声明。

**示例:**
```typescript
interface Options {
  title: string;
}

interface Options {
  author: string;
}

const options: Options = {
  title: "TypeScript in Action",
  author: "Boris Cherny"
};
```

### 9. 字符串模板字面量类型 (Template Literal Types)
字符串模板字面量类型可以用来创建基于字符串的类型。

**示例:**
```typescript
type EventName = "click" | "dblclick";

type Handler = (event: Event) => void;

type Events = {
  [K in EventName]: Handler;
};

const events: Events = {
  click: (event) => {},
  dblclick: (event) => {}
};
```

### 10. 可选链 (Optional Chaining)
可选链可以安全地访问嵌套属性而不用担心出现 `undefined` 或 `null` 错误。

**示例:**
```typescript
const obj = {
  innerObj: {
    value: 10
  }
};

console.log(obj.innerObj?.value); // 10
console.log(obj.nonExistent?.value); // undefined
```
