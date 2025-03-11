<script lang="ts" setup>
/** imports  */
import { Button } from "ant-design-vue";
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
  <Button
    type="text"
    class="w-8! h-8! p-0 flex justify-center items-center"
  >
    <slot></slot>
  </Button>
</template>

<style scoped></style>
