<script setup lang="ts">
defineProps<{
  emoji: String,
  label: String,
  value: String
}>()
</script>
<template>
  <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col">
    <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
      <span>{{ emoji }}</span>
      <span>{{ label }}</span>
    </div>
    <div class="mt-1">
      <slot>
        <div class="text-lg font-medium">{{ value }}</div>
      </slot>
    </div>
  </div>
</template>
