import { defineConfig } from 'vite'
import { resolve } from 'path'
import UnoCSS from "unocss/vite";
import liveReload from "vite-plugin-live-reload";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "docs"),
        },
    },
    plugins: [
        UnoCSS(),
        liveReload("@/TamDocs/**/**/*.md"),
        AutoImport({
            imports: [
                "vue",
                "vue-router",
                "@vueuse/core",
            ],
            dts: "types/auto-imports.d.ts",
            resolvers: [AntDesignVueResolver({
                importStyle: false,
            }),],
        }),
        Components({
            dts: "@/types/components.d.ts",
            include: [/\.ts$/, /\.vue$/],
            resolvers: [AntDesignVueResolver({
                importStyle: false,
                resolveIcons: true,
            })],
        }),
    ]
})

