<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import LinkCardList from "./LinkCardList.vue";
import type { Tree } from "../../types/LinkCard.d.ts";

const props = defineProps<{
  tree: Tree;
  depth: number;
}>();

const depth = computed(() => {
  return props.depth + 1;
});
</script>

<template>
  <div class="flex flex-col wh-full">
    <template v-for="node in props.tree" :key="node.title">
      <div class="mb-4">
        <component :is="`h${depth}`">
          {{ node.title }}
        </component>
        <LinkCardList :cards="node.cards || []" />
        <LinkCardListTree v-if="node.children" :tree="node.children" :depth="depth" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
