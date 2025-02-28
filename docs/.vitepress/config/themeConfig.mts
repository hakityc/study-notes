import { generateNav, generateSidebar } from "../plugin/generateSidebar";

export const themeConfig = {
  nav: generateNav({
    basePath: "TamDocs/",
    customOrder: ["导航", "前端开发", "学习笔记", "面试笔记", "工具", "业务开发", "杂谈"],
    collapsed: true,
  }),
  sidebar: generateSidebar({
    basePath: "TamDocs/",
    filterIndexMd: true,
    filterEmptyDirs: true,
    excludePattern: [],
    collapsed: true,
    customOrder: new Map([
      ["前端开发", ["😋HTML", "😎JavaScript", "👽Vue"]],
      ["开发工具", ["npm", "nvm"]],
    ]),
  }),
};
