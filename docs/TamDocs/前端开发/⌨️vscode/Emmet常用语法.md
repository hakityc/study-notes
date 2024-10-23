# Emmet常用语法

## HTML标签嵌套

### 1. 父子关系：>

```html
// div>p>span
<div>
  <p>
    <span></span>
  </p>
</div>
```

### 2. 兄弟关系：+

```html
// div+p+span
<div></div>
<p></p>
<span></span>
```

### 3. 乘法：\*

```html
// ul>li*3
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

### 4. 组合使用：()

```html
// table>(tr>(td*3))*2
<table>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
</table>
```

### 5. id,class,属性

```html
// p#title
<p id="title"></p>

// .title
<div class="title"></div> // div可以不用写

// td[rowspan=2 colspan=3 title]
<td rowspan="2" colspan="3" title=""></td>
```

### 6. 文本内容：{}

```html
// div{我是div}
<div>我是div</div>
```

### 7. 自增符号：$

#### 1. 常搭配乘法\*使用

```html
// li.item$*4
<li class="item1"></li>
<li class="item2"></li>
<li class="item3"></li>
<li class="item4"></li>

// div{$}*4
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
```

#### 2. 占位符：\$\$

```html
// li.item$$$*4
<li class="item001"></li>
<li class="item002"></li>
<li class="item003"></li>
<li class="item004"></li>

// div{$$$$}*4
<div>0001</div>
<div>0002</div>
<div>0003</div>
<div>0004</div>
```

#### 3. 指定开始数字：\$@num\*n （num=开始数字，n=重复次数）

```html
// div{$@6}*3
<div>6</div>
<div>7</div>
<div>8</div>
```

#### 4. 倒序：\$@-

```html
// div{$@-}*3
<div>3</div>
<div>2</div>
<div>1</div>
// div{$@-6}*3
<div>8</div>
<div>7</div>
<div>6</div>
```

当然可以，Emmet 提供了许多有用的快捷方式来帮助我们快速编写 HTML 和 CSS 代码。以下是一些常用的 Emmet 语法扩展：

## HTML 标签嵌套扩展

### 8. 选择器和群组

```html
// .item$*4>li
<div class="item1"></div>
<div class="item2"></div>
<div class="item3"></div>
<div class="item4"></div>

// 等同于
.item1>li
.item2>li
.item3>li
.item4>li
```

### 9. 属性值缩写

```html
// a[href=#]{Link}
<a href="#">Link</a>
```

### 10. 布尔属性

```html
// input[type=checkbox]:checked
<input type="checkbox" checked>
```

### 11. 嵌套属性

```html
// ul[lang=en-US]{items}
<ul lang="en-US">items</ul>
```

## CSS 缩写扩展

### 1. 盒模型

```css
/* 所有边 */
m10 // margin: 10px;

/* 垂直 | 水平 */
mtb10 // margin-top: 10px; margin-bottom: 10px;
mlr10 // margin-left: 10px; margin-right: 10px;

/* 所有边百分比 */
m10p // margin: 10%;

/* 边框 */
b1p // border: 1px solid;
bdashed // border: dashed;
bradius5 // border-radius: 5px;
```

### 2. 字体和文本

```css
/* 字体大小和行高 */
f16 // font-size: 16px;
lh18 // line-height: 18px;

/* 字体族 */
ff Arial, sans-serif // font-family: Arial, sans-serif;

/* 文本相关 */
tdu // text-decoration: underline;
ti3 // text-indent: 3em;
```

### 3. 背景和边框

```css
/* 背景 */
bgcblue // background-color: blue;
bgi // background-image: url(image.jpg);
bgp // background-position: center;
bgnr // background-repeat: no-repeat;
bgcbluebgi // background: blue url(image.jpg) no-repeat center;

/* 边框 */
bdrs // border-radius: 5px;
```

### 4. 定位

```css
/* 定位上下左右 */
posabs // position: absolute;
top0 // top: 0;
right0 // right: 0;
bottom0 // bottom: 0;
left0 // left: 0;

/* 居中 */
posabs+tac+lhc // position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
```

### 5. Flexbox

```css
/* 容器 */
dflex // display: flex;
aicenter // align-items: center;
jccenter // justify-content: center;

/* 项目 */
aiflex-start // align-items: flex-start;
jcflex-end // justify-content: flex-end;
```

### 6. 响应式设计

```css
/* 媒体查询 */
mq320 // @media (min-width: 320px) {}
mq480 // @media (min-width: 480px) {}
mq600 // @media (min-width: 600px) {}
mq768 // @media (min-width: 768px) {}
mq1024 // @media (min-width: 1024px) {}
mq1200 // @media (min-width: 1200px) {}
```

## 了解更多

以上是一些常用的 Emmet 语法，如果你对 Emmet 中其他部分语法感兴趣，可以查阅 [Emmet的官方文档](https://emmet.io/)。
