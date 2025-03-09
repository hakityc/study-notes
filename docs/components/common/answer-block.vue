<script lang="ts" setup>
/** imports  */
import { Collapse, CollapsePanel } from "ant-design-vue";
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
  <Collapse
    v-model:activeKey="activeKey"
    :bordered="false"
  >
    <CollapsePanel
      key="1"
      header="答案"
    >
      <span>
        <slot></slot>
      </span>
    </CollapsePanel>
  </Collapse>
</template>

<style scoped></style>
