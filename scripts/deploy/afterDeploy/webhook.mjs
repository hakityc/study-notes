// #!/usr/bin/env zx

// import minimist from "minimist";
// const { MODE } = minimist(process.argv?.slice(2));

// const webhookConfig = {
//   url: "https://open.feishu.cn/open-apis/bot/v2/hook/f36c397e-219a-44a8-a0c0-8916af970d23",
//   header: { "Content-Type": "application/json;charset=utf-8" },
//   msgType: "post",
// };
// const VERSION = process.env.npm_package_version;
// const main = async () => {
//   const getRecentGitCommits = async (count) => {
//     try {
//       const output = await $`git log -n ${count} --pretty=format:"%h - %s (%ci)"`;
//       const commits = output.stdout.split("\n").filter((line) => !line.includes("Merge branch"));
//       const formattedCommits = commits
//         .map((commit, index) => {
//           const [hash, message] = commit.split(" - ");
//           return extractCommitInfo(message);
//         })
//         .join("\n");
//       return formattedCommits;
//     } catch (error) {
//       console.error("Error fetching git commits:", error);
//       return null;
//     }
//   };
//   const extractCommitInfo = (commitString) => {
//     const [typeAndScope, content, dateTime] = commitString.split(/: | \(/);
//     const [type, scope] = typeAndScope.split("(");
//     // console.log(type, scope, content, dateTime);
//     const cleanScope = scope?.slice(0, -1);
//     const cleanDateTime = dateTime?.slice(0, -6);
//     if (!scope || !content || !dateTime) {
//       return `
//     提交信息(未解析):${commitString}`;
//     }
//     return `
//     修改内容:${content || "无"}
//     提交类型:${type || "无"}
//     影响范围:${cleanScope || "无"}
//     修改时间:${cleanDateTime || "无"}`;
//   };
//   const handlePostWebhook = async () => {
//     try {
//       const response = await fetch(webhookConfig.url, {
//         method: "POST",
//         headers: webhookConfig.header,
//         body: JSON.stringify({
//           msg_type: webhookConfig.msgType,
//           content: {
//             post: {
//               zh_cn: {
//                 title: "项目发版通知",
//                 content: [
//                   [
//                     { tag: "text", text: `环境: ${MODE}` },
//                     { tag: "text", text: `\n` },
//                     { tag: "text", text: `版本号: ${VERSION}` },
//                     { tag: "text", text: `\n` },
//                     { tag: "text", text: `发布改动[前3条]:` },
//                     { tag: "text", text: `${await getRecentGitCommits(3)}` },
//                   ],
//                 ],
//               },
//             },
//           },
//         }),
//       });

//       if (!response.ok) {
//         console.error(`Error: Request to webhook URL failed with HTTP status code ${response.status}`);
//         process.exit(1);
//       } else {
//         console.log("Webhook request successful");
//       }
//     } catch (error) {
//       console.error(`Error: Failed to execute request, ${error}`);
//       process.exit(1);
//     }
//   };
//   await handlePostWebhook();
// };

// await main();
