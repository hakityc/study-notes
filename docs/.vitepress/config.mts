// .vitepress/config.js
import { defineConfig } from "vitepress";
// import viteConfig from "../../vite.config";

export default defineConfig({
  title: "Tam的博客",
  description: "",
  head: [["link", { rel: "icon", href: "/public/favicon.ico" }]],
  themeConfig: {
    logo: "/public/favicon.ico",
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
      '/TamDocs/frontend/': [
        {
          text: "前端开发",
          items: [
            {
              text: "😋HTML+💄CSS",
              collapsed: true,
              items: [
              ],
            },
            {
              text: "😎JavaScript",
              collapsed: true,
              items: [
              ],
            },
            {
              text: "👽VUE",
              collapsed: true,
              items: [
              ],
            },
            {
              text: "👀React",
              collapsed: true,
              items: [
              ],
            },
            {
              text: "💙TypeScript",
              collapsed: true,
              items: [
              ],
            },
            {
              text: "🌪Tailwind",
              collapsed: true,
              items: [
              ],
            },
            {
              text: "🛠工具库",
              collapsed: true,
              items: [
                {
                  text: "⚡️Vite",
                  link:'/TamDocs/frontend/tool/vite'
                },
                {
                  text:'marked',
                  link:'/TamDocs/frontend/tool/marked'
                  
                }
              ],
            },

          ],
        },
      ],
      '/TamDocs/devTools': [
        {
          text: 'git',
          collapsed: true,
          items:[
            {
              text: '安装和配置',
              link: '/TamDocs/devTools/git/index',
            }
          ]
        },
        {
          text: 'vscode',
          collapsed: true,
          items: []
        },
        {
          text: 'nginx',
          collapsed: true,
          items: []
        },
      ],
      'other': [{
        text: "👟跨端",
        collapsed: true,
        items: [
        ],
      },
      {
        text: "📦组件库",
        collapsed: true,
        items: [
        ],
      },
      {
        text: "🏪包管理",
        collapsed: true,
        items: [
        ],
      },
      {
        text: "🌏浏览器",
        collapsed: true,
        items: [
        ],
      },
      {
        text: "🏗工程化",
        collapsed: true,
        items: [
        ],
      },]
    },
  },
  // vite: {
  //   ...viteConfig,
  // },
});
