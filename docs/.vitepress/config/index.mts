// .vitepress/config.js
import { defineConfig } from "vitepress";
import { themeConfig } from "./themeConfig.mts";
import UnoCSS from 'unocss/vite'
// import viteConfig from "../../vite.config";

export default defineConfig({
  title: "Tam的博客",
  description: "",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: "/favicon.ico",
    siteTitle: "Tam Blog",
    search: {
      provider: 'local'
    },
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    ...themeConfig
  },
  vite: {
    plugins: [
      UnoCSS()
    ],
    server: {
      watch: {

      }
    }
  },
  base: '/blog/',
});
