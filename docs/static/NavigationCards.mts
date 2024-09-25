import { type Tree } from '@/types/LinkCard.d.ts'

const tree: Tree = [
    {
        title: "组件库",
        children: [
            {
                title: "Vue",
                cards: [
                    {
                        title: "Ant Design",
                        icon: "https://next.antdv.com/assets/logo.1ef800a8.svg",
                        desc: "An enterprise-class UI components based on Ant Design and Vue",
                        link: "https://www.antdv.com/docs/vue/introduce-cn"
                    },
                ]
            },
            {
                title: "React",
                cards: [
                    {
                        title: "Ant Design",
                        icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
                        desc: "助力设计开发者「更灵活」地搭建出「更美」的产品，让用户「快乐工作」～",
                        link: "https://ant-design.antgroup.com/index-cn"
                    },
                ]
            }

        ]
    }
]

export default tree