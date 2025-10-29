# ClientType Action 验证系统

## 概述

通过服务端统一维护配置，确保不同 `clientType` 只能使用其支持的 `actions`。Web 端和服务端共享同一份配置，实现自动同步和验证。

**实现日期：** 2025-10-13  
**状态：** ✅ 完成

## 系统架构

```
┌─────────────────────────────────────┐
│   服务端配置（唯一数据源）          │
│   src/config/clientTypeActions.ts   │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ CLIENT_TYPE_ACTIONS         │  │
│   │ {                           │  │
│   │   web: [...],               │  │
│   │   windows: [...]            │  │
│   │ }                           │  │
│   └─────────────────────────────┘  │
└────────────┬────────────────────────┘
             │
         ┌───┴───┐
         │       │
    ┌────▼──┐ ┌─▼────┐
    │ API   │ │ WS   │
    │ 路由  │ │ 验证 │
    └───┬───┘ └──┬───┘
        │        │
        ▼        ▼
   ┌────────┐ ┌──────────┐
   │ Web 端 │ │  消息    │
   │  UI    │ │  处理    │
   └────────┘ └──────────┘
```

## 核心配置

### 配置文件：`src/config/clientTypeActions.ts`

```typescript
export const CLIENT_TYPE_ACTIONS: Record<ClientType, ActionConfig[]> = {
  web: [
    {
      action: WebSocketAction.CONNECT_TAB,
      name: '连接标签页',
      description: '连接浏览器标签页',
      category: 'system',
    },
    {
      action: WebSocketAction.AI,
      name: 'AI 执行',
      description: '执行 AI 自然语言指令',
      category: 'basic',
    },
    // ... 更多 actions
  ],
  windows: [
    {
      action: WebSocketAction.AI,
      name: 'AI 执行',
      description: '执行 Windows 桌面 AI 指令',
      category: 'basic',
    },
    // ... 更多 actions
  ],
};
```

**配置字段说明：**

- `action`: Action 枚举值
- `name`: 显示名称
- `description`: 详细描述
- `category`: 分类（basic/advanced/system）

## API 接口

### 1. 获取完整配置

```http
GET /api/client-type-actions
```

**响应：**

```json
{
  "success": true,
  "data": {
    "clientTypes": ["web", "windows"],
    "actions": {
      "web": [
        {
          "action": "connectTab",
          "name": "连接标签页",
          "description": "连接浏览器标签页",
          "category": "system"
        },
        // ... 更多 actions
      ],
      "windows": [...]
    }
  }
}
```

### 2. 获取所有客户端类型

```http
GET /api/client-type-actions/types
```

**响应：**

```json
{
  "success": true,
  "data": ["web", "windows"]
}
```

### 3. 获取指定客户端类型的 Actions

```http
GET /api/client-type-actions/:clientType
```

**示例：**

```http
GET /api/client-type-actions/web
GET /api/client-type-actions/windows
```

**响应：**

```json
{
  "success": true,
  "data": {
    "clientType": "web",
    "actions": ["connectTab", "ai", "aiScript", ...],
    "configs": [
      {
        "action": "connectTab",
        "name": "连接标签页",
        "description": "连接浏览器标签页",
        "category": "system"
      },
      // ... 更多 configs
    ]
  }
}
```

### 4. 获取详细配置

```http
GET /api/client-type-actions/:clientType/configs
```

**响应：**

```json
{
  "success": true,
  "data": {
    "clientType": "web",
    "configs": [...],
    "total": 6
  }
}
```

## 服务端验证

### WebSocket 消息验证

在 `src/websocket/index.ts` 中自动验证：

```typescript
// 验证 action 是否被 clientType 支持
const clientType = message.meta?.clientType || 'web';
const validation = validateMessageAction(clientType, action);

if (!validation.valid) {
  // 返回错误消息
  const errorMessage = MessageBuilder.createErrorResponse(
    message,
    validation.error || 'Action 不支持',
  );
  sendMessage(ws, errorMessage);
  return;
}
```

**错误响应示例：**

```json
{
  "meta": { ... },
  "payload": {
    "action": "connectTab",
    "status": "failed",
    "error": "Action 'connectTab' 不支持 windows 端。支持的 actions: ai, aiScript, command"
  }
}
```

## Web 端集成

### 1. Hook：`useClientTypeActions`

```typescript
const {
  config,                         // 完整配置
  loading,                        // 加载状态
  error,                          // 错误信息
  getActionsForClientType,        // 获取可用 actions
  getActionNamesForClientType,    // 获取 action 名称列表
  isActionSupported,              // 检查是否支持
  getActionsByCategory,           // 按类别分组
} = useClientTypeActions();
```

