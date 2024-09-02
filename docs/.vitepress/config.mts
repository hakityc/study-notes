// .vitepress/config.js
import { defineConfig } from "vitepress";
// import viteConfig from "../../vite.config";

export default defineConfig({
  title: "Tam的博客",
  description: "",
  head: [["link", { rel: "icon", href: "/public/favicon.ico" }]],
  themeConfig: {
    logo: "/public/favicon.ico",
    siteTitle: "Tam的博客",
    nav: [
      {
        text: "开发知识",
        items: [
          { text: "前端开发", link: "/frontend/index" },
        ],
      },
    ],
    sidebar: [
      {
        text: "前端开发",
        items: [
          {
            text: "😋HTML+💄CSS",
            items: [
            ],
          },
          {
            text: "😎JavaScript",
            items: [
            ],
          },
          {
            text: "👽VUE",
            items: [
            ],
          },
          {
            text: "👀React",
            items: [
            ],
          },
          {
            text: "💙TypeScript",
            items: [
            ],
          },
          {
            text: "⚡️Vite",
            items: [
            ],
          },
          {
            text: "🌪Tailwind",
            items: [
            ],
          },
          {
            text: "👟跨端",
            items: [
            ],
          },
          {
            text: "🛠工具库",
            items: [
            ],
          },
          {
            text: "📦组件库",
            items: [
            ],
          },
          {
            text: "🏪包管理",
            items: [
            ],
          },
          {
            text: "🌏浏览器",
            items: [
            ],
          },
          {
            text: "🏗工程化",
            items: [
            ],
          },
        ],
      },
    ],
  },
  // vite: {
  //   ...viteConfig,
  // },
});
