<script lang="ts" setup>
const props = defineProps<{
  card: {
    title: string;
    desc: string;
    link: string;
    icon: string;
    tips: string;
  };
}>();

const handleClick = () => {
  window.open(props.card.link, "_blank");
};
</script>
<template>
  <div class="flex flex-col h-30 w-50 bg-#f6f6f7 rounded-lg px-2 gap-1 cursor-pointer translate duration-0.5s group hover:shadow-md" @click="handleClick">
    <!-- <div class="link-card-header"></div> -->
    <div class="flex justify-start items-center gap-4 flex-1 h-0">
      <img class="w-10 h-10 rounded-50% overflow-hidden group-hover:filter-30" :src="props.card.icon" :alt="props.card.title" />
      <div class="flex flex-col items-start">
        <span class="font-700">{{ props.card.title }}</span>
        <div v-if="props.card.tips" class="bg-#dadadb h-4 rounded-lg flex justify-start items-center px-2">
          <span class="text-3 text-#3c3c43 text-ellipsis overflow-hidden">{{ props.card.tips }}</span>
        </div>
      </div>
    </div>
    <div class="h-10 w-full flex">
      <span class="text-3 text-#3c3c43 text-ellipsis w-full overflow-hidden">{{ props.card.desc }}</span>
    </div>
  </div>
</template>

<style></style>
