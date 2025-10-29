# ActionSelector 智能选择器使用指南

## 概述

ActionSelector 现在是一个智能组件，可以根据选择的客户端类型动态显示可用的操作。

**更新日期：** 2025-10-13

## 核心特性

### ✨ 动态 Action 列表

根据 `clientType` 自动显示对应的可用操作：

- **Web 端：** 6 个操作（浏览器相关）
- **Windows 端：** 3 个操作（桌面相关）

### 🎯 智能分类

Actions 按功能分为三类：

1. **基础操作** - 日常使用的核心功能
2. **高级操作** - 复杂场景和专业功能
3. **系统操作** - 服务控制和系统管理

### ⚠️ 实时验证

- 选择不支持的 action 时显示警告
- 切换客户端类型时自动验证
- 提供清晰的错误提示

### 📊 状态展示

- 显示当前客户端类型图标
- 显示支持的操作数量
- 显示选中操作的详细描述

## 界面展示

### Web 端选择器

```
┌────────────────────────────────────┐
│ 选择 Action 类型 📱 (web 端)      │
├────────────────────────────────────┤
│ ┌────────────────────────────────┐ │
│ │ AI 执行 ▼                      │ │
│ └────────────────────────────────┘ │
│                                    │
│ 下拉展开后：                       │
│ ┌────────────────────────────────┐ │
│ │ 基础操作                       │ │
│ │   • AI 执行                    │ │
│ │                                │ │
│ │ 高级操作                       │ │
│ │   • AI 脚本                    │ │
│ │   • 下载视频                   │ │
│ │   • 站点脚本                   │ │
│ │                                │ │
│ │ 系统操作                       │ │
│ │   • 连接标签页                 │ │
│ │   • 服务命令                   │ │
│ └────────────────────────────────┘ │
│                                    │
│ 💡 执行 AI 自然语言指令            │
│ 📊 web 端支持 6 个操作             │
└────────────────────────────────────┘
```

### Windows 端选择器

```
┌────────────────────────────────────┐
│ 选择 Action 类型 🖥️ (windows 端)  │
├────────────────────────────────────┤
│ ┌────────────────────────────────┐ │
│ │ AI 执行 ▼                      │ │
│ └────────────────────────────────┘ │
│                                    │
│ 下拉展开后：                       │
│ ┌────────────────────────────────┐ │
│ │ 基础操作                       │ │
│ │   • AI 执行                    │ │
│ │                                │ │
│ │ 高级操作                       │ │
│ │   • AI 脚本                    │ │
│ │                                │ │
│ │ 系统操作                       │ │
│ │   • 服务命令                   │ │
│ └────────────────────────────────┘ │
│                                    │
│ 💡 执行 Windows 桌面 AI 指令       │
│ 📊 windows 端支持 3 个操作         │
└────────────────────────────────────┘
```

### 不支持警告

```
┌────────────────────────────────────┐
│ ⚠️ 当前 Action "connectTab"        │
│    不支持 windows 端               │
│                                    │
│ 请选择其他 Action 或切换客户端类型 │
└────────────────────────────────────┘
```

## 使用流程

### 基本流程

```
1. 选择客户端类型（Web/Windows）
   ↓
2. ActionSelector 自动刷新可用操作
   ↓
3. 选择需要的操作
   ↓
4. 查看操作描述
   ↓
5. 填写参数并发送
```

### 切换场景

```
场景：从 Web 切换到 Windows

1. 当前状态：
   - 客户端：Web
   - Action：connectTab（连接标签页）
   
2. 切换客户端为 Windows
   ↓
3. 显示警告：
   ⚠️ "connectTab" 不支持 windows 端
   
4. 选择支持的 action：
   - 选择 "ai" 或 "aiScript" 或 "command"
   
5. 警告消失，正常使用
```

## 组件属性

```typescript
interface ActionSelectorProps {
  value: WebSocketAction;           // 当前选中的 action
  onChange: (value: WebSocketAction) => void;  // 改变回调
  clientType: ClientType;            // 客户端类型（必需）
}
```

**使用示例：**

```tsx
<ActionSelector
  value={action}
  onChange={setAction}
  clientType={meta.clientType || 'web'}
/>
```

## 状态说明

### 加载中

```
┌────────────────────────────┐
│ 🔄 加载可用操作...        │
└────────────────────────────┘
```

**原因：** 正在从服务端获取配置

**解决：** 等待加载完成（通常 < 1 秒）

### 加载失败

```
┌────────────────────────────┐
│ ❌ 加载失败: [错误信息]   │
└────────────────────────────┘
```

**原因：**

- 服务端未启动
- 网络连接问题
- API 接口错误

**解决：**

1. 确认服务端运行
2. 检查网络连接
3. 刷新页面重试

### 正常使用

显示分类的 action 列表，包括：

- 操作名称
- 操作描述
- 支持数量统计
- 客户端类型图标

## 实用技巧

### 技巧 1: 快速切换

```
1. 切换客户端类型
2. ActionSelector 自动更新
3. 如果当前 action 不支持，会显示警告
4. 选择一个支持的 action 继续
```

