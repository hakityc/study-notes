import DefaultTheme from 'vitepress/theme'
import '@unocss/reset/tailwind-compat.css'
import "virtual:uno.css"
import AlgorithmCard from '@/components/study-note/algorithm-card/algorithm-card.vue'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('AlgorithmCard', AlgorithmCard)
    }
}