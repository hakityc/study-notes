# 使用 ECharts 实现数据可视化并导出 Excel

## 1. 引言

在 Web 开发中，数据可视化和数据导出是常见的需求。ECharts 作为强大的前端可视化库，可以帮助开发者构建丰富的图表。而 `xlsx` 库则可以将图表数据转换为 Excel 文件，方便数据分析和分享。

本文介绍如何封装 `useEcharts` 进行 ECharts 初始化、配置、销毁等操作，并通过 `useEchartsToExcel` 将图表数据导出到 Excel。

## 2. ECharts 图表封装

### 2.1 初始化 ECharts

封装 `useEcharts`，提供初始化、配置、重置和销毁 ECharts 实例的方法。

```ts
export const useEcharts = () => {
  const chart = shallowRef<echarts.ECharts>();
  
  const initEcharts = (dom: HTMLElement) => {
    if (!dom || chart.value) return;
    chart.value = echarts.init(dom);
  };
  
  const setOption = (option: any) => {
    if (chart.value) {
      chart.value.setOption(option);
    }
  };
  
  const resizeEcharts = () => {
    chart.value?.resize();
  };
  
  const disposeEcharts = () => {
    chart.value?.dispose();
  };
  
  return {
    chart,
    initEcharts,
    setOption,
    resizeEcharts,
    disposeEcharts,
  };
};
```

### 2.2 在 Vue 组件中使用

```vue
<script lang="ts" setup>
import { useEcharts } from "@/hooks/useEcharts";
import { useElementSize } from "@vueuse/core";
import { debounce } from "lodash";

const { initEcharts, setOption, resizeEcharts, disposeEcharts, chart } = useEcharts();

const props = defineProps<{
  option: any;
  debounce?: boolean;
  loading?: boolean;
}>();

const chartRef = ref();
const { width, height } = useElementSize(chartRef);

watch(
  () => props.option,
  () => {
    if (!chartRef.value) return;
    init();
  },
  {
    deep: true,
  }
);

watch(
  [width, height],
  () => {
    if (props.debounce) {
      debounce(resizeEcharts, 1000)();
    } else {
      resizeEcharts();
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const init = () => {
  nextTick(() => {
    initEcharts(chartRef.value);
    setOption(props.option);
  });
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  disposeEcharts();
});

defineExpose({
  chart,
});
</script>

<template>
  <div v-loading="loading" class="wh-full" ref="chartRef"></div>
</template>

<style scoped></style>
```

## 3. 数据导出到 Excel

### 3.1 导出逻辑封装

`useEchartsToExcel` 负责解析 ECharts 配置，并将数据转换为 Excel 格式。

```ts
export const useEchartsToExcel = () => {
  const fileName = ref();
  const option = ref<echarts.EChartsOption>();
  
  const exportToExcel = ({ name, echartsOption }: { name: string; echartsOption: echarts.EChartsOption }) => {
    try {
      fileName.value = name;
      option.value = echartsOption;
      dataToXLSX();
    } catch (error) {
      console.error(error);
    }
  };
  
  const dataToXLSX = () => {
    if (!option.value) return;
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);
    const seriesData = option.value.series as Series[];
    chartAnalysis(seriesData, worksheet);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName.value}.xlsx`);
  };
  
  return { exportToExcel };
};
```

### 3.2 处理不同类型的图表数据

对于基础图表数据：

```ts
const basicChartAnalysis = (seriesData: Series[], worksheet: XLSX.WorkSheet) => {
  let index = 1;
  seriesData.forEach((series) => {
    if (!series.data) return;
    let seriesRow: [string, ...number[]] = [`${series.name}(${series.extra.unit})`];
    seriesRow = [...seriesRow, ...series.data.map((item) => Number(item || 0))];
    XLSX.utils.sheet_add_aoa(worksheet, [seriesRow], { origin: { r: 0, c: index } });
    index++;
  });
};
```

针对饼图数据的处理：

```ts
const pieChartAnalysis = (seriesData: Series[], worksheet: XLSX.WorkSheet) => {
  const series = seriesData[0];
  if (!isComplexData(series.data)) return;
  const seriesTitleRow = [fileName.value, ...series.data.map((item) => item.name || '')];
  const seriesContentRow = [`${series.name}(${series.extra.unit})`, ...series.data.map((item) => Number(item.value || 0))];
  XLSX.utils.sheet_add_aoa(worksheet, [seriesTitleRow], { origin: { r: 0, c: 0 } });
  XLSX.utils.sheet_add_aoa(worksheet, [seriesContentRow], { origin: { r: 1, c: 0 } });
};
```

### 3.3 在 Vue 组件中使用

```vue
<template>
  <button @click="exportData">导出 Excel</button>
</template>

<script setup>
import { useEchartsToExcel } from '@/hooks/useEchartsToExcel';
const { exportToExcel } = useEchartsToExcel();
const exportData = () => {
  exportToExcel({
    name: 'Chart Data',
    echartsOption: {
      xAxis: { data: ['A', 'B', 'C'] },
      series: [{ name: '数据', type: 'bar', data: [10, 20, 30], extra: { unit: '个' } }],
    },
  });
};
</script>
```

## 4. 总结

- `useEcharts` 提供了 ECharts 图表的初始化、设置配置、调整大小和销毁的方法。
- `useEchartsToExcel` 提供了将 ECharts 数据导出为 Excel 文件的方法，并支持不同类型的图表数据解析。
- 通过封装这些功能，可以提高代码复用性，简化数据可视化和数据导出工作。