### 技巧 2: 查看描述

```
每个 action 选中后都会显示详细描述：
💡 执行 AI 自然语言指令
```

### 技巧 3: 按类别浏览

```
下拉列表按类别分组：
├─ 基础操作
│  └─ AI 执行
├─ 高级操作
│  ├─ AI 脚本
│  ├─ 下载视频
│  └─ 站点脚本
└─ 系统操作
   ├─ 连接标签页
   └─ 服务命令
```

### 技巧 4: 确认支持

```
查看底部的统计信息：
📊 web 端支持 6 个操作
📊 windows 端支持 3 个操作
```

## 对比表格

### 功能对比

| 功能 | 旧版本 | 新版本 |
|------|-------|--------|
| Action 列表 | 静态硬编码 | ✅ 动态从服务端获取 |
| 跨平台支持 | 所有 action 都显示 | ✅ 根据 clientType 过滤 |
| 分类展示 | 无分类 | ✅ 按类别分组 |
| 验证提示 | 无 | ✅ 实时警告 |
| 配置同步 | 手动更新代码 | ✅ 自动同步 |

### UI 对比

| 元素 | 旧版本 | 新版本 |
|------|-------|--------|
| 客户端图标 | 无 | ✅ 📱/🖥️ |
| 分类标签 | 无 | ✅ 基础/高级/系统 |
| 操作统计 | 无 | ✅ 显示数量 |
| 不支持警告 | 无 | ✅ 黄色警告框 |
| 加载状态 | 无 | ✅ 加载动画 |

## 开发者指南

### 添加新 Action（完整流程）

#### 1. 更新枚举（如果需要）

```typescript
// src/utils/enums.ts
export enum WebSocketAction {
  // ... 现有
  YOUR_NEW_ACTION = 'yourNewAction',  // 添加新枚举
}
```

#### 2. 添加到配置

```typescript
// src/config/clientTypeActions.ts
export const CLIENT_TYPE_ACTIONS = {
  web: [
    {
      action: WebSocketAction.YOUR_NEW_ACTION,
      name: '新功能名称',
      description: '这是一个新功能，用于...',
      category: 'advanced',
    },
    // ...
  ],
};
```

#### 3. 实现 Handler

```typescript
// src/websocket/actions/yourNewAction.ts
export function createYourNewActionHandler(): MessageHandler {
  return async ({ send }, message) => {
    // 实现逻辑
  };
}
```

#### 4. 注册 Handler

```typescript
// src/websocket/handlers/messageHandlers.ts
import { createYourNewActionHandler } from '../actions/yourNewAction';

export function createWebMessageHandlers() {
  return {
    // ...
    [WebSocketAction.YOUR_NEW_ACTION]: createYourNewActionHandler(),
  };
}
```

#### 5. 测试

```
1. 重启服务器
2. 刷新 Web 页面
3. 选择 Web 端
4. 在 ActionSelector 中看到新 action
5. 测试功能
```

### 修改现有 Action

#### 只改描述

```typescript
// src/config/clientTypeActions.ts
{
  action: WebSocketAction.AI,
  name: 'AI 执行',
  description: '新的描述文本',  // ← 只改这里
  category: 'basic',
}
```

**无需重启，刷新页面即可。**

#### 改变分类

```typescript
{
  action: WebSocketAction.SITE_SCRIPT,
  name: '站点脚本',
  description: '...',
  category: 'system',  // 从 'advanced' 改为 'system'
}
```

**重启服务器，刷新页面。**

#### 移除 Action

```typescript
// 从数组中删除对应配置
export const CLIENT_TYPE_ACTIONS = {
  web: [
    // { action: WebSocketAction.OLD_ACTION, ... },  ← 注释或删除
    { action: WebSocketAction.AI, ... },
    // ...
  ],
};
```

**重启服务器，刷新页面。**

## 调试技巧

### 1. 查看加载的配置

打开浏览器控制台：

```javascript
// 在 useClientTypeActions hook 中打印
console.log('Loaded config:', config);
```

### 2. 验证 API 响应

```bash
curl http://localhost:3000/api/client-type-actions | jq
```

### 3. 检查网络请求

浏览器开发者工具 → Network → 搜索 `client-type-actions`

### 4. 模拟不同场景

```typescript
// 临时修改 clientType 测试
const testClientType = 'windows';
<ActionSelector clientType={testClientType} ... />
```

## 最佳实践

### 1. 保持配置简洁

- 描述控制在 20 字以内
- 使用清晰的动词开头
- 避免技术术语

### 2. 合理分类

```
基础操作 → 高频使用，简单直接
高级操作 → 复杂场景，需要配置
系统操作 → 服务管理，谨慎使用
```

### 3. 命名一致性

```
✅ 好的命名：
- AI 执行
- AI 脚本
- 服务命令

❌ 不好的命名：
- Execute AI
- run script
- CMD
```

### 4. 及时更新文档

每次添加新 action 都应该更新：

- 配置注释
- API 文档
- 用户指南

