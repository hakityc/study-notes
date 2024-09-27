import type { Tree, } from '../types/LinkCard.d.ts'
import { LinkCardTag } from '../enums/LinkCard.ts'

const tree: Tree = [
    {
      title:'HTML、CSS',
      cards:[
        {
            title:'Css选择器学习小游戏',
            desc: "基于Ant Design和Vue的企业级UI组件",
            link: "https://www.antdv.com/docs/vue/introduce-cn",
            style: {
                backgroundColor: "#cf8e27",
                color: "#fff"
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
                    color: "#1890ff"
                }
            },
            {
                title: "Element Plus",
                icon: "https://avatars.githubusercontent.com/u/68583457?s=48&v=4",
                desc: "基于 Vue 3，面向设计师和开发者的组件库",
                link: "https://element-plus.org/zh-CN/",
                tags: [LinkCardTag.VUE],
                style: {
                    color: "#409eff"
                }
            },
            {
                title: "Ant Design",
                icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
                desc: "助力设计开发者「更灵活」地搭建出「更美」的产品",
                link: "https://ant-design.antgroup.com/index-cn",
                tags: [LinkCardTag.REACT],
                style: {
                    color: "#1890ff"
                }
            },
            {
                title: "Vant 4",
                icon: "https://fastly.jsdelivr.net/npm/@vant/assets/logo.png",
                link: "https://vant-ui.github.io/vant/#/zh-CN",
                tags: [LinkCardTag.VUE, LinkCardTag.MOBILE],
                style: {
                    color: "#07c160"
                }
            },
            {
                title: "TDsign",
                icon: "https://cdc.cdn-go.cn/tdc/latest/images/tdesign.svg",
                link: "https://tdesign.tencent.com/",
                desc: "腾讯跳动组件库",
                tags: [LinkCardTag.VUE, LinkCardTag.REACT, LinkCardTag.MOBILE],
                style: {
                    color: "#0078d4"
                }
            },
            {
                title: "arco",
                icon: "https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico",
                desc: "字节跳动组件库",
                link: "https://arco.design/",
                tags: [LinkCardTag.VUE, LinkCardTag.REACT],
                style: {
                    color: "#1e90ff"
                }
            },
            {
                title: "daisyui",
                icon: "https://img.daisyui.com/images/daisyui-logo/daisyui-logomark.svg",
                link: "https://daisyui.com/",
                desc: "The most popular component libraryfor Tailwind CSS",
                tags: [LinkCardTag.TAILWIND],
                style: {
                    color: "#f9a8d4"
                }
            },
        ]
    }
]

export default tree