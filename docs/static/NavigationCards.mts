import type { Tree, } from '../types/LinkCard.d.ts'
import { LinkCardTag } from '../enums/LinkCard.ts'

const tree: Tree = [
    {
        title: "在线工具",
        cards: [
            {
                title: 'CSS Diner',
                desc: "Where we feast on CSS Selectors!(Css选择器学习小游戏)",
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
                desc: '在线网页主体颜色提取工具',
                link: 'https://alwane.io/',
                style: {
                    cardStyle: {
                        backgroundColor: "#efeffc",
                    }
                }
            },
            {
                title: 'CSS Grid Generator',
                desc: '在线生成CSS Grid布局代码',
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
                title: 'Vue 3 Playground',
                desc: 'Vue 3在线代码编辑器',
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
                title: 'CSS loader',
                desc: 'CSS加载动画示例',
                link: 'https://css-loaders.com/',
                style: {
                    cardStyle: {
                        backgroundColor: '#e4e7ef',
                    }
                }
            }
        ]
    }
]

export default tree