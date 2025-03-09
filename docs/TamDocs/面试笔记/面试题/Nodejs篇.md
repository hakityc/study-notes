# Node.js面试真题

<script setup lang="ts">
    import AnswerBlock from '@/components/common/answer-block.vue'
</script>

## 说说你对Node.js的理解？优缺点？应用场景？

<AnswerBlock >

**理解**：  
Node.js是基于Chrome V8引擎的JavaScript运行环境，采用事件驱动、非阻塞I/O模型，适用于构建高性能网络应用。

**优点**：  

- 高并发性能优异  
- 适合I/O密集型场景  
- 单线程模型减少上下文切换开销  

**缺点**：  

- 不适合CPU密集型任务  
- 单线程导致无法充分利用多核CPU  

**应用场景**：  

1. 高并发Web应用（如实时聊天、考试系统）  
2. 实时交互系统（WebSocket长连接）  
3. 前后端分离架构的中间层  
4. 文件操作与流处理  
5. 数据库操作与JSON接口服务  
</AnswerBlock>

## 说说对fs模块的理解？有哪些常用方法？

<AnswerBlock >

**理解**：  
fs模块提供文件系统操作API，支持同步/异步操作，包含文件读取、写入、复制、目录创建等功能。

**常用方法**：  

- **读取文件**：`fs.readFile()`（异步）、`fs.readFileSync()`（同步）  
- **写入文件**：`fs.writeFile()`（异步）、`fs.writeFileSync()`（同步）  
- **追加内容**：`fs.appendFile()`（异步）、`fs.appendFileSync()`（同步）  
- **文件拷贝**：`fs.copyFile()`（异步）、`fs.copyFileSync()`（同步）  
- **创建目录**：`fs.mkdir()`（异步）、`fs.mkdirSync()`（同步）  

**参数说明**：  

- 路径/文件描述符  
- 数据内容（String/Buffer）  
- 选项（编码、标识位、权限位等）  
</AnswerBlock>

## 说说对Buffer的理解？应用场景？

<AnswerBlock >

**理解**：  
Buffer是Node.js处理二进制数据的原始内存区域，用于存储8位字节流，适用于网络协议、图片处理等场景。

**特点**：  

- 固定大小，创建后不可变  
- 直接操作内存，性能高效  
- 支持多种编码转换（UTF-8、Base64等）  

**应用场景**：  

1. 文件流操作（读取/写入二进制文件）  
2. 加密解密（配合crypto模块）  
3. 网络通信（处理TCP/UDP数据包）  
4. 压缩解压（配合zlib模块）  
</AnswerBlock>

## 说说对Stream的理解？应用场景？

<AnswerBlock >

**理解**：  
Stream是Node.js处理流式数据的抽象接口，支持逐块读取/写入数据，避免内存溢出。

**类型**：  

- **可读流**（Readable）：如文件读取流  
- **可写流**（Writable）：如文件写入流  
- **双工流**（Duplex）：同时读写（如Socket）  
- **转换流**（Transform）：处理数据转换（如压缩）  

**应用场景**：  

1. 大文件传输（避免一次性加载到内存）  
2. HTTP请求/响应处理  
3. 数据压缩/解压  
4. 实时数据处理（日志分析、实时监控）  
</AnswerBlock>

## 说说对process对象的理解？常用属性和方法？

<AnswerBlock >

**理解**：  
process是Node.js的全局进程对象，提供当前进程的信息和控制功能。

**常用属性**：  

- `process.pid`：当前进程ID  
- `process.argv`：命令行参数数组  
- `process.env`：环境变量  
- `process.cwd()`：当前工作目录  

**常用方法**：  

- `process.nextTick()`：在事件循环下一阶段执行回调  
- `process.on('uncaughtException', ...)`：捕获未处理异常  
- `process.exit()`：退出进程  

**事件监听**：  

- `exit`：进程退出时触发  
- `SIGINT`：捕获Ctrl+C信号  
</AnswerBlock>

## 说说对EventEmitter的理解？如何实现一个EventEmitter？

<AnswerBlock >

**理解**：  
EventEmitter是Node.js的事件驱动核心类，通过事件监听和触发实现异步编程。

**核心方法**：  

- `on(event, listener)`：绑定事件监听  
- `emit(event, ...args)`：触发事件  
- `once(event, listener)`：绑定单次触发的监听  
- `removeListener(event, listener)`：移除监听  

**实现要点**：  

1. 维护事件映射表（`this.events`）  
2. 支持同步/异步触发事件  
3. 实现事件监听的添加、移除、单次执行逻辑  

**示例代码**：  

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(type, handler) {
    if (!this.events[type]) this.events[type] = [];
    this.events[type].push(handler);
  }
  emit(type, ...args) {
    this.events[type]?.forEach(handler => handler(...args));
  }
}
```

</AnswerBlock>

## 说说Node.js模块的文件查找策略？

<AnswerBlock >

**查找顺序**：  

1. **缓存检查**：优先使用已加载的模块缓存  
2. **原生模块**：直接加载Node.js内置模块（如`http`、`fs`）  
3. **绝对路径/相对路径**：  
   - 按`.js`、`.json`、`.node`扩展名查找  
   - 目录查找时优先`package.json`的`main`字段，否则`index.js`  
4. **node_modules**：  
   - 从当前目录逐级向上查找`node_modules`  
   - 支持`NODE_PATH`环境变量配置路径  

**优先级**：  
原生模块 > 缓存模块 > 文件路径模块 > node_modules模块  
</AnswerBlock>

## Node.js有哪些全局对象？

<AnswerBlock >

**全局对象分类**：  

1. **真正的全局对象**：  
   - `Buffer`：二进制数据处理  
   - `process`：进程信息与控制  
   - `console`：控制台输出  
   - `setTimeout`/`clearTimeout`：定时器  
   - `global`：全局命名空间  

2. **模块级全局变量**：  
   - `__dirname`：当前文件目录路径  
   - `__filename`：当前文件完整路径  
   - `exports`/`module.exports`：模块导出  
   - `require`：模块引入  

**注意**：  

- `global`在浏览器中为`window`，Node.js中需显式使用  
- 模块级变量仅在模块内有效  
</AnswerBlock>

## 说说对中间件的理解？如何实现一个中间件？

<AnswerBlock >

**理解**：  
中间件是Web框架（如Express/Koa）中处理请求的函数，通过`next()`控制执行流程。

**核心功能**：  

- 修改请求/响应对象  
- 执行特定业务逻辑  
- 控制请求转发  

**Koa中间件示例**：  

```javascript
// 日志中间件
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
```

**常见中间件类型**：  

- 日志记录  
- Token校验  
- 静态文件服务  
- 请求体解析（如`koa-bodyparser`）  
</AnswerBlock>

## 说说Node.js的事件循环机制？

<AnswerBlock >

**阶段划分**：  

1. **timers**：处理`setTimeout`/`setInterval`回调  
2. **I/O callbacks**：处理大部分I/O回调  
3. **idle/prepare**：内部使用  
4. **poll**：轮询等待新I/O事件  
5. **check**：执行`setImmediate`回调  
6. **close callbacks**：处理关闭事件（如`socket.close`）  

**微任务与宏任务**：  

- **微任务**：`process.nextTick` > `Promise.then` > `queueMicrotask`  
- **宏任务**：定时器 > I/O事件 > `setImmediate`  

**执行顺序**：  

1. 同步代码  
2. 微任务队列（包括`nextTick`）  
3. 事件循环各阶段  
</AnswerBlock>

## Node.js性能如何监控及优化？

<AnswerBlock >

**监控指标**：  

- CPU使用率（`process.cpuUsage()`）  
- 内存占用（`process.memoryUsage()`）  
- I/O吞吐量（`fs`模块统计）  
- 网络延迟（`http`请求耗时）  

**优化策略**：  

1. **使用最新Node.js版本**：利用V8引擎优化  
2. **流处理**：避免大文件一次性加载  
3. **内存管理**：减少闭包和全局变量  
4. **代码优化**：合并数据库查询、缓存常用数据  
5. **负载均衡**：多进程模式（`cluster`模块）  

**工具推荐**：  

- `easy-monitor`：实时监控面板  
- `autocannon`：压力测试工具  
- `Chrome DevTools`：内存/CPU分析  
</AnswerBlock>

## 如何实现文件上传？

<AnswerBlock >

**实现步骤**：  

1. **前端表单**：  

   ```html
   <form action="/upload" method="post" enctype="multipart/form-data">
     <input type="file" name="file" />
     <button type="submit">上传</button>
   </form>
   ```

2. **后端处理**（Koa示例）：  

   ```javascript
   const Koa = require('koa');
   const koaBody = require('koa-body');
   const fs = require('fs');
   const path = require('path');

   const app = new Koa();
   app.use(koaBody({ multipart: true }));

   app.use(async (ctx) => {
     const file = ctx.request.files.file;
     const reader = fs.createReadStream(file.path);
     const filePath = path.join(__dirname, 'uploads', file.name);
     const writer = fs.createWriteStream(filePath);
     reader.pipe(writer);
     ctx.body = { success: true };
   });
   ```

**常用模块**：  

- `koa-body`：处理表单数据  
- `multer`：Express文件上传中间件  
- `formidable`：原生解析multipart/form-data  
</AnswerBlock>

## 如何实现JWT鉴权机制？

<AnswerBlock >

**核心流程**：  

1. **生成Token**（登录验证后）：  

   ```javascript
   const jwt = require('jsonwebtoken');
   const token = jwt.sign(
     { userId: 123, role: 'admin' },
     'secret_key',
     { expiresIn: '1h' }
   );
   ```

2. **验证Token**（接口访问前）：  

   ```javascript
   const koajwt = require('koa-jwt');
   app.use(koajwt({ secret: 'secret_key' }).unless({
     path: [/\/api\/login/] // 白名单
   }));
   ```

3. **前端携带Token**：  

   ```javascript
   // Axios请求拦截
   axios.interceptors.request.use(config => {
     const token = localStorage.getItem('token');
     config.headers.Authorization = `Bearer ${token}`;
     return config;
   });
   ```

**优缺点**：  

- **优点**：无状态、跨语言、适合分布式系统  
- **缺点**：Token泄露风险、需HTTPS加密传输  
</AnswerBlock>

## 如何实现分页查询？

<AnswerBlock >

**实现逻辑**：  

1. **前端参数**：  
   - `page`：当前页码（默认1）  
   - `pageSize`：每页数量（默认10）  

2. **后端计算**：  

   ```javascript
   const start = (page - 1) * pageSize;
   const sql = `SELECT * FROM users LIMIT ${pageSize} OFFSET ${start}`;
   ```

3. **返回数据**：  

   ```json
   {
     "totalCount": 1000,
     "totalPages": 100,
     "currentPage": 1,
     "data": [...]
   }
   ```

**优化建议**：  

- 使用索引加速查询  
- 缓存常用分页结果  
- 预计算总页数  

</AnswerBlock>
