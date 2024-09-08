// .vitepress/config.js
import { defineConfig } from "vitepress";
// import viteConfig from "../../vite.config";

export default defineConfig({
  title: "Tam的博客",
  description: "",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: "/favicon.ico",
    siteTitle: "Tam Blog",
    nav: [
      { text: "前端开发", link: "/TamDocs/frontend/index" },
      { text: "开发工具", link: "/TamDocs/devTools/index" },
      // {
      //   text: "开发知识",
      //   items: [
      //     { text: "前端开发", link: "/TamDocs/frontend/index" },
      //   ],
      // },
    ],
    sidebar: {
      "/TamDocs/frontend/": [
        {
          text: "前端开发",
          items: [
            {
              text: "😋HTML",
              collapsed: true,
              items: [
                {
                  text: "语义化标签",
                  link: "/TamDocs/frontend/html/语义化标签",
                },
              ],
            },
            {
              text: "💄CSS",
              collapsed: true,
              items: [],
            },
            {
              text: "😎JavaScript",
              collapsed: true,
              items: [],
            },
            {
              text: "💙TypeScript",
              collapsed: true,
              items: [
                {
                  text: "常用方法和技巧",
                  link: "/TamDocs/frontend/typescript/TypeScript常用方法和技巧",
                },
              ],
            },
            {
              text: "👽VUE",
              collapsed: true,
              items: [
                {
                  text: "开发实践",
                  link: "/TamDocs/frontend/vue/开发实践",
                },
                {
                  text: "疑难杂症",
                  link: "/TamDocs/frontend/vue/疑难杂症",
                },
              ],
            },
            {
              text: "👀React",
              collapsed: true,
              items: [],
            },
            {
              text: "🌪Tailwind",
              collapsed: true,
            },
            {
              text: "⚡️Vite",

              collapsed: true,
              items: [],
            },
            {
              text: "🌏浏览器",

              collapsed: true,
              items: [
                {
                  text: "safari常见兼容性问题",
                  link: "/TamDocs/frontend/browser/safari常见兼容性问题",
                },
              ],
            },
            {
              text: "🛠工具库",
              collapsed: true,
              items: [
                {
                  text: "marked",
                  link: "/TamDocs/frontend/tool/marked",
                },
              ],
            },
            {
              text: "⌨️vscode",
              collapsed: true,
              items: [
                {
                  text: "常用插件",
                  link: "/TamDocs/frontend/vscode/常用插件",
                },
                {
                  text: "代码调试",
                  link: "/TamDocs/frontend/vscode/代码调试",
                },
              ],
            },
            {
              text: "其他",
              collapsed: true,
              items: [
                {
                  text: "前端开发规范",
                  link: "/TamDocs/frontend/other/前端开发规范",
                },
              ],
            },
          ],
        },
      ],
      "/TamDocs/devTools": [
        {
          text: "git",
          collapsed: true,
          items: [
            {
              text: "安装和配置",
              link: "/TamDocs/devTools/git/index",
            },
            {
              text: "方法技巧合集",
              link: "/TamDocs/devTools/git/方法技巧合集",
            },
          ],
        },
        {
          text: "vscode",
          collapsed: true,
          items: [],
        },
        {
          text: "nginx",
          collapsed: true,
          items: [],
        },
      ],
      other: [
        {
          text: "👟跨端",
          collapsed: true,
          items: [],
        },
        {
          text: "📦组件库",
          collapsed: true,
          items: [],
        },
        {
          text: "🏪包管理",
          collapsed: true,
          items: [],
        },
        {
          text: "🌏浏览器",
          collapsed: true,
          items: [],
        },
        {
          text: "🏗工程化",
          collapsed: true,
          items: [],
        },
      ],
    },
  },
  vite: {
  },
  base:'/blog/',
});
