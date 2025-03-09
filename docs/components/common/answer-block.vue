<script lang="ts" setup>
/** imports  */
import { ACollapse, ACollapsePanel } from "ant-design-vue";
// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface Props {}

/** props  */
defineProps<Props>();

/** ref  */
const activeKey = ref<string | number | undefined>(undefined);
/** computed */

/** hooks */

/** methods  */

/** watch  */

/** lifecycle  */
</script>

<template>
  <ACollapse
    v-model:activeKey="activeKey"
    :bordered="false"
  >
    <ACollapsePanel
      key="1"
      header="答案"
    >
      <slot></slot>
    </ACollapsePanel>
  </ACollapse>
</template>

<style scoped></style>