### 2. ActionSelector 组件

**自动功能：**

- ✅ 根据 `clientType` 动态显示可用 actions
- ✅ 按类别分组（基础/高级/系统）
- ✅ 显示 action 详细描述
- ✅ 不支持的 action 显示警告
- ✅ 显示客户端图标和支持数量
- ✅ 加载状态和错误处理

**使用方式：**

```tsx
<ActionSelector
  value={action}
  onChange={setAction}
  clientType={meta.clientType || 'web'}
/>
```

### 3. UI 效果

#### 选择 Web 端时

```
┌───────────────────────────────────┐
│ 选择 Action 类型 📱 (web 端)     │
├───────────────────────────────────┤
│ ┌───────────────────────────────┐ │
│ │ AI 执行 ▼                     │ │
│ └───────────────────────────────┘ │
│                                   │
│ 基础操作                          │
│   - AI 执行                       │
│ 高级操作                          │
│   - AI 脚本                       │
│   - 下载视频                      │
│   - 站点脚本                      │
│ 系统操作                          │
│   - 连接标签页                    │
│   - 服务命令                      │
│                                   │
│ 💡 执行 AI 自然语言指令           │
│ 📊 web 端支持 6 个操作            │
└───────────────────────────────────┘
```

#### 选择 Windows 端时

```
┌───────────────────────────────────┐
│ 选择 Action 类型 🖥️ (windows 端) │
├───────────────────────────────────┤
│ ┌───────────────────────────────┐ │
│ │ AI 执行 ▼                     │ │
│ └───────────────────────────────┘ │
│                                   │
│ 基础操作                          │
│   - AI 执行                       │
│ 高级操作                          │
│   - AI 脚本                       │
│ 系统操作                          │
│   - 服务命令                      │
│                                   │
│ 💡 执行 Windows 桌面 AI 指令      │
│ 📊 windows 端支持 3 个操作        │
└───────────────────────────────────┘
```

#### 不支持警告

```
┌───────────────────────────────────┐
│ ⚠️ 当前 Action "connectTab"       │
│    不支持 windows 端              │
│                                   │
│ 请选择其他 Action 或切换客户端类型│
└───────────────────────────────────┘
```

## 工具函数

### 服务端（`src/config/clientTypeActions.ts`）

```typescript
// 获取支持的 actions
getSupportedActions('web')
// => ['connectTab', 'ai', 'aiScript', ...]

// 获取完整配置
getActionConfigs('windows')
// => [{ action: 'ai', name: 'AI 执行', ... }, ...]

// 验证 action
isActionSupported('windows', 'connectTab')
// => false

// 验证消息
validateMessageAction('windows', 'connectTab')
// => { valid: false, error: "Action 'connectTab' 不支持..." }
```

### Web 端（`useClientTypeActions` hook）

```typescript
// 获取可用 actions
const actions = getActionsForClientType('web');

// 按类别分组
const { basic, advanced, system } = getActionsByCategory('web');

// 检查支持
const supported = isActionSupported('windows', 'connectTab');
```

## 添加新 Action

### 步骤 1: 在配置中添加

编辑 `src/config/clientTypeActions.ts`：

```typescript
export const CLIENT_TYPE_ACTIONS = {
  web: [
    // ... 现有 actions
    {
      action: WebSocketAction.NEW_ACTION,  // 新 action
      name: '新功能',
      description: '这是一个新功能',
      category: 'advanced',
    },
  ],
  windows: [
    // 如果 Windows 也支持，添加到这里
  ],
};
```

### 步骤 2: 实现 Handler

创建对应的 handler 文件：

- Web: `src/websocket/actions/newAction.ts`
- Windows: `src/websocket/actions/windows/newAction.ts`

### 步骤 3: 注册 Handler

在 `src/websocket/handlers/messageHandlers.ts` 中注册。

### 步骤 4: 测试

1. 重启服务器
2. Web 端自动从 API 获取最新配置
3. ActionSelector 自动显示新 action

**无需修改 Web 端代码！**

## 优势

### 1. 单一数据源

- ✅ 服务端统一维护
- ✅ 避免配置不同步
- ✅ 易于管理和更新

### 2. 自动同步

- ✅ Web 端启动时自动获取
- ✅ 无需手动更新前端代码
- ✅ 配置变更立即生效

### 3. 类型安全

- ✅ TypeScript 类型检查
- ✅ 编译时错误提示
- ✅ IDE 自动补全

### 4. 用户友好