## 相关组件

### MetaForm

提供客户端类型选择，ActionSelector 会响应这个选择：

```tsx
<MetaForm 
  meta={meta}
  onChange={setMeta}  // 改变 clientType 会影响 ActionSelector
/>

<ActionSelector
  clientType={meta.clientType || 'web'}  // 从 meta 获取
  ...
/>
```

### JsonPreview

显示完整的消息结构，包含选中的 action：

```json
{
  "meta": {
    "clientType": "web"
  },
  "payload": {
    "action": "ai",  // ← ActionSelector 选择的
    "params": "..."
  }
}
```

## 故障排除

### 问题：ActionSelector 一直显示"加载中"

**可能原因：**

1. 服务端未启动
2. API 端口不对
3. 网络连接问题

**解决步骤：**

```bash
# 1. 检查服务端
curl http://localhost:3000/api/client-type-actions

# 2. 如果无响应，启动服务端
cd apps/server
pnpm dev

# 3. 刷新 Web 页面
```

### 问题：切换客户端后 ActionSelector 没变化

**可能原因：**

- `clientType` 没有正确传递
- 组件没有重新渲染

**解决步骤：**

1. 检查 `meta.clientType` 的值
2. 确认 `ActionSelector` 的 `clientType` prop
3. 打开 React DevTools 查看组件 props

### 问题：显示"加载失败"

**错误示例：**

```
❌ 加载失败: Failed to fetch
```

**解决步骤：**

1. 确认服务端运行在 `http://localhost:3000`
2. 检查 CORS 配置
3. 查看浏览器控制台网络错误
4. 尝试直接访问 API

### 问题：所有 actions 都显示警告

**可能原因：**

- `clientType` 值不正确
- 配置未正确加载

**解决步骤：**

1. 检查 `meta.clientType` 的值
2. 刷新页面重新加载配置
3. 检查浏览器控制台错误

## 高级用法

### 编程式获取配置

```typescript
import { useClientTypeActions } from '@/hooks/useClientTypeActions';

function MyComponent() {
  const { 
    config,
    getActionsForClientType,
    isActionSupported,
  } = useClientTypeActions();

  // 获取 Web 端所有 actions
  const webActions = getActionsForClientType('web');
  
  // 检查是否支持
  const canConnect = isActionSupported('web', 'connectTab'); // true
  const canConnectWin = isActionSupported('windows', 'connectTab'); // false
  
  return <div>...</div>;
}
```

### 自定义 UI

```typescript
function CustomActionSelector({ clientType }: { clientType: ClientType }) {
  const { getActionsByCategory } = useClientTypeActions();
  const { basic, advanced, system } = getActionsByCategory(clientType);
  
  return (
    <div>
      <h3>基础操作</h3>
      {basic.map(action => (
        <button key={action.action}>
          {action.name}
        </button>
      ))}
      
      <h3>高级操作</h3>
      {advanced.map(action => (
        <button key={action.action}>
          {action.name}
        </button>
      ))}
      
      <h3>系统操作</h3>
      {system.map(action => (
        <button key={action.action}>
          {action.name}
        </button>
      ))}
    </div>
  );
}
```

### 条件渲染

```typescript
function ConditionalActions({ clientType }: { clientType: ClientType }) {
  const { isActionSupported } = useClientTypeActions();
  
  return (
    <div>
      {isActionSupported(clientType, 'connectTab') && (
        <button>连接标签页</button>
      )}
      
      {isActionSupported(clientType, 'downloadVideo') && (
        <button>下载视频</button>
      )}
      
      {/* AI 和 command 两端都支持 */}
      <button>AI 执行</button>
      <button>服务命令</button>
    </div>
  );
}
```

## 性能优化

### Hook 缓存

`useClientTypeActions` 内部使用 `useMemo` 缓存结果：

```typescript
const availableActions = useMemo(
  () => getActionsForClientType(clientType),
  [clientType, getActionsForClientType]
);
```

### 减少重新渲染

只有 `clientType` 变化时才重新获取 actions。

### API 调用优化

配置只在组件挂载时获取一次，后续使用缓存。

## 相关文档

- [CLIENT_TYPE_USAGE.md](./CLIENT_TYPE_USAGE.md) - 客户端类型使用指南
- [../../server/docs/CLIENT_TYPE_ACTION_VALIDATION.md](../../server/docs/CLIENT_TYPE_ACTION_VALIDATION.md) - 服务端验证系统
- [../../server/docs/ACTION_CONFIG_REFERENCE.md](../../server/docs/ACTION_CONFIG_REFERENCE.md) - 配置参考

## 总结

ActionSelector 现在是一个完全动态的智能组件：

- ✅ 自动从服务端获取配置
- ✅ 根据 clientType 过滤 actions
- ✅ 分类展示，易于查找
- ✅ 实时验证，防止错误
- ✅ 友好提示，引导用户
- ✅ 完整的错误处理

让多平台开发和测试变得简单高效！

---

**最后更新：** 2025-10-13  
**状态：** ✅ 生产就绪
