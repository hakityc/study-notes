
# 一、基础准备阶段（1-2周）

## 1. 深度巩固Vue 3核心概念

响应式原理
通过reactive()、ref()手写简化版实现，重点理解Proxy拦截和依赖收集（track/trigger）。

```javascript
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key); // 依赖收集
      return Reflect.get(...arguments);
    },
    set(target, key, value, receiver) {
      Reflect.set(...arguments);
      trigger(target, key); // 触发更新
      return true;
    }
  });
}
```

虚拟DOM与Diff算法
用简单JS对象模拟虚拟DOM，实现一个极简版Diff（仅处理同层节点）。

## 2. 工具链强化

TypeScript专项
重点攻克：泛型在Vue类型系统中的应用（如ComponentPublicInstance）、条件类型（extends和infer）。

调试技巧
在VSCode中配置Vue源码调试环境：克隆Vue仓库，修改package.json的scripts添加--sourcemap，用debugger语句打断点。

# 二、源码探索阶段（8-12周）

## 1. 源码结构解剖（1周）

模块化分析

packages/reactivity: 独立响应式系统（核心文件：effect.ts、reactive.ts）

packages/runtime-core: 渲染核心（vnode.ts、component.ts）

packages/compiler-core: 模板编译（parse.ts、transform.ts）

## 2. 分模块攻坚（6-8周）

模块1：响应式系统（2周）
核心流程

reactive()创建代理对象 → 2. effect()注册副作用 → 3. 属性访问触发track → 4. 属性修改触发trigger

关键代码

effect.ts: trackEffects和triggerEffects实现依赖调度

computed.ts: 看ComputedRefImpl如何利用effect的scheduler

模块2：运行时（3周）
组件初始化
跟踪createApp到mount过程，重点分析setupComponent如何解析setup()函数。

虚拟DOM

renderer.ts: 查看patch函数如何根据shapeFlag选择处理方式

对比编译后的渲染函数：with(this){return _c('div',...)}

模块3：编译器（2周）
模板编译流程

parse生成AST → 2. transform静态提升 → 3. generate生成渲染函数

实战验证
使用@vue/compiler-sfc编译单文件组件，观察输出结果：

```javascript
const { code } = compile('<div>{{ msg }}</div>');
console.log(code); // 查看生成的渲染函数
```

## 3. 调试技巧实战

场景示例
在packages/runtime-core/src/component.ts的setupComponent函数内设断点，观察组件初始化时props和slots的解析过程。

# 三、实践强化阶段（4-8周）

## 1. 源码改造实验

定制响应式系统
修改effect.ts，添加自定义依赖触发逻辑（如批量更新优化）：

```typescript
// 在triggerEffects中添加批处理逻辑
const queue = new Set<ReactiveEffect>();
const flushQueue = () => {
  queue.forEach(effect => effect.run());
  queue.clear();
};
function triggerEffect(effect: ReactiveEffect) {
  queue.add(effect);
  Promise.resolve().then(flushQueue); // 下一微任务批量执行
}
```

## 2. 开源贡献

Issue处理策略
筛选good first issue标签的问题，如修复文档错误或添加TypeScript类型定义。首次提交建议修改测试用例或注释说明。

## 3. 架构思维提升

设计模式应用

观察者模式：watch和watchEffect的实现

组合模式：Teleport组件如何递归处理子节点

性能优化案例
分析Block Tree（patchFlags）如何跳过静态节点比对，在packages/runtime-core/src/vnode.ts中查看shapeFlag的位运算应用。

# 四、学习资源推荐

专项突破资料
源码解析

Vue Mastery - Vue 3 Reactivity Course（付费但物超所值）

HcySunYang的Vue3设计思路

调试工具链
VSCode调试Vue3源码配置模板

# 五、避坑指南

不要过早陷入编译优化
如SSR优化（compileSSR）或自定义指令编译处理，先掌握核心流程。

TypeScript类型报错处理
遇到复杂泛型时，使用// @ts-ignore暂时跳过，后续回看。

避免直接阅读dist产物
始终通过pnpm build --sourcemap生成带源码映射的调试版本。

# 六、学习进度自测

青铜（3个月）：能说清reactive和ref底层差异，画出组件挂载流程图

白银（6个月）：能修复简单源码Bug（如computed缓存异常），解释编译器静态提升原理

黄金（1年+）：能定制自定义渲染器，为Vue生态提交重要功能PR

建议每周投入10-15小时，结合「看源码 → 写Demo → 做笔记」三角循环法。每完成一个模块，尝试在团队内部分享，教学相长。
