import DefaultTheme from 'vitepress/theme'
import '@unocss/reset/tailwind-compat.css'
import "virtual:uno.css"

// 引入 Ant Design Vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.use(Antd);
    }
}