<script lang="ts" setup>
import { computed } from "vue";
import type { LinkCard } from "../../types/LinkCard.d.ts";
import { LinkCardTag } from "../../enums/LinkCard.ts";

const props = defineProps<{
  card: LinkCard;
}>();

const handleClick = () => {
  window.open(props.card.link, "_blank");
};

const tagList = computed(() => {
  return props.card.tags?.map((tag) => {
    return {
      name: tag,
      style: getTagStyle(tag),
    };
  });
});

const getTagStyle = (tag: LinkCardTag) => {
  switch (tag) {
    case LinkCardTag.VUE:
      return {
        background: "#42b883",
        color: "#fff",
      };
    case LinkCardTag.REACT:
      return {
        background: "#61dafb",
        color: "#fff",
      };

    default:
      return {
        background: "#3271ae",
        color: "#fff",
      };
  }
};
</script>
<template>
  <div class="flex flex-col h-30 w-50 bg-#f6f6f7 rounded-lg px-2 gap-1 cursor-pointer translate duration-0.5s group hover:shadow-md" @click="handleClick">
    <!-- <div class="link-card-header"></div> -->
    <div class="flex justify-start items-center gap-4 flex-1 h-0">
      <img class="w-10 h-10 rounded-50% overflow-hidden group-hover:filter-30" :src="props.card.icon" :alt="props.card.title" />
      <div class="flex flex-col items-start">
        <span class="font-700">{{ props.card.title }}</span>
        <div class="wh-full flex gap-1">
          <template v-for="tag in tagList">
            <div class="h-4 rounded-lg flex justify-start items-center px-2" :style="tag.style">
              <span class="text-3 text-ellipsis overflow-hidden">{{ tag.name }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="h-12 w-full flex px-2">
      <span class="text-3 text-#3c3c43 text-ellipsis w-full overflow-hidden">{{ props.card.desc }}</span>
    </div>
  </div>
</template>

<style></style>
