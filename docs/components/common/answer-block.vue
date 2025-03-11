<script lang="ts" setup>
/** imports  */
import { Collapse, CollapsePanel, Button, Tooltip } from "ant-design-vue";
import { BulbOutlined } from "@ant-design/icons-vue";
import IconButton from "@/components/base/icon-button.vue";
import { useData } from "vitepress";
// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
interface Props {}

/** props  */
defineProps<Props>();

/** ref  */
const activeKey = ref<string | number | undefined>(undefined);
const { isDark } = useData();
/** computed */

/** hooks */

/** methods  */

/** watch  */

/** lifecycle  */
</script>

<template>
  <div class="wh-full flex-col">
    <Collapse
      v-model:activeKey="activeKey"
      :bordered="false"
    >
      <CollapsePanel
        key="1"
        header="答案"
      >
        <div>
          <slot></slot>
          <div
            v-if="$slots.expansion"
            class="tip custom-block"
          >
            <p class="custom-block-title">拓展</p>
            <slot name="expansion"></slot>
          </div>
        </div>

        <template #extra>
          <Tooltip>
            <template #title>
              <div class="tip custom-block text-#fff!">
                <p class="custom-block-title">提示</p>
                <span>
                  <slot name="tip"></slot>
                </span>
              </div>
            </template>
            <IconButton
              type="text"
              class="w-8! h-8! p-0"
              @click.stop
              v-if="$slots.tip"
            >
              <BulbOutlined />
            </IconButton>
          </Tooltip>
        </template>
      </CollapsePanel>
    </Collapse>
  </div>
</template>

<style scoped></style>
