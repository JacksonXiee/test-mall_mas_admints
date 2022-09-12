<template>
  <span ref="counterRef" />
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, onMounted, ref, watch } from 'vue'
// http://inorganik.github.io/countUp.js/
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'
const defaultOptions: CountUpOptions = {
  decimalPlaces: 2, // 保留两位
  duration: 2, // 动画时长
  separator: ',', // 千位分割
  decimal: '.', // 小数分割
  prefix: '￥' // 单位
}
const props = withDefaults(
  defineProps<{
    number: number
    option: Object
  }>(),
  {
    number: 0,
    option: () => {
      return {}
    }
  }
)
const counterRef = ref<HTMLDivElement | null>(null)
const instance = ref<CountUp | null>(null)

watch(
  () => props.number,
  () => {
    update(props.number)
  }
)
onMounted(() => {
  createCounter()
})

const createCounter = () => {
  if (!counterRef.value) return
  const opts: CountUpOptions = Object.assign(defaultOptions, props.option)
  instance.value = new CountUp(counterRef?.value, props.number, opts)
  start()
}

const start = () => {
  if (!instance.value) return
  instance?.value.start()
}
const update = (number: number) => {
  if (!instance.value) return
  instance?.value.update(number)
}
</script>

<style scoped lang="less"></style>
