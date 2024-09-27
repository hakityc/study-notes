
import { generateNav, generateSidebar } from "../plugin/generateSidebar";

export const themeConfig = {
    nav: generateNav({
        basePath: 'TamDocs/',
        customOrder: ['导航', '前端开发']
    }),
    sidebar: generateSidebar({
        basePath: 'TamDocs/',
        filterIndexMd: true,
        filterEmptyDirs: true,
        excludePattern: [],
        customOrder: new Map([
            ['前端开发', ['😋HTML', '😎JavaScript', '👽Vue']],
            ['开发工具', ['npm', 'nvm']],
        ])
    }),
}