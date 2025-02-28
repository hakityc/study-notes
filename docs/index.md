---
layout: home

hero:
  name: Hak1's Blog
  text: 记录学习过程
  tagline: 急之易不暇,缓之或自明
  image:
    src: /logo/logo_circle.png
    alt: VitePress
  actions:
    - theme: brand
      text: 开始吧
      link: /TamDocs/导航/index

features:
  - icon: 📚
    title: 开发知识
    details: 涵盖前端、运维等全栈技术栈的学习笔记和实践经验。
    link: /TamDocs/前端开发/
  - icon: 🛠️
    title: 实用工具
    details: 收录日常开发中常用的工具、配置和最佳实践，提高开发效率。
    link: /TamDocs/工具/
  - icon: 🎯
    title: 持续学习
    details: 记录技术探索过程，分享学习心得，打造个人知识库。
    link: /TamDocs/学习/
  - icon: 💡
    title: 踩坑记录
    details: 总结业务开发中遇到的各类问题和解决方案，避免重复踩坑。
    link: /TamDocs/业务开发/
---
<script setup>

import HomeFooter from '@/components/layout/home-footer.vue'
</script>

<home-footer/>
