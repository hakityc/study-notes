# React面试题

<script setup lang="ts">
    import AnswerBlock from '@/components/common/answer-block.vue'
</script>

## 说说对React的理解？有哪些特性？

<AnswerBlock>

**React**是用于构建用户界面的JavaScript库，提供UI层面的解决方案。它遵循组件设计模式、声明式编程范式和函数式编程概念，将界面拆分为独立的组件，通过`render()`方法返回需展示的内容。

**核心特性**：

- **JSX语法**：允许在JavaScript中编写类XML代码
- **虚拟DOM**：通过内存中的对象模拟真实DOM结构
- **声明式编程**：只需描述UI状态，无需关注具体实现
- **组件化**：将UI拆分为可复用、可组合的独立单元
- **单向数据流**：数据从父组件流向子组件

**声明式编程**示例：

```jsx
<Map zoom={4} center={{lat, lng}}>
  <Marker position={{lat, lng}} title="Hello Marker" />
</Map>
```

</AnswerBlock>

## state和props有什么区别？

<AnswerBlock>

**相同点**：

- 都是JavaScript对象
- 都能触发组件重新渲染
- 初始值都通过父组件传递

**区别**：

| 特性        | state                     | props                     |
|-------------|---------------------------|---------------------------|
| 可变性      | 可修改（通过`setState`）  | 不可修改（只读）          |
| 作用域      | 组件内部状态              | 组件间通信                |
| 更新触发    | 异步更新（多数情况）      | 父组件更新时自动更新      |
| 初始值      | 组件内部初始化            | 父组件传递                |

**示例代码**：

```jsx
class Counter extends React.Component {
  state = { count: 0 };
  render() {
    return <button onClick={() => this.setState({ count: this.state.count + 1 })}>
      Clicked {this.state.count} times
    </button>;
  }
}
```

</AnswerBlock>

## 说说React中类组件和函数组件的理解？有什么区别？

<AnswerBlock>

**类组件**：

- 基于ES6类定义
- 使用`this.state`管理状态
- 可访问生命周期方法
- 需要继承`React.Component`

**函数组件**：

- 无状态组件（早期）
- 通过`useState`管理状态（Hooks）
- 更简洁的语法
- 不支持生命周期（需通过`useEffect`等Hooks模拟）

**核心区别**：

| 特性          | 类组件                  | 函数组件                |
|---------------|-------------------------|-------------------------|
| 状态管理      | `this.state` + `setState` | `useState` Hook         |
| 生命周期      | 完整生命周期方法        | 需通过Hooks模拟          |
| 性能优化      | `shouldComponentUpdate` | `React.memo`            |
| 渲染方式      | 类实例化                | 函数调用                |

**示例对比**：

```jsx
// 类组件
class ClassComp extends React.Component {
  render() { return <div>{this.props.name}</div>; }
}

// 函数组件
const FuncComp = ({ name }) => <div>{name}</div>;
```

</AnswerBlock>

## 说说对React生命周期的理解？各个阶段对应的方法？

<AnswerBlock>

**React生命周期分为三个阶段**：

1. **挂载阶段**
   - `constructor`：初始化state和props
   - `getDerivedStateFromProps`：更新state前调用
   - `render`：返回虚拟DOM
   - `componentDidMount`：DOM渲染完成后调用

2. **更新阶段**
   - `getDerivedStateFromProps`：新props/state触发
   - `shouldComponentUpdate`：决定是否重新渲染
   - `render`：生成新虚拟DOM
   - `getSnapshotBeforeUpdate`：获取DOM更新前状态
   - `componentDidUpdate`：DOM更新完成后调用

3. **卸载阶段**
   - `componentWillUnmount`：组件卸载前清理资源

**生命周期流程图**：

```bash
constructor → getDerivedStateFromProps → render → componentDidMount
          ↳ getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate
          ↳ componentWillUnmount
```

</AnswerBlock>

## 说说React中的事件机制？

<AnswerBlock>

**React事件机制特点**：

1. **合成事件（SyntheticEvent）**：
   - 统一封装的跨浏览器事件对象
   - 通过`e.nativeEvent`访问原生事件
   - 事件名称采用驼峰命名（如`onClick`）

