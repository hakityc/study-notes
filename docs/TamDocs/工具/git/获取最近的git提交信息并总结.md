# 获取最近的git提交信息并总结 <Badge type="warning" text="WIP" />

## 需求

每次发版的时候，通过总结git信息来生成发版日志，并通过Webhook发送到工作群中，方便团队成员了解版本更新情况。

## 问题

1. 获取最近的git提交信息的数量多大较为合适？

2. 如何精确总结git提交信息？

## 解决方案

1. 根据提交信息关键词筛选
可以在extractCommitInfo函数或者在获取提交列表之后添加一层筛选逻辑，根据一些预定义的关键词来判断哪些提交是更重要的。
例如，你可以定义一个关键词列表，像["fix", "bug", "feature", "update", "improve"]，然后在处理提交信息时，如果提交消息中包含这些关键词，就认为该提交相对重要。
以下是示例代码修改部分：

```javascript
const importantKeywords = ["fix", "bug", "feature", "update", "improve"];

const extractCommitInfo = (commitString) => {
    const [typeAndScope, content, dateTime] = commitString.split(/: | \(/);
    const [type, scope] = typeAndScope.split("(");
    const cleanScope = scope?.slice(0, -1);
    const cleanDateTime = dateTime?.slice(0, -6);

    // 判断是否包含重要关键词
    const isImportant = importantKeywords.some(keyword => commitString.toLowerCase().includes(keyword));

    if (!scope ||!content ||!dateTime) {
        return `
    提交信息(未解析):${commitString}`;
    }

    return `
    修改内容:${content || "无"}
    提交类型:${type || "无"}
    影响范围:${cleanScope || "无"}
    修改时间:${cleanDateTime || "无"}
    是否重要:${isImportant? "是" : "否"}`;
};
```

然后在handlePostWebhook函数中，当获取到提交列表后，可以根据是否重要这个属性来筛选出重要的提交进行展示，而不是仅仅获取最近的几条。
2. 结合提交频率和时间权重
可以考虑给较新的提交以及提交频率较高的时间段内的提交赋予更高的权重，以此来判断哪些提交更可能是重要的。
例如，你可以设定一个时间窗口（比如最近一周），在这个时间窗口内的提交权重更高，并且如果某个时间段内（比如一天内）提交次数较多，那么这个时间段内的提交也更有可能被视为重要提交。
以下是一个简单的示例思路，假设你在脚本中已经引入了moment库来处理时间相关操作（npm install moment）：

```javascript
import moment from "moment";

//... 其他代码部分

const handlePostWebhook = async () => {
    try {
        const allCommits = await getRecentGitCommits(); // 获取所有近期提交，这里假设函数修改为不限制数量获取

        const now = moment();
        const oneWeekAgo = now.subtract(1, 'week');
        const importantCommits = [];

        allCommits.forEach((commit) => {
            const commitTime = moment(commit.modifiedTime); // 假设extractCommitInfo函数返回对象中包含modifiedTime属性

            // 判断是否在最近一周内
            const isRecent = commitTime.isAfter(oneWeekAgo);

            // 这里可以进一步根据提交频率等因素细化权重计算
            if (isRecent) {
                importantCommits.push(commit);
            }
        });

        const response = await fetch(webhookConfig.url, {
            method: "POST",
            headers: webhookConfig.header,
            body: JSON.stringify({
                msg_type: webhookConfig.msgType,
                content: {
                    post: {
                        zh_cn: {
                            title: "项目发版通知",
                            content: [
                                [
                                    { tag: "text", text: `环境: ${MODE}` },
                                    { tag: "text", text: `\n` },
                                    { tag: "text", text: `版本号: ${VERSION}` },
                                    { tag: "text", text: `\n` },
                                    { tag: "text", text: `发布改动[重要提交]:` },
                                    { tag: "text", text: `${importantCommits.map(commit => extractCommitInfo(commit)).join('\n')}` },
                                ],
                            ],
                        },
                    },
                },
            }),
        });

        //... 后续处理与之前相同
    } catch (error) {
        console.error(`Error: Failed to execute request, ${error}`);
        process.exit(1);
    }
};
```

在上述示例中，首先获取所有近期提交，然后根据时间窗口（最近一周）筛选出可能重要的提交，最后将这些重要提交的信息通过 Webhook 发送出去。
3. 结合代码变动量
除了基于提交信息和时间因素外，还可以考虑结合代码变动量来判断提交的重要性。可以通过一些工具（如git diff等）来分析每个提交前后的代码变动情况，比如统计新增行数、删除行数、修改行数等，然后根据设定的阈值来判断哪些提交是重要的。
不过这种方法相对复杂一些，需要更多的代码来实现对代码变动量的准确分析和判断。
例如，以下是一个简单的思路，通过git diff来大致统计每个提交的代码变动量：

```javascript
const getCodeChangeVolume = async (commitHash) => {
    try {
        const output = await $`git diff ${commitHash}^!`;
        const lines = output.stdout.split("\n");
        let addedLines = 0;
        let deletedLines = 0;
        let modifiedLines = 0;

        lines.forEach((line) => {
            if (line.startsWith("+")) {
                addedLines++;
            } else if (line.startsWith("-")) {
                deletedLines++;
            } else if (line.startsWith(" ")) {
                modifiedLines++;
            }
        });

        return { addedLines, deletedLines, modifiedLines };
    } catch (error) {
        console.error("Error calculating code change volume for commit:", error);
        return null;
    }
};

const handlePostWebhook = async () => {
    try {
        const allCommits = await getRecentGitCommits(); // 获取所有近期提交，这里假设函数修改为不限制数量获取

        const importantCommits = [];

        for (let i = 0; i < allCommits.length; i++) {
            const commit = allCommits[i];
            const codeChangeVolume = await getCodeChangeVolume(commit.hash);

            // 根据代码变动量设定阈值判断是否重要
            if (codeChangeVolume && (codeChangeVolume.addedLines > 10 || codeChangeVolume.deletedLines > 10 || codeChangeVolume.modifiedLines > 10)) {
                importantCommits.push(commit);
            }
        }

        const response = await fetch(webhookConfig.url, {
            method: "POST",
            headers: webhookConfig.header,
            body: JSON.stringify({
                msg_type: webhookConfig.msgType,
                content: {
                    post: {
                        zh_cn: {
                            title: "项目发版通知",
                            content: [
                                [
                                    { tag: "text", text: `环境: ${MODE}` },
                                    { tag: "text", text: `\n` },
                                    { tag: "text", text: `版本号: ${VERSION}` },
                                    { tag: "text", text: `\n` },
                                    { tag: "text", text: `发布改动[重要提交]:` },
                                    { tag: "text", text: `${importantCommits.map(commit => extractCommitInfo(commit)).join('\n')}` },
                                ],
                            ],
                        },
                    },
                },
            }),
        });

        //... 后续处理与之前相同
    } catch (error) {
        console.error(`Error: Failed to execute request, ${error}`);
        process.exit(1);
    }
};
```
