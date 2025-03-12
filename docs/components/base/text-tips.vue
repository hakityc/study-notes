<script lang="ts" setup>
/** imports  */
import { Tooltip } from "ant-design-vue";
// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface Props {}

/** props  */
defineProps<Props>();

/** ref  */

/** computed */

/** hooks */

/** methods  */

/** watch  */

/** lifecycle  */
</script>

<template>
  <Tooltip>
    <template #title>
      <slot name="tip"></slot>
    </template>
    <div class="border-b border-dashed border-dark-50 cursor-pointer transition-colors hover:border-dark-100">
      <slot></slot>
    </div>
  </Tooltip>
</template>

<style scoped></style>
