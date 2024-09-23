<script lang="ts" setup>
import LinkCard from "./LinkCard.vue";

const props = defineProps<{
  list: {
    title: string;
    desc: string;
    link: string;
    icon: string;
    tips: string;
  }[];
}>();
</script>
<template>
  <div class="wh-full grid grid-cols-3 gap-4">
    <template v-for="card in list">
      <LinkCard :card></LinkCard>
    </template>
  </div>
</template>

<style></style>
