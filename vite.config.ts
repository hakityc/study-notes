import { defineConfig } from 'vite'
import { resolve } from 'path'
import UnoCSS from "unocss/vite";
import liveReload from "vite-plugin-live-reload";
import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
// import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "docs"),
        },
    },
    plugins: [
        UnoCSS(),
        liveReload("TamDocs/**/**/*.md"),
        AutoImport({
            imports: [
                "vue",
                "vue-router",
                "@vueuse/core",
            ],
            dts: "types/auto-imports.d.ts",
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/, /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
        }),
        // Components({
        //     dts: "types/components.d.ts",
        //     include: [
        //         /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        //         /\.vue$/, /\.vue\?vue/, // .vue
        //         /\.md$/, // .md
        //     ],
        //     resolvers: [AntDesignVueResolver({
        //         resolveIcons: true,
        //         packageName: "ant-design-vue",
        //     })],
        // }),
    ]
})

