# CSS面试题

<script setup lang="ts">
    import AnswerBlock from '@/components/common/answer-block.vue'
</script>

## 说说你对盒子模型的理解?

<AnswerBlock>

**盒子模型组成**：  
每个盒子由 content（内容）、padding（内边距）、border（边框）、margin（外边距）四部分构成。

**两种模型**：  

1. **标准模型（W3C模型）**  
   - 总宽度 = width + padding + border + margin  
   - 总高度 = height + padding + border + margin  
   - 默认值：`box-sizing: content-box`  

2. **怪异模型（IE模型）**  
   - 总宽度 = width + margin  
   - 总高度 = height + margin  
   - 包含 padding 和 border：`box-sizing: border-box`  

**关键属性**：  

- `box-sizing`: 控制盒子尺寸计算方式（content-box/border-box）  
- `margin`: 盒子外部空间  
- `padding`: 内容与边框之间的空间  
- `border`: 盒子边框  
</AnswerBlock>

## 谈谈你对BFC的理解?

<AnswerBlock>

**BFC（块级格式化上下文）**：  

- 独立渲染区域，内部子元素不会影响外部布局  
- 触发条件：  
  - 根元素（HTML）  
  - 浮动元素（`float: left|right`）  
  - 绝对定位（`position: absolute/fixed`）  
  - `overflow: hidden/auto/scroll`  
  - `display: inline-block/flex/grid`  

**应用场景**：  

1. **防止 margin 塌陷**  
   - 父元素触发 BFC，避免子元素 margin 穿透  
2. **清除浮动**  
   - 父元素触发 BFC，包含内部浮动元素  
3. **自适应布局**  
   - 多栏布局中，避免浮动元素覆盖内容  
</AnswerBlock>

## 什么是响应式设计？基本原理是什么？

<AnswerBlock>

**响应式设计**：  

- 页面根据设备屏幕尺寸、方向等自动调整布局  
- 核心原则："内容如流水"，灵活适配不同终端  

**实现原理**：  

1. **媒体查询（Media Query）**  
   - 根据屏幕宽度定义不同样式  

   ```css
   @media (max-width: 768px) { /* 移动端样式 */ }
   ```  

2. **弹性单位**  
   - `%`、`vw/vh`（视口百分比）、`rem`（根字体大小）  
3. **弹性布局**  
   - `flexbox`、`grid` 实现灵活排版  
4. **viewport 元标签**  

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```  

**优缺点**：  

- 优点：一套代码适配多端，用户体验统一  
- 缺点：兼容性复杂，性能可能受影响  
</AnswerBlock>

## 如何实现元素的水平垂直居中？

<AnswerBlock>

**不定宽高元素**：  

1. **定位 + transform**  

   ```css
   .parent { position: relative; }
   .child { 
     position: absolute; 
     top: 50%; left: 50%; 
     transform: translate(-50%, -50%); 
   }
   ```  

2. **Flex 布局**  

   ```css
   .parent { display: flex; justify-content: center; align-items: center; }
   ```  

3. **Grid 布局**  

   ```css
   .parent { display: grid; place-items: center; }
   ```  

**定宽高元素**：  

1. **定位 + margin:auto**  

   ```css
   .parent { position: relative; }
   .child { 
     position: absolute; 
     top: 0; bottom: 0; left: 0; right: 0; 
     margin: auto; 
   }
   ```  

2. **Table 布局**  

   ```css
   .parent { display: table-cell; vertical-align: middle; text-align: center; }
   ```  

</AnswerBlock>

## 如何实现两栏/三栏自适应布局？

<AnswerBlock>

**两栏布局**：  

1. **浮动 + BFC**  

   ```html
   <div class="left"></div>
   <div class="right" style="overflow: hidden;"></div>
   ```  

2. **Flex 布局**  

   ```css
   .container { display: flex; }
   .left { flex: 0 0 200px; }
   .right { flex: 1; }
   ```  

**三栏布局**：  

1. **绝对定位**  

   ```css
   .container { position: relative; }
   .left { position: absolute; left: 0; width: 200px; }
   .right { position: absolute; right: 0; width: 200px; }
   .main { margin: 0 210px; }
   ```  

2. **Flex 布局**  

   ```css
   .container { display: flex; }
   .left, .right { flex: 0 0 200px; }
   .main { flex: 1; }
   ```  

3. **Grid 布局**  

   ```css
   .container { display: grid; grid-template-columns: 200px auto 200px; }
   ```  

</AnswerBlock>

## CSS选择器有哪些？优先级如何计算？

<AnswerBlock>

**常用选择器**：  

- 基础选择器：`*`（通配符）、`#id`、`.class`、`element`  
- 组合选择器：`>`（子元素）、`+`（相邻兄弟）、`~`（通用兄弟）  
- 伪类选择器：`:hover`、`:nth-child(n)`、`:focus`  
- 伪元素选择器：`::before`、`::after`、`::first-line`  
- 属性选择器：`[attr]`、`[attr^=value]`  

**优先级计算（从高到低）**：  

1. **!important**（最高）  
2. **内联样式**（1000）  
3. **ID选择器**（0100）  
4. **类/属性/伪类选择器**（0010）  
5. **标签/伪元素选择器**（0001）  
6. **通配符/继承/默认**（0000）  

**示例**：  

```css
#nav > ul > li > a.nav-link /* 0,1,1,3 */
```  

</AnswerBlock>

## 元素隐藏的方式有哪些？区别是什么？

<AnswerBlock>

**常见隐藏方式**：  

1. **`display: none`**  
   - 完全从文档流移除，不占空间  
   - 触发重排和重绘  
   - 事件无法触发  

2. **`visibility: hidden`**  
   - 保留空间，不可见  
   - 触发重绘，不触发重排  
   - 事件无法触发  

3. **`opacity: 0`**  
   - 透明，保留空间  
   - 触发重绘  
   - 事件可触发  

4. **`clip-path`**  
   - 裁剪隐藏，保留空间  
   - 触发重绘  
   - 事件无法触发  

5. **`position: absolute` + 偏移**  
   - 移出可视区域，保留空间  
   - 触发重排和重绘  
   - 事件可触发  

**对比**：  

| 方式           | 空间保留 | 事件响应 | 重排/重绘 |
|----------------|----------|----------|-----------|
| `display: none` | 否       | 否       | 重排+重绘 |
| `visibility`   | 是       | 否       | 重绘      |
| `opacity`      | 是       | 是       | 重绘      |

</AnswerBlock>

## 如何实现单行/多行文本溢出省略？

<AnswerBlock>

**单行文本**：  

```css
.text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```  

**多行文本**：  

1. **WebKit 私有方案**  

   ```css
   .text {
     display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 3; /* 行数 */
     overflow: hidden;
   }
   ```  

2. **纯CSS 模拟**  

   ```css
   .text {
     position: relative;
     line-height: 1.5;
     max-height: 4.5em; /* 行数 × 行高 */
     overflow: hidden;
   }
   .text::after {
     content: "...";
     position: absolute;
     bottom: 0;
     right: 0;
     padding-left: 20px;
     background: linear-gradient(to right, transparent 70%, white 100%);
   }
   ```  

</AnswerBlock>

## 如何用CSS画一个三角形？

<AnswerBlock>

**实现原理**：  
利用元素边框的梯形特性，通过设置透明边框和调整宽度高度生成三角形。

**代码示例**：  

```css
.triangle {
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-top-color: red; /* 上三角形 */
}

/* 下三角形 */
.triangle {
  border-bottom-color: red;
}

/* 左三角形 */
.triangle {
  border-right-color: red;
  border-left: 0;
}
```  

**优化空心三角形**：  

```css
.triangle {
  position: relative;
  width: 60px;
  height: 60px;
  background: red;
}
.triangle::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border: 15px solid transparent;
  border-top-color: white;
  transform: translate(-50%, -50%);
}
```  

</AnswerBlock>

## 如何实现视差滚动效果？

<AnswerBlock>

**实现方式**：  

1. **`background-attachment: fixed`**  
   - 固定背景图片，内容滚动时产生视差  

   ```css
   .parallax {
     background-image: url('bg.jpg');
     background-attachment: fixed;
     background-size: cover;
   }
   ```  

2. **3D 变换（`transform: translateZ`）**  
   - 多层元素设置不同 Z 轴深度，滚动时产生立体效果  

   ```css
   .layer {
     transform: translateZ(0);
     will-change: transform;
   }
   .layer1 { transform: translateZ(-1px); }
   .layer2 { transform: translateZ(-2px); }
   ```  

**关键技术**：  

- 合理分层，背景层与内容层分离  
- 利用 `will-change` 优化性能  
- 控制滚动速度差异（如使用 `requestAnimationFrame`）  
</AnswerBlock>

## CSS3新增特性有哪些？

<AnswerBlock>

**核心特性**：  

1. **选择器增强**  
   - `:nth-child(n)`、`:first-of-type`、属性选择器（`[attr^=value]`）  

2. **盒模型扩展**  
   - `box-sizing`、`box-shadow`、`border-radius`  

3. **背景与边框**  
   - `background-clip`、`border-image`、`background-size`  

4. **文字与排版**  
   - `text-shadow`、`word-wrap`、`text-overflow`  

5. **过渡与动画**  
   - `transition`、`animation`、`transform`  

6. **弹性布局**  
   - `flexbox`、`grid`  

7. **颜色与渐变**  
   - `rgba`、`hsla`、`linear-gradient`  