2. **事件委托**：
   - 所有事件绑定在最外层`document`
   - 通过事件冒泡机制触发处理函数
   - 减少内存开销和DOM操作

3. **执行顺序**：
   1. 触发原生事件
   2. 处理React合成事件
   3. 触发`document`上的全局事件

**阻止事件冒泡**：

```jsx
handleClick = (e) => {
  e.stopPropagation(); // 阻止合成事件冒泡
  e.nativeEvent.stopImmediatePropagation(); // 阻止所有后续事件
}
```

**事件绑定方式**：

```jsx
// 推荐方式
<button onClick={this.handleClick}>Click</button>

// 箭头函数绑定（性能较差）
<button onClick={() => this.handleClick()}>Click</button>
```

</AnswerBlock>

## 说说React中refs的理解？应用场景？

<AnswerBlock>

**refs**是React提供的访问DOM元素或组件实例的一种方式，主要用于：

- 访问DOM元素属性和方法
- 调用子组件的方法
- 集成第三方库

**使用方式**：

1. **字符串ref（不推荐）**：

   ```jsx
   <div ref="myDiv">Content</div>
   this.refs.myDiv.focus();
   ```

2. **回调ref**：

   ```jsx
   <div ref={el => this.myDiv = el} />
   ```

3. **React.createRef**：

   ```jsx
   class Comp extends React.Component {
     myRef = React.createRef();
     render() { return <div ref={this.myRef}>Ref Demo</div>; }
   }
   ```

4. **useRef Hook**：

   ```jsx
   const myRef = useRef();
   useEffect(() => { myRef.current.focus(); }, []);
   ```

**应用场景**：

- 表单元素聚焦
- 视频/音频控制
- 集成第三方UI库
- 访问子组件实例方法
</AnswerBlock>

## 说说React中setState的执行机制？

<AnswerBlock>

**setState核心特性**：

1. **异步更新**（多数情况）：
   - 在生命周期或合成事件中异步执行
   - 批量更新优化（合并多个setState）

2. **同步更新**：
   - 在`setTimeout`或原生事件中同步执行
   - 通过`setState(updater, callback)`获取更新后状态

3. **更新队列**：
   - 组件状态更新会被加入队列
   - 批量更新时合并相同状态

**示例代码**：

```jsx
// 异步更新
handleClick = () => {
  this.setState({ count: this.state.count + 1 });
  console.log(this.state.count); // 仍为旧值
}

// 同步更新
setTimeout(() => {
  this.setState({ count: this.state.count + 1 });
  console.log(this.state.count); // 已更新
}, 0);
```

**更新流程**：

```bash
setState → 检查是否批量更新 → 合并状态 → 触发重新渲染 → 执行回调
```

</AnswerBlock>

## 说说React中虚拟DOM的原理？

<AnswerBlock>

**虚拟DOM（Virtual DOM）**是React的核心技术之一，通过内存中的对象模拟真实DOM结构。

**核心原理**：

1. **JSX转换**：

   ```jsx
   <div className="container">
     <h1>Hello React</h1>
   </div>
   ```

   转换为：

   ```jsx
   React.createElement('div', { className: 'container' },
     React.createElement('h1', null, 'Hello React')
   );
   ```

2. **Diff算法**：
   - 逐层比较新旧虚拟DOM树
   - 仅更新差异部分
   - 优化策略：
     - 同层比较（忽略跨层级移动）
     - 类型相同则复用节点
     - 类型不同则删除重建

3. **渲染流程**：

   ```bash
   虚拟DOM → 差异计算 → 真实DOM更新
   ```

**优势**：

- 减少真实DOM操作次数
- 提升渲染性能
- 跨平台支持（如React Native）
</AnswerBlock>

## 说说React中Fiber架构的理解？

<AnswerBlock>

**Fiber架构**是React 16引入的核心架构优化，旨在解决同步渲染导致的阻塞问题。

**核心特性**：

1. **任务分片**：
   - 将渲染任务拆分为多个微任务
   - 可中断/恢复的渲染过程
   - 使用`requestIdleCallback`进行优先级调度

