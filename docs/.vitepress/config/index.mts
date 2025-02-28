// .vitepress/config.js
import { defineConfig } from "vitepress";
import { themeConfig } from "./themeConfig.mts";
import { search } from "./includes/search.ts";
import viteConfig from "../../../vite.config.ts";

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
  vite: viteConfig,
  base: "/blog/",
});