**示例代码**：  

```css
/* 3D旋转动画 */
.box {
  animation: rotate 2s infinite linear;
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```  

</AnswerBlock>

## 如何实现CSS3动画？

<AnswerBlock>

**两种主要方式**：  

1. **过渡（`transition`）**  
   - 平滑改变属性值  

   ```css
   .box {
     transition: all 1s ease;
   }
   .box:hover { transform: scale(1.1); }
   ```  

2. **关键帧动画（`animation`）**  
   - 自定义多阶段动画  

   ```css
   @keyframes bounce {
     0% { transform: translateY(0); }
     50% { transform: translateY(-20px); }
     100% { transform: translateY(0); }
   }
   .ball {
     animation: bounce 1s infinite;
   }
   ```  

**核心属性**：  

- `animation-name`: 动画名称  
- `animation-duration`: 持续时间  
- `animation-timing-function`: 速度曲线（`ease`、`linear`等）  
- `animation-iteration-count`: 循环次数（`infinite`）  
- `animation-direction`: 方向（`alternate`反向）  

**优化建议**：  

- 使用 `transform` 和 `opacity` 减少重绘  
- 利用 `will-change` 提升性能  
</AnswerBlock>

## 介绍一下Grid网格布局？

<AnswerBlock>

**Grid 布局**：  

- 二维布局系统，可同时控制行和列  
- 通过 `display: grid` 创建容器  

**核心属性**：  

1. **容器属性**  
   - `grid-template-columns`: 列定义（`repeat(3, 100px)`）  
   - `grid-template-rows`: 行定义  
   - `grid-gap`: 间距（`10px 20px`）  
   - `justify-content`: 内容水平对齐（`space-between`）  
   - `align-items`: 项目垂直对齐（`center`）  

2. **项目属性**  
   - `grid-column`: 跨列（`span 2`）  
   - `grid-row`: 跨行  
   - `justify-self`: 单个项目水平对齐  
   - `align-self`: 单个项目垂直对齐  

