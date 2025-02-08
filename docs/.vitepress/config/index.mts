// .vitepress/config.js
import { defineConfig } from "vitepress";
import { themeConfig } from "./themeConfig.mts";
import UnoCSS from "unocss/vite";
import { resolve } from "path";
// import viteConfig from "../../vite.config";
import liveReload from "vite-plugin-live-reload";
import { search } from "./includes/search.ts";

export default defineConfig({
  title: "hak1的博客",
  description: "",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: "/favicon.ico",
    siteTitle: "Hak1's Blog",
    search,
    lastUpdated: {
      text: "最后更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    ...themeConfig,
  },
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "../../../docs"),
      },
    },
    plugins: [UnoCSS(), liveReload("@/TamDocs/**/**/*.md")],
    server: {
      watch: {},
    },
  },
  base: "/blog/",
});
