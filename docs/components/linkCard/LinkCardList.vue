<script lang="ts" setup>
import LinkCardItem from "./LinkCard.vue";
import type { LinkCard } from "../../types/LinkCard.d.ts";
import { computed } from "vue";

const props = defineProps<{
  cards: LinkCard[];
}>();

const cards = computed(() => {
  // 动态导入 assets 目录下所有的.png 文件
  const images = import.meta.glob("@/assets/icon/*.png", { eager: true });
  // 将导入的模块对象转换为实际的图像路径数组
  const imagePaths = Object.entries(images).map(([path, module]: [string, any]) => module.default);
  const imageMap: Map<string, string> = new Map(imagePaths.map((path) => [path.split("/").pop().split(".")[0]!, path]));
  return props.cards.map((card) => {
    console.log(card.code);
    console.log(imageMap.get(card.code || ""));
    return {
      ...card,
      iconPath: imageMap.get(card.code || "") || "",
    };
  });
});
</script>
<template>
  <div class="wh-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 gap-4">
    <template v-for="card in cards">
      <LinkCardItem :card></LinkCardItem>
    </template>
  </div>
</template>

<style></style>
