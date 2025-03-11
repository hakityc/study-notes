import { defineConfig, presetAttributify, presetUno, presetMini } from "unocss";
import presetIcons from '@unocss/preset-icons';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({ scale: 1.2, warn: true, prefix: "h-" }),
    presetMini()
  ],
  shortcuts: [
    ["wh-full", "w-full h-full"],
    ["text-ellipsis", "truncate"],
  ],
  theme: {
    colors: {
      primary: "var(--primary-color)",
      dark_bg: "var(--dark-bg)",
      dark: "var(--dark)",
      light: "var(--light)",
    },
    breakpoints: {
      sm: "768px", // 如平板竖屏
      md: "1024px", // 大屏平板，笔记本电脑
      lg: "1280px", // 桌面显示器，低分辨率
      xl: "1536px", // 桌面显示器, 高分辨率
      "2xl": "1920px", // 1080p桌面显示器
      "3xl": "2560px", // 1440p桌面显示器
    },
  },
});
