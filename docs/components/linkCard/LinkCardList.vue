<script lang="ts" setup>
import LinkCardItem from "./LinkCard.vue";
import type { LinkCard } from '../../types/LinkCard.d.ts'

const props = defineProps<{
  cards: LinkCard[];
}>();
</script>
<template>
  <div class="wh-full grid grid-cols-3 gap-4">
    <template v-for="card in cards">
      <LinkCardItem :card></LinkCardItem>
    </template>
  </div>
</template>

<style></style>