**示例代码**：  

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.item { grid-column: 1 / span 2; }
```  

</AnswerBlock>

## 介绍一下Flex弹性布局？

<AnswerBlock>

**Flex 布局**：  

- 一维布局系统，控制项目排列和对齐  
- 通过 `display: flex` 创建容器  

**核心属性**：  

1. **容器属性**  
   - `flex-direction`: 主轴方向（`row`、`column`）  
   - `flex-wrap`: 换行（`wrap`）  
   - `justify-content`: 主轴对齐（`center`、`space-around`）  
   - `align-items`: 交叉轴对齐（`center`）  
   - `align-content`: 多轴线对齐  

2. **项目属性**  
   - `order`: 排列顺序  
   - `flex-grow`: 扩展比例  
   - `flex-shrink`: 收缩比例  
   - `flex-basis`: 基准尺寸  
   - `flex`: 简写属性（`flex: 1 0 200px`）  

**示例代码**：  

```css
.container {
  display: flex;
  justify-content: space-between;
}
.item { flex: 1; }
```  

</AnswerBlock>

## CSS像素、设备独立像素、DPR、PPI有什么区别？

<AnswerBlock>

**关键概念**：  

1. **CSS像素**  
   - 逻辑像素，与设备无关  
   - 1 CSS像素 = 1 设备独立像素（默认）  

2. **设备独立像素（DIP）**  
   - 虚拟像素，用于抽象设备差异  
   - 如：iPhone 6 的 375x667 即设备独立像素  

3. **设备像素比（DPR）**  
   - 物理像素 / 设备独立像素  
   - `window.devicePixelRatio` 获取  

4. **像素密度（PPI）**  
   - 每英寸物理像素数  
   - 计算公式：`PPI = √(width² + height²) / 屏幕尺寸`  

**关系示例**：  

- 1 CSS像素 = 2 物理像素（DPR=2）  
- Retina 屏幕 DPR=3，显示更清晰  
</AnswerBlock>

## em/px/rem/vh/vw单位有什么区别？

<AnswerBlock>

**单位对比**：  

| 单位 | 类型 | 参考对象 | 特点 |
|------|------|----------|------|
| `px` | 绝对 | 屏幕像素 | 固定大小，不随内容变化 |
| `em` | 相对 | 父元素字体大小 | 继承性，可能导致嵌套问题 |
| `rem` | 相对 | 根元素（HTML）字体大小 | 全局统一基准，适合响应式 |
| `vw` | 相对 | 视口宽度（1vw=1%） | 基于屏幕尺寸，适合全屏布局 |
| `vh` | 相对 | 视口高度（1vh=1%） | 同上 |

**使用场景**：  

- `px`：图标、固定尺寸元素  
- `em`：文本相关（如 `font-size`）  
- `rem`：全局布局（配合媒体查询）  
- `vw/vh`：全屏背景、动态布局  
</AnswerBlock>

## 如何让Chrome支持小于12px的文字？

<AnswerBlock>

**解决方案**：  

1. **`zoom` 缩放**  

   ```css
   .small-text {
     font-size: 12px;
     zoom: 0.8; /* 缩小到80% */
   }
   ```  

2. **`transform: scale`**  

   ```css
   .small-text {
     font-size: 12px;
     transform: scale(0.8);
   }
   ```  

3. **`-webkit-text-size-adjust`**  

   ```css
   .small-text {
     -webkit-text-size-adjust: none;
     font-size: 10px;
   }
   ```  

**区别**：  

- `zoom`：影响布局，兼容性好  
- `scale`：不影响布局，性能更好  
- `-webkit-text-size-adjust`：仅对英文有效  
</AnswerBlock>

## 如何理解回流与重绘？如何优化？

<AnswerBlock>

**概念**：  

- **回流（Reflow）**：重新计算元素几何位置和布局  
- **重绘（Repaint）**：重新绘制元素外观  

**触发场景**：  

- 回流：修改尺寸、位置、内容、获取布局信息（如 `offsetTop`）  
- 重绘：修改颜色、背景、透明度  

**优化方法**：  

1. **减少 DOM 操作**  
   - 使用文档片段（`DocumentFragment`）批量操作  
   - 离线修改样式后再更新  

2. **避免强制同步布局**  【修改样式后立即读取布局属性（如 offsetWidth、offsetHeight、getComputedStyle 等），浏览器为了返回准确的布局信息，会强制触发一次同步回流】

   ```javascript
   // 错误写法（触发两次回流）
   
   // 第一次修改样式并读取布局信息
   el.style.height = '100px';
   const height1 = el.offsetHeight;
   console.log(`第一次读取的元素高度是: ${height1}px`);

   // 第二次修改样式并读取布局信息
   el.style.width = '200px';
   const width1 = el.offsetWidth;
   console.log(`第一次读取的元素宽度是: ${width1}px`);
   
   ```  

   ```javascript
   // 正确写法（合并读写）

   // 修改样式
   el.style.height = '100px';
   el.style.width = '200px';

   // 读取布局信息
   const height = el.offsetHeight;
   const width = el.offsetWidth;
   console.log(`元素的高度是: ${height}px，宽度是: ${width}px`);

   ```  

3. **使用 CSS 优化**  
   - 动画使用 `transform` 和 `opacity`  
   - 减少 `box-shadow`、`border-radius` 的使用  

4. **利用硬件加速**  

   ```css
   .optimized {
     transform: translateZ(0);
     will-change: transform;
   }
   ```  

5. 使用requestAnimationFrame，减少重绘次数
</AnswerBlock>

## CSS预处理器有哪些？区别是什么？

<AnswerBlock>

**主流预处理器**：  

1. **Sass（Scss）**  
   - 功能强大，支持嵌套、变量、混入  
   - 语法严谨，需编译  

2. **Less**  
   - 语法简洁，类似 CSS  
   - 动态导入，支持 JavaScript 表达式  

3. **Stylus**  
   - 极简语法，无大括号和分号  
   - 灵活的变量和函数  

**核心区别**：  

| 特性       | Sass                | Less                | Stylus              |
|------------|---------------------|---------------------|---------------------|
| 语法       | 严格                | 类 CSS              | 极简                |
| 变量       | `$var`              | `@var`              | `var`               |
| 混合       | `@mixin`            | `.mixin()`          | `mixin()`           |
| 嵌套       | `&` 表示父选择器    | `&` 表示父选择器    | `&` 表示父选择器    |
| 社区生态   | 成熟，工具丰富      | 广泛使用            | 轻量，灵活          |

**选择建议**：  

- 复杂项目：Sass  
- 快速原型：Less  
- 追求简洁：Stylus  
</AnswerBlock>

## 如何优化CSS性能？

<AnswerBlock>

**优化策略**：  

1. **内联首屏关键 CSS**  
   - 将首屏样式直接写入 HTML，减少请求  

2. **异步加载非关键 CSS**  

   ```html
   <link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
   ```  

3. **压缩与合并**  
   - 使用 `cssnano`、`PostCSS` 压缩代码  
   - 合并多个 CSS 文件  

4. **优化选择器**  
   - 避免嵌套过深（建议 ≤3 层）  
   - 优先使用类选择器，避免 `!important`  

5. **减少重排/重绘**  
   - 批量修改样式，使用 `classList`  
   - 动画元素使用 `position: fixed`  

6. **使用 CSS Sprite**  
   - 合并图标，减少 HTTP 请求  

**工具推荐**：  

- `Webpack` + `mini-css-extract-plugin`  
- `PurgeCSS` 移除未使用代码  

</AnswerBlock>
