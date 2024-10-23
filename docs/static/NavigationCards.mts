import type { Tree, } from '../types/LinkCard.d.ts'
import { LinkCardTag } from '../enums/LinkCard.ts'

const tree: Tree = [
    {
        title: "在线工具",
        cards: [
            {
                title: 'quicktype',
                link: 'https://app.quicktype.io/',
                desc: '将JSON转换为代码',
                icon: 'https://app.quicktype.io/favicon.ico'
            },
            {
                title: 'Can I use',
                desc: '查看CSS属性的兼容性',
                link: 'https://caniuse.com/',
                icon: 'https://caniuse.com/img/favicon-128.png'
            },
            {
                title: 'CSS Triggers',
                desc: "查看CSS属性对渲染性能的影响",
                link: "https://csstriggers.com/",
                tags: [LinkCardTag.CSS],
                style: {
                    cardStyle: {
                        backgroundColor: "#e7f5fe",
                    }
                }
            },
            {
                title: 'alwane',
                desc: '网页主体颜色提取工具',
                link: 'https://alwane.io/',
                style: {
                    cardStyle: {
                        backgroundColor: "#efeffc",
                    }
                }
            },
            {
                title: 'CSS Grid Generator',
                desc: '生成CSS Grid布局代码',
                link: 'https://cssgrid-generator.netlify.app/',
                tags: [LinkCardTag.CSS],
                style: {
                    cardStyle: {
                        backgroundColor: '#211f2f',
                        color: '#fff'
                    },
                    descStyle: {
                        color: '#fff'
                    }
                }
            },
            {
                title: 'Picular',
                desc: '根据搜索结果生成颜色',
                link: 'https://picular.co/',
                icon: 'https://picular.co/favicon.ico'
            },
            {
                title: 'MaterialPalette',
                desc: '颜色搭配预览',
                link: 'https://www.materialpalette.com/',
                icon: 'https://www.materialpalette.com/favicon.ico'

            },
            {
                title: 'CDNJS',
                desc: '前端库CDN',
                link: 'https://cdnjs.com/',
            },
            {
                title: 'Boot CDN',
                desc: 'Bootstrap 中文网开源项目免费 CDN 加速服务',
                link: 'https://www.bootcdn.cn/',
            },
            {
                title: 'Git Emoji',
                desc: 'Git提交信息表情',
                link: 'https://gitmoji.js.org/',
            },
            {
                title: 'Shields.io',
                desc: '生成徽章',
                link: 'https://shields.io/',
                icon: 'https://shields.io/img/logo.png'
            },
            {
                title: '在线获取网站图标',
                desc: '在线获取网站图标',
                link: 'https://uutool.cn/web-icon/',
            }
        ],
        children: [
            {
                title: '编辑器',
                cards: [
                    {
                        title: 'CodePen',
                        desc: '前端代码分享平台',
                        link: 'https://codepen.io/',
                        icon: 'https://codepen.io/favicon.ico'
                    },
                    {
                        title: 'CodeSandbox',
                        desc: '在线代码编辑器',
                        link: 'https://codesandbox.io/',
                        icon: 'https://codesandbox.io/favicon.ico'
                    },
                ]
            }

        ]
    },
    {
        title: "开发工具",
        children: [
            {
                title: '常用',
                cards: [
                    {
                        title: 'Vueuse',
                        icon: 'https://vueuse.org/favicon.svg',
                        desc: 'Vue Composition API 库',
                        link: 'https://vueuse.org/',
                        tags: [LinkCardTag.VUE],
                    },
                    {
                        title: 'Pinia',
                        icon: 'https://pinia.vuejs.org/logo.svg',
                        desc: 'The intuitive store for Vue.js',
                        link: 'https://pinia.vuejs.org/',
                        tags: [LinkCardTag.VUE],
                    },
                    {
                        title: 'ahooks',
                        icon: 'https://ahooks.js.org/logo.svg',
                        desc: 'React Hooks 库',
                        link: 'https://ahooks.js.org/',
                        tags: [LinkCardTag.REACT],
                    },
                    {
                        title: 'Redux',
                        icon: 'https://redux.js.org/img/redux.svg',
                        desc: 'A JS library for predictable and maintainable global state management',
                        link: 'https://redux.js.org/',
                        tags: [LinkCardTag.REACT],
                    },

                ]
            },
            {
                title: 'AI工具',
                cards: [
                    {
                        title: 'Kimi.ai',
                        link: 'https://kimi.moonshot.cn/',
                        desc: 'Kimi AI 智能助手',
                        icon: 'https://kimi.moonshot.cn/favicon.ico'
                    },
                    {
                        title: 'blot',
                        link: 'https://bolt.new/',
                        desc: 'Prompt, run, edit, and deploy full-stack web apps.',
                        icon: 'https://bolt.new/favicon.svg'
                    },
                    {
                        title: 'v0',
                        link: 'https://v0.dev/',
                        desc: 'Chat with v0. Generate UI with simple text prompts. Copy, paste, ship.',
                        icon: 'https://v0.dev/assets/icon.svg'
                    }
                ]
            },
            {
                title: '图表工具',
                cards: [
                    {
                        title: 'ECharts',
                        desc: '百度开源的数据可视化库',
                        link: 'https://echarts.apache.org/zh/index.html'
                    },
                    {
                        title: 'Ant Vision',
                        desc: 'Ant Design 数据可视化解决方案',
                        link: 'https://antv.antgroup.com/',
                        icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*A-lcQbVTpjwAAAAAAAAAAAAADmJ7AQ/original'
                    },
                    {
                        title: 'SimpleMindMap',
                        desc: '简单的思维导图工具',
                        link: 'https://wanglin2.github.io/mind-map-docs/',
                        icon: 'https://wanglin2.github.io/mind-map-docs/logo.png'
                    }
                ]
            },
            {
                title: '轻量JS工具库',
                cards: [
                    {
                        title: 'Axios',
                        icon: 'https://axios-http.com/assets/logo.svg',
                        desc: 'Promise based HTTP client for the browser and node.js',
                        link: 'https://www.axios-http.cn/',
                    },
                    {
                        title: 'Lodash',
                        icon: 'https://lodash.com/assets/img/lodash.svg',
                        desc: 'A modern JavaScript utility library delivering modularity, performance & extras.',
                        link: 'https://www.lodashjs.com/',
                    },
                    {
                        title: 'Day.js',
                        icon: 'https://day.js.org/img/logo.png',
                        desc: '2kB immutable date library alternative to Moment.js with the same modern API',
                        link: 'https://day.js.org/zh-CN/',
                    },
                    {
                        title: 'Mock.js',
                        desc: '生成随机数据，拦截 Ajax 请求',
                        link: 'http://mockjs.com/',
                    },
                    {
                        title: 'Color Thief',
                        desc: '提取图片主色调',
                        link: 'https://lokeshdhakar.com/projects/color-thief/',
                    },
                    {
                        title: 'Driver.js',
                        desc: '轻量级的引导库',
                        link: 'https://driverjs.com/',
                        icon: 'https://driverjs.com/driver.svg'
                    },
                    {
                        title: 'Fuse.js',
                        desc: '轻量级的模糊搜索库',
                        link: 'https://fusejs.io/',
                        icon: 'https://www.fusejs.io/assets/img/logo.png'
                    },
                    {
                        title: 'translate.js',
                        desc: '翻译库',
                        link: 'https://translate.zvo.cn/index.html',
                    }
                ]
            },
            {
                title: '服务',
                cards: [
                    {
                        title: 'Sentry',
                        desc: 'Application Monitoring and Error Tracking Software',
                        link: 'https://sentry.io/welcome/'

                    }
                ]
            },
            {
                title: '动画',
                cards: [
                    {
                        title: 'gasp',
                        desc: '极其强大的JS动画库',
                        link: 'https://gsap.com',
                    },
                    {
                        title: 'matter.s',
                        icon: 'https://brm.io/matter-js/img/matter-js.svg',
                        link: 'https://brm.io/matter-js/',
                        desc: '2D物理引擎',
                    },
                    {
                        title: 'animate.css',
                        link: 'https://animate.style/',
                        desc: 'CSS动画库',
                    }
                ]
            },
            {
                title: '包管理工具',
                cards: [
                    {
                        title: 'npm',
                        desc: 'JavaScript 包管理器',
                        link: 'https://www.npmjs.com/',
                    },
                    {
                        title: 'yarn',
                        desc: '快速、可靠、安全的依赖管理工具',
                        link: 'https://yarnpkg.com/',
                    },
                    {
                        title: 'pnpm',
                        desc: '快速、可靠、安全的依赖管理工具',
                        link: 'https://pnpm.io/',
                        icon: 'https://pnpm.io/img/pnpm.svg'
                    }
                ]
            }
        ],
    },
    {
        title: "官方文档",
        cards: [
            {
                title: "Vue 3",
                icon: "https://cn.vuejs.org/images/logo.png",
                desc: "渐进式JavaScript框架",
                link: "https://cn.vuejs.org/",
                tags: [LinkCardTag.VUE],
            },
            {
                title: "React",
                icon: "https://react.docschina.org/favicon.ico",
                desc: "用于构建用户界面的 JavaScript 库",
                link: "https://react.docschina.org/",
                tags: [LinkCardTag.REACT],
            },
            {
                title: 'TypeScript',
                icon: 'https://www.typescriptlang.org/icons/icon-144x144.png',
                desc: 'JavaScript的超集，可编译为纯JavaScript',
                link: 'https://www.typescriptlang.org/',
                tags: [LinkCardTag.TYPESCRIPT],
            },
            {
                title: 'Uno CSS',
                icon: 'https://unocss-cn.pages.dev/logo.svg',
                desc: '即时按需的原子CSS引擎',
                link: 'https://unocss.dev/',
                tags: [LinkCardTag.VUE],
            },
            {
                title: 'Tailwind CSS',
                icon: 'https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg',
                desc: '无需离开HTML即可快速构建现代网站',
                link: 'https://tailwindcss.com/',
                tags: [LinkCardTag.TAILWIND],
            },
            {
                title: 'Vite',
                icon: 'https://cn.vitejs.dev/logo.svg',
                desc: '下一代前端开发与构建工具',
                link: 'https://vitejs.cn/vite5-cn/',
                tags: [LinkCardTag.VITE],
            },
            {
                title: 'Nuxt',
                icon: 'https://nuxt.com/assets/design-kit/icon-green.svg',
                desc: 'Vue.js 应用框架',
                link: 'https://nuxt.com/',
            },
            {
                title: 'Electron',
                icon: 'https://www.electronjs.org/zh/assets/img/logo.svg',
                desc: '使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用',
                link: 'https://www.electronjs.org/zh/docs/latest/tutorial/quick-start'
            },
            {
                title: 'Electron-vite',
                icon: 'https://cn.electron-vite.org/favicon.svg',
                desc: '下一代 Electron 开发构建工具',
                link: 'https://cn.electron-vite.org/'

            },
            {
                title: 'Yoga',
                icon: 'https://www.yogalayout.dev/img/logo.svg',
                desc: '一种可嵌入式布局系统',
                link: 'https://yogalayout.com/',
            },
            {
                title: '油猴开发指南',
                desc: '油猴脚本开发指南',
                link: 'https://learn.scriptcat.org/',
                icon: 'https://learn.scriptcat.org/assets/images/logo.png'
            }
        ]
    },
    {
        title: "组件库",
        cards: [
            {
                title: "Ant Design",
                icon: "https://next.antdv.com/assets/logo.1ef800a8.svg",
                desc: "基于Ant Design和Vue的企业级UI组件",
                link: "https://www.antdv.com/docs/vue/introduce-cn",
                tags: [LinkCardTag.VUE],
                style: {
                    cardStyle: {
                        color: "#1890ff"
                    },
                    descStyle: {

                    }
                }
            },
            {
                title: "Element Plus",
                icon: "https://avatars.githubusercontent.com/u/68583457?s=48&v=4",
                desc: "基于 Vue 3，面向设计师和开发者的组件库",
                link: "https://element-plus.org/zh-CN/",
                tags: [LinkCardTag.VUE],
                style: {
                    cardStyle: {
                        color: "#409eff"
                    },
                    descStyle: {

                    }
                }
            },
            {
                title: "Ant Design",
                icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
                desc: "助力设计开发者「更灵活」地搭建出「更美」的产品",
                link: "https://ant-design.antgroup.com/index-cn",
                tags: [LinkCardTag.REACT],
                style: {
                    cardStyle: {
                        color: "#1890ff"
                    },
                }
            },
            {
                title: 'Next UI',
                desc: 'Next UI 是一套基于 React 的 UI 组件库',
                link: 'https://nextui.org/',
                icon: 'https://nextui.org/favicon.ico',
            },
            {
                title: "Vant 4",
                icon: "https://fastly.jsdelivr.net/npm/@vant/assets/logo.png",
                link: "https://vant-ui.github.io/vant/#/zh-CN",
                tags: [LinkCardTag.VUE, LinkCardTag.MOBILE],
                desc: "轻量、可靠的移动端 Vue 组件库",
                style: {
                    cardStyle: {
                        color: "#07c160"
                    },
                }
            },
            {
                title: "TDsign",
                icon: "https://cdc.cdn-go.cn/tdc/latest/images/tdesign.svg",
                link: "https://tdesign.tencent.com/",
                desc: "腾讯跳动组件库",
                tags: [LinkCardTag.VUE, LinkCardTag.REACT, LinkCardTag.MOBILE],
                style: {
                    cardStyle: {
                        color: "#0078d4"
                    },
                }
            },
            {
                title: "arco",
                icon: "https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico",
                desc: "字节跳动组件库",
                link: "https://arco.design/",
                tags: [LinkCardTag.VUE, LinkCardTag.REACT],
                style: {
                    cardStyle: {
                        color: "#1e90ff"
                    },
                }
            },
            {
                title: "daisyui",
                icon: "https://img.daisyui.com/images/daisyui-logo/daisyui-logomark.svg",
                link: "https://daisyui.com/",
                desc: "The most popular component libraryfor Tailwind CSS",
                tags: [LinkCardTag.TAILWIND],
                style: {
                    cardStyle: {
                        color: "#f9a8d4"
                    },
                }
            },
            {
                title: 'VARLET',
                link: 'https://varlet-varletjs.vercel.app/#/zh-CN/index',
                desc: 'Varlet UI 是一个基于 Vue3 开发的 Material Design 组件库',
            },
            {
                title: 'Magic UI',
                desc: 'UI library for Design Engineers',
                link: 'https://magicui.design/',
                icon: 'https://magicui.design/favicon.ico'
            }
        ]
    },
    {
        title: 'UI资源',
        cards: [
            {
                title: 'uiverse',
                desc: '最大的开源UI库',
                link: 'https://uiverse.io/',
                style: {
                    cardStyle: {
                        backgroundColor: '#001f3f',
                        color: '#fff'
                    }
                }
            },
            {
                title: 'Rauno',
                desc: '交互设计参考',
                link: 'https://rauno.me/',

            },
            {
                title: 'Checklist Design',
                desc: '最佳设计实践集合',
                link: 'https://www.checklist.design/',
                icon: 'https://cdn.prod.website-files.com/5ba4b3c973b5d218459f7e6f/5de1c13fd414340c34dbb662_checklist-logo.svg'
            },
            {
                title: 'CSS loader',
                desc: 'CSS加载动画示例',
                link: 'https://css-loaders.com/',
                style: {
                    cardStyle: {
                        backgroundColor: '#e4e7ef',
                    }
                }
            },
            {
                title: 'iconify',
                desc: '图标库合集',
                link: 'https://iconify.design/',
                icon: 'https://iconify.design/favicon.ico'
            },
            {
                title: 'icones',
                desc: '图标库合集',
                link: 'https://icones.netlify.app/',
            }
        ]
    },
    {
        title: '社区',
        cards: [
            {
                title: 'GitHub',
                desc: '全球最大的开源社区',
                link: 'www.github.com',
                icon: 'https://github.githubassets.com/favicons/favicon.svg'
            },
            {
                title: '稀土掘金',
                desc: '一个帮助开发者成长的社区',
                link: 'https://juejin.cn/',
                icon: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg'
            },
            {
                title: 'Stack Overflow',
                desc: '全球最大的技术问答网站',
                link: 'https://stackoverflow.com/',
                icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico'
            },
            {
                title: 'dev.to',
                desc: 'Where programmers share ideas and help each other grow',
                link: 'https://dev.to/',
                icon: 'https://res.cloudinary.com/practicaldev/image/fetch/s--Qy1Q7v2i--/c_limit,f_auto,fl_progressive,q_auto,w_32/https://dev-to.s3.us-east-2.amazonaws.com/favicon.ico'
            },
            {
                title: 'Hugging Face',
                desc: 'Transformers for Natural Language Processing',
                link: 'https://huggingface.co/',
                // icon: 'https://huggingface.co/favicon.ico',
                tags: [LinkCardTag.NLP]
            }
        ]
    },
    {
        title: '资讯',
        cards: [
            {
                title: 'Medium',
                desc: 'Where good ideas find you',
                link: 'https://medium.com/',
            }
        ]
    },
    {
        title: '学习资源',
        children: [
            {
                title: '前端',
                cards: [
                    {
                        title: 'CSS Diner',
                        desc: "Css选择器练习",
                        link: "https://flukeout.github.io",
                        tags: [LinkCardTag.CSS],
                        style: {
                            cardStyle: {
                                backgroundColor: "#cf8e27",
                                color: "#fff"
                            },
                            descStyle: {
                                color: "#fff"
                            }
                        }
                    },
                    {
                        title: 'Vue Challenges',
                        desc: 'Vue.js 挑战集合',
                        link: 'https://cn-vuejs-challenges.netlify.app/',
                        tags: [LinkCardTag.VUE],
                        style: {
                            cardStyle: {
                                backgroundColor: '#4acf93',
                                color: '#fff',
                            },
                            descStyle: {
                                color: '#fff'
                            }
                        }
                    }
                ]
            },
            {
                title: '数据结构与算法',
                cards: [
                    {
                        title: 'Hello Algo',
                        desc: '算法图解',
                        link: 'https://www.hello-algo.com/',
                        icon: 'https://www.hello-algo.com/assets/images/logo.svg'
                    },
                    {
                        title: 'Alorithm Visualizer',
                        desc: '算法可视化',
                        link: 'https://www.cs.usfca.edu/~galles/visualization/Algorithms.html',
                    }
                ]
            }
        ]
    }
]

export default tree