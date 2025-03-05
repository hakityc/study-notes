# 使用 ant-design-x-vue 对接 DeepSeek

## 📌 前言

在前端开发领域，实现与 AI 模型的对接并高效管理流式输出是至关重要的挑战。关键在于如何以最小的代码量完成 AI 模型的对接，同时确保消息更新的准确性和高效性。本文将基于 `ant-design-x-vue` 框架，提供一种简洁且可行的实现方案。我们还会深入探讨两种不同的消息更新方案，详细分析它们各自的优缺点，以便开发者根据具体场景做出合适的选择。

---

## 🚀 代码实现

### `useAiChat.ts`

```typescript
import { type ThoughtChainItem, XRequest, useXAgent } from 'ant-design-x-vue';
import { v4 as uuid } from 'uuid';

// 定义基础 URL、请求路径和模型名称
const BASE_URL = '/llmService';
const PATH = '/chat';
const MODEL = '';

// 定义内容接口
export interface Content {
    content?: string;
    content_type?: string;
    msg_status?: string;
    role?: string;
    [property: string]: any;
}

// 定义发送消息的参数接口
interface SendMessageParams {
    content: string
}

// 定义消息类型接口
interface MessageType {
    id: string;
    content: string;
    role: string;
}

// 导出 useAiChat 函数
export const useAiChat = () => {
    // 定义消息数组、加载状态和消息状态
    const messages = ref<MessageType[]>([]);
    const loading = ref(false);
    const status = ref<ThoughtChainItem['status']>();

    // 创建请求实例
    const request = XRequest({
        baseURL: BASE_URL + PATH,
        model: MODEL,
    });

    // 存储每个 id 的更新队列
    const streamQueue: Record<string, Promise<void>> = {};

    // 模拟流式输出
    const streamOutput = async (content: string, callback: (char: string) => void) => {
        for (let i = 0; i < content.length; i++) {
            callback(content[i]);
            await new Promise((resolve) => setTimeout(resolve, 20));
        }
    };

    // 更新消息内容
    const updateMessage = async (id: string, contents: Content[]) => {
        const index = messages.value.findIndex((item) => item.id === id);
        if (index !== -1) {
            let fullContent = contents.map((item) => item.content).join('');

            // 确保按顺序执行
            const previousTask = streamQueue[id] || Promise.resolve();
            const currentTask = previousTask.then(async () => {
                await streamOutput(fullContent, (char) => {
                    messages.value[index].content += char;
                });
                console.log(`updateMessage [${id}] 完成:`, messages.value[index].content);
            });

            streamQueue[id] = currentTask; // 存储当前任务，确保后续任务排队执行
        }
    };

    // 发送请求
    const onRequest = async ({
        content
    }: SendMessageParams) => {
        try {
            loading.value = true;
            const sendMessageId = uuid();
            const receivedMessageId = uuid();

            // 添加用户消息和 AI 回复占位符
            messages.value = [...messages.value, { id: sendMessageId, content: content, role: 'user' }];
            messages.value = [...messages.value, { id: receivedMessageId, content: "", role: 'ai' }];

            // 发送请求
            await request.create(
                {
                    contents: [{ role: 'user', content }],
                    params: {
                        topic_id: '123'
                    }
                },
                {
                    onSuccess: (messages) => {
                        status.value = 'success';
                        console.log('onSuccess', messages);
                    },
                    onError: (error) => {
                        status.value = 'error';
                        console.error('onError', error);
                    },
                    onUpdate: (msg: { data: string }) => {
                        if (!msg.data) return;
                        const data = JSON.parse(msg.data);
                        updateMessage(receivedMessageId, data.contents);
                    },
                },
            );
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    // 清空消息列表
    const clearMessage = () => {
        messages.value = [];
    };

    return {
        onRequest,
        loading,
        status,
        messages,
        clearMessage
    };
};
```

### `suwen-chat-deepseek-content.vue`

```vue
<script lang="ts" setup>
import { Bubble, Sender, useXAgent, useXChat } from "ant-design-x-vue";
import { Flex } from "ant-design-vue";
import { useAiChat } from "@/api-v2/useAiChat";

// 定义消息输入框的值
const messageVal = ref("");

// 计算是否显示欢迎信息
const isShowWelcome = computed(() => !messageList.value.length);

// 计算消息列表
const messageList = computed(() => {
    const list = messages.value
      ?.slice()
      .reverse()
      .map(({ id, content, role }, index) => {
            return {
                key: id,
                placement: role == "user" ? "end" : "start",
                content,
            };
        });
    return list;
});

// 使用 useAiChat 钩子
const { onRequest, messages, loading, status } = useAiChat();

// 处理提交消息
const handleSubmit = async (val: string) => {
    try {
        if (messageVal.value) {
            await onRequest({
                content: val,
            });

            messageVal.value = "";
        }
    } catch (error) {
        console.error(error);
    }
};
</script>

<template>
    <!-- 消息列表 -->
    <div
        class="flex flex-col-reverse gap-2 h-full"
    >
        <Bubble
            v-for="item in messageList"
            v-key="item.key"
            :placement="item.placement"
            :content="item.content"
        />
    </div>
    <!-- 消息输入框 -->
    <div class="flex-1 h-0">
        <Sender
            ref="senderRef"
            :loading="loading"
            v-model:value="messageVal"
            @submit="handleSubmit"
            @cancel="() => (messageVal = '')"
        />
    </div>
</template>
```

