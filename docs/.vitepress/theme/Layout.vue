<script lang="ts" setup>
/** imports  */
import { theme, ConfigProvider } from "ant-design-vue";
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import HomeFooter from "@/components/layout/home-footer.vue";
// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface Props {}

/** props  */
defineProps<Props>();

/** ref  */
const { isDark } = useData();

/** computed */

/** hooks */

/** methods  */

/** watch  */

/** lifecycle  */
</script>

<template>
  <ConfigProvider
    :theme="{
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
  >
    <div class="wh-full relative">
      <DefaultTheme.Layout />
      <HomeFooter />
    </div>
  </ConfigProvider>
</template>

<style scoped></style>
