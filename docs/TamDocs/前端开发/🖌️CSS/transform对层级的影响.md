# CSS transform 对元素层级的影响

## 问题背景

在重构一个组件时，遇到了一个有趣的层级问题：组件的点击事件无法触发，原因是有一个历史遗留的 div 元素覆盖在其上方。这个 div 由于兼容性原因不能移除，需要找到其他解决方案。

## 解决方案

在导师的建议下，通过给组件添加 `position: relative` 成功解决了问题。但令人困惑的是，原有代码中并没有使用 position 相关属性，却依然能正常工作。

## 深入探究

通过代码审查发现，原有代码中使用了 `transform: translateX(-50%)`。这引发了一个问题：transform 属性是否会影响元素的层级？

## 技术解析

在 CSS 中，transform 属性确实会影响元素的层级。这是因为：

1. 当元素应用了 transform 属性时，浏览器会为其创建一个新的层叠上下文（stacking context）
2. 这个新的层叠上下文会改变元素的层级关系，使其独立于普通文档流
3. 这种特性与 `position: relative` 类似，都能创建新的层叠上下文

## 最佳实践

1. 当需要调整元素层级时，可以考虑使用以下属性：
   - transform
   - position: relative/absolute/fixed
   - opacity < 1
   - filter
   - will-change

2. 这些属性都会创建新的层叠上下文，但各有其适用场景：
   - transform 适合用于动画和布局调整
   - position 适合用于精确的定位控制
   - opacity 和 filter 适合用于视觉效果


