<script setup lang="ts">
import AlgorithmCardItem from "./algorithm-card-item.vue";

defineProps<{
	timeComplexity: string;
	spaceComplexity: string;
	isStable: boolean;
	inPlace: boolean;
}>();
</script>
<template>
  <div class="p-4 bg-gray-50 dark:bg-#161618 rounded-lg  transition-shadow hover:shadow-lg shadow-sm">
    <div class="flex justify-between gap-4">
      <!-- 时间复杂度 -->
      <AlgorithmCardItem emoji="⏱️" label="时间复杂度" :value="timeComplexity" />

      <!-- 空间复杂度 -->
      <AlgorithmCardItem emoji="💾" label="空间复杂度" :value="spaceComplexity" />

      <!-- 稳定性 -->
      <AlgorithmCardItem emoji="🎯" label="稳定性">
        <span :class="[
          'px-2 py-1 rounded-full text-sm font-medium',
          isStable
            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
            : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
        ]">
          {{ isStable ? '稳定' : '不稳定' }}
        </span>
      </AlgorithmCardItem>

      <!-- 原地排序 -->
      <AlgorithmCardItem emoji="🔄" label="原地排序">
        <span :class="[
          'px-2 py-1 rounded-full text-sm font-medium',
          inPlace
            ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
            : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
        ]">
          {{ inPlace ? '是' : '否' }}
        </span>
      </AlgorithmCardItem>
    </div>
  </div>
</template>
