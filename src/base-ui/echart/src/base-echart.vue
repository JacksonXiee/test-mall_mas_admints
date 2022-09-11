<template>
  <div class="base-echart">
    <div
      ref="echartDivRef"
      class="main"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, withDefaults, onMounted } from 'vue'
import type { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

export interface Props {
  options: EChartsOption | any
  width?: string
  height?: string
}
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '360px'
})
let echartDivRef = ref()
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)

  watchEffect(() => {
    setOptions(props.options)
  })
})

onMounted(() => {})
</script>
<style scoped lang="less"></style>
