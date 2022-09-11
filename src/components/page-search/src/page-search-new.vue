<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearchClick"
            >搜索</el-button
          >
        </div>
      </template>
    </my-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import myForm from '@/base-ui/form'

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])
const props = defineProps({
  searchFormConfig: {
    type: Object,
    reuqired: true
  }
})

//自动化生成formData
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

//重置回调
const handleResetClick: any = () => {
  formData.value = formOriginData
  emit('resetBtnClick')
}
//搜索回调
const handleSearchClick: any = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