### 核心逻辑

- **`sendMessage` 发送消息**：当用户输入消息并提交时，会添加用户输入的消息以及 AI 回复的占位符到消息列表中。
- **`onUpdate` 监听消息流**：在接收到服务器返回的消息流时，会调用 `updateMessage` 函数逐字更新 AI 回复的内容。

---

## 2️⃣ 两种实现方案：为什么？

在消息更新的过程中，我们会遇到两个主要的挑战：

1. **消息的完整性**：需要确保新旧内容能够正确合并，避免出现内容丢失或错误拼接的情况。
2. **并发控制**：要保证多个更新操作不会出现乱序，确保消息按照正确的顺序显示给用户。

为了解决这些问题，我们提出了两种不同的消息更新方案：

### ✨ 方案 1：基于内容拼接（简单但有缺陷）

这种方案适用于低并发、简单的场景。它的实现方式是直接将已有内容和新内容进行拼接，并逐字输出。

```typescript
const updateMessage = async (id: string, contents: Content[]) => {
    const index = messages.value.findIndex((item) => item.id === id);
    if (index !== -1) {
        let oldContent = messages.value[index].content;
        let fullContent = contents.map((item) => item.content).join('');
        messages.value[index].content = oldContent + fullContent;
        await streamOutput(fullContent.slice(oldContent.length), (char) => {
            messages.value[index].content += char;
        });
    }
};
```

**优点**：

- 逻辑简单，代码实现起来较为容易，对于初学者或者简单的项目来说，容易理解和维护。

**缺点**：

- 在并发情况下，可能会出现消息跳跃、内容覆盖的问题。因为多个更新操作可能会同时修改消息内容，导致消息显示混乱。

### ⚡ 方案 2：使用队列机制（稳定但复杂）

这种方案适用于高并发场景，通过 `Promise` 链式调用确保消息顺序更新。

```typescript
const streamQueue: Record<string, Promise<void>> = {};

const updateMessage = async (id: string, contents: Content[]) => {
    const index = messages.value.findIndex((item) => item.id === id);
    if (index !== -1) {
        let fullContent = contents.map((item) => item.content).join('');
        const previousTask = streamQueue[id] || Promise.resolve();
        const currentTask = previousTask.then(async () => {
            await streamOutput(fullContent, (char) => {
                messages.value[index].content += char;
            });
        });
        streamQueue[id] = currentTask;
    }
};
```

**优点**：

- 能够确保消息有序更新，适用于多人协作、AI 聊天等对消息顺序要求较高的场景。即使在高并发的情况下，也能保证消息按照正确的顺序显示给用户。

**缺点**：

- 增加了一定的代码复杂度，需要开发者对 `Promise` 链式调用有深入的理解，并且在维护和调试时也相对复杂。

---

## 3️⃣ 选哪种方案？

| 方案 | 适用场景 | 优点 | 缺点 |
|------|----------|------|------|
| **拼接方案** | 低并发 | 代码简单，易于实现和维护 | 并发情况下容易出现消息乱序 |
| **队列方案** | 高并发 | 消息顺序稳定，适用于复杂场景 | 代码复杂度较高 |

### 🚀 推荐

- **如果是 Demo 级别实现**：拼接方案已经足够满足需求，它可以快速实现功能，并且代码简单易懂。
- **如果用于生产环境**：强烈建议使用队列方案，因为生产环境通常会面临高并发的情况，需要保证消息的顺序和完整性。

---

## 📌 未来优化方向

- 🌟 **Web Worker 优化流式输出**：通过使用 Web Worker，可以将流式输出的处理任务放在后台线程中进行，减少对 UI 线程的阻塞，提高用户体验。
- 🌟 **使用 Diff 算法**：仅更新变更部分，避免不必要的内容更新，提高性能。
- 🌟 **结合 WebSocket**：使用 WebSocket 可以提高实时性，减少请求开销，确保消息能够及时、高效地传输。
