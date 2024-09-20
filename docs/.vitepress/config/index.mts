// .vitepress/config.js
import { defineConfig } from "vitepress";
import { themeConfig } from "./themeConfig.mts";
import { autoGenerateStructure } from "../plugin/generateSidebar";
// import viteConfig from "../../vite.config";

export default defineConfig({
  title: "Tam的博客",
  description: "",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    ...themeConfig,
    sidebar: autoGenerateStructure({
      basePath: 'TamDocs/',
      filterIndexMd: true,
      filterEmptyDirs: true,
      excludePattern: ['WIP']
    })
  },
  vite: {
    server: {
      watch: {

      }
    }
  },
  base: '/blog/',
});
