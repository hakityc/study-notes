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
        backgroundColor: "#42b883",
        color: "#fff",
      };
    case LinkCardTag.REACT:
      return {
        backgroundColor: "#61dafb",
        color: "#fff",
      };

    default:
      return {
        backgroundColor: "#3271ae",
        color: "#fff",
      };
  }
};
</script>
<template>
  <div
    class="flex flex-col h-24 bg-#f6f6f7 rounded-lg px-2 gap-1 cursor-pointer translate duration-0.5s border-0 group box-content border-1 shadow-md hover:border-#d9d9d9 hover:shadow-lg"
    @click="handleClick"
    :style="props.card.style?.cardStyle"
  >
    <!-- <div class="link-card-header"></div> -->
    <div class="flex justify-start items-center gap-4 flex-1 h-0">
      <img v-if="props.card.icon" class="w-10 h-10 overflow-hidden group-hover:filter-30 shrink-0" :src="props.card.icon" :alt="props.card.title" />
      <div class="flex flex-col justify-start items-start w-0 flex-1 overflow-hidden">
        <span class="font-700">{{ props.card.title }}</span>
        <div class="w-full flex gap-1">
          <template v-for="tag in tagList?.slice(0, 2)">
            <div class="h-4 rounded-lg flex justify-start items-center px-2" :style="tag.style">
              <span class="text-3 text-ellipsis overflow-hidden">{{ tag.name }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-if="props.card.desc" class="h-6 w-full flex" :class="props.card.icon ? 'px-2' : ''">
      <span class="text-3 text-#86909c text-ellipsis w-full overflow-hidden text-nowrap" :style="props.card.style?.descStyle">{{ props.card.desc }}</span>
    </div>
  </div>
</template>

<style></style>
