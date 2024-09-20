// .vitepress/config.js
import { defineConfig } from "vitepress";
import { themeConfig } from "./themeConfig.mts";
// import viteConfig from "../../vite.config";

export default defineConfig({
  title: "Tam的博客",
  description: "",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig,
  vite: {
  },
  base: '/blog/',
});