- ✅ 动态显示可用操作
- ✅ 不支持的操作显示警告
- ✅ 分类展示，易于查找
- ✅ 详细描述和提示

### 5. 安全性

- ✅ 服务端验证所有请求
- ✅ 防止非法 action
- ✅ 详细的错误信息

## 当前配置

### Web 端（6 个操作）

| Action | 名称 | 类别 |
|--------|------|------|
| `connectTab` | 连接标签页 | 系统 |
| `ai` | AI 执行 | 基础 |
| `aiScript` | AI 脚本 | 高级 |
| `downloadVideo` | 下载视频 | 高级 |
| `siteScript` | 站点脚本 | 高级 |
| `command` | 服务命令 | 系统 |

### Windows 端（3 个操作）

| Action | 名称 | 类别 |
|--------|------|------|
| `ai` | AI 执行 | 基础 |
| `aiScript` | AI 脚本 | 高级 |
| `command` | 服务命令 | 系统 |

## 测试场景

### 场景 1: 正常流程

```
1. Web 端启动
2. 自动调用 /api/client-type-actions
3. 获取配置成功
4. ActionSelector 显示可用 actions
5. 用户选择 action
6. 发送消息
7. 服务端验证通过
8. 执行成功
```

### 场景 2: 切换客户端类型

```
1. 用户选择 web 端
2. ActionSelector 显示 6 个 actions
3. 用户选择 "connectTab"
4. 用户切换到 windows 端
5. ActionSelector 显示 3 个 actions
6. 显示警告："connectTab 不支持 windows 端"
7. 用户选择 "ai"
8. 警告消失，正常使用
```

### 场景 3: 非法 Action

```
1. 用户修改 JSON，手动添加不支持的 action
2. 发送消息
3. 服务端验证失败
4. 返回错误：
   "Action 'connectTab' 不支持 windows 端。
    支持的 actions: ai, aiScript, command"
5. 消息监控显示错误
```

## 故障排除

### 问题 1: Web 端无法加载配置

**症状：** ActionSelector 显示加载失败

**解决：**

1. 检查服务端是否启动：`http://localhost:3000`
2. 检查 API 是否可访问：`curl http://localhost:3000/api/client-type-actions`
3. 检查浏览器控制台网络请求
4. 确认 CORS 配置正确

### 问题 2: ActionSelector 显示空白

**症状：** 没有可选的 actions

**解决：**

1. 检查 `clientType` 是否正确传递
2. 检查配置文件是否有该 clientType
3. 查看浏览器控制台错误

### 问题 3: 服务端验证失败

**症状：** 消息发送后返回 "Action 不支持"

**解决：**

1. 确认 `meta.clientType` 正确
2. 确认 action 在配置中存在
3. 检查服务端日志
4. 验证配置同步

## 相关文件

### 服务端

- `src/config/clientTypeActions.ts` - 配置文件
- `src/routes/clientTypeActions.ts` - API 路由
- `src/websocket/index.ts` - WebSocket 验证
- `src/routes/index.ts` - 路由注册

### Web 端

- `src/hooks/useClientTypeActions.ts` - Hook
- `src/components/debug/ActionSelector.tsx` - 组件
- `src/pages/midsceneDebugPage.tsx` - 页面集成

## 最佳实践

### 1. 配置管理

- 在配置文件中添加详细的描述
- 使用清晰的分类
- 保持命名一致性

### 2. 添加新 Action

```
1. 先在配置中添加
2. 实现 handler
3. 注册 handler
4. 测试验证
5. 更新文档
```

### 3. 错误处理

- 提供清晰的错误信息
- 指明支持的 actions
- 记录详细日志

### 4. 用户体验

- 分类显示 actions
- 提供详细描述
- 显示不支持警告
- 加载状态提示

## 未来扩展

### 短期

- [ ] 添加 action 的图标
- [ ] 支持 action 搜索
- [ ] 添加 action 使用示例

### 中期

- [ ] 动态权限控制
- [ ] Action 依赖关系
- [ ] 批量操作支持

### 长期

- [ ] 插件化 action 系统
- [ ] 用户自定义 action
- [ ] Action 市场

## 总结

通过服务端统一维护配置，实现了：

- ✅ 配置集中管理
- ✅ Web 端自动同步
- ✅ 服务端严格验证
- ✅ 用户友好的 UI
- ✅ 类型安全保障
- ✅ 易于扩展维护

这大大简化了不同 clientType 的 action 管理，确保了系统的一致性和安全性！

---

**维护者：** 开发团队  
**最后更新：** 2025-10-13  
**状态：** ✅ 生产就绪