2. **Fiber节点**：

   ```jsx
   type Fiber = {
     tag: WorkTag, // 节点类型
     key: string,
     type: any, // 组件类型
     stateNode: any, // 对应的DOM节点
     parent: Fiber, // 父节点
     child: Fiber, // 子节点
     sibling: Fiber, // 兄弟节点
     ...
   };
   ```

3. **优先级管理**：
   - 高优先级任务优先执行
   - 低优先级任务可中断
   - 常见优先级：
     - 离散事件（点击、输入）
     - 连续事件（滚动、动画）
     - 交互后更新
     - 网络请求后更新

**架构优势**：

- 避免主线程长时间阻塞
- 提升复杂应用的响应速度
- 支持异步渲染
</AnswerBlock>

## 说说React中Hooks的理解？

<AnswerBlock>

**Hooks**是React 16.8引入的新特性，允许在函数组件中使用状态和其他React特性。

**核心Hooks**：

1. **useState**：

   ```jsx
   const [count, setCount] = useState(0);
   ```

2. **useEffect**：

   ```jsx
   useEffect(() => {
     document.title = `Clicked ${count} times`;
     return () => { /* 清理副作用 */ };
   }, [count]);
   ```

3. **useContext**：

   ```jsx
   const ThemeContext = React.createContext();
   const theme = useContext(ThemeContext);
   ```

4. **useReducer**：

   ```jsx
   const [state, dispatch] = useReducer(reducer, initialState);
   ```

**优势**：

- 函数组件可管理状态
- 逻辑复用更简单（自定义Hooks）
- 避免类组件的this绑定问题
- 优化性能（`useMemo`/`useCallback`）

**注意事项**：

- 只能在函数组件或自定义Hooks中使用
- 保持Hook调用顺序稳定
</AnswerBlock>

## 说说React中路由的实现方式？

<AnswerBlock>

**React Router**是官方路由解决方案，提供两种主要模式：

1. **Hash模式**：
   - URL包含#符号（如`http://example.com/#/home`）
   - 通过`HashRouter`组件实现
   - 兼容性好，无需服务器配置

2. **History模式**：
   - 干净的URL（如`http://example.com/home`）
   - 通过`BrowserRouter`组件实现
   - 需要服务器配置重定向

**核心组件**：

- **Route**：路径匹配组件

  ```jsx
  <Route path="/" exact component={Home} />
  ```

- **Link**：导航链接

  ```jsx
  <Link to="/about">About</Link>
  ```

- **Switch**：匹配第一个有效Route

  ```jsx
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </Switch>
  ```

**动态路由示例**：

```jsx
<Route path="/user/:id" component={UserProfile} />

// 获取参数
const { id } = useParams();
```

**嵌套路由**：

```jsx
<Route path="/dashboard" component={Dashboard}>
  <Route path="/dashboard/settings" component={Settings} />
</Route>
```

</AnswerBlock>

## 说说React中Redux的数据流？

<AnswerBlock>

**Redux数据流遵循单向数据流原则**：

1. **用户触发Action**：

   ```jsx
   { type: 'ADD_TODO', payload: 'Learn Redux' }
   ```

2. **Store接收Action**：

   ```jsx
   store.dispatch(action);
   ```

3. **Reducer处理Action**：

   ```jsx
   function todoReducer(state = initialState, action) {
     switch (action.type) {
       case 'ADD_TODO':
         return { ...state, todos: [...state.todos, action.payload] };
       default:
         return state;
     }
   }
   ```

4. **State更新触发视图渲染**：

   ```jsx
   connect(mapStateToProps, mapDispatchToProps)(Component);
   ```

**核心概念**：

- **Store**：全局状态容器
- **Reducer**：状态更新逻辑
- **Action**：状态更新请求
- **Middleware**：处理异步操作（如Redux-Thunk）

**中间件示例（Redux-Thunk）**：

```jsx
const fetchData = () => async (dispatch) {
  const response = await fetch('https://api.example.com/data');
  dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
};
```

</AnswerBlock>
