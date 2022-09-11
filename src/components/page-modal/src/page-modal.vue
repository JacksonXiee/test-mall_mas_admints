<template>
  <div class="page-modal">
    <el-dialog
      :title="titledata"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <myForm v-bind="modalConfig" v-model="formData"></myForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineExpose } from 'vue'
import { useSystem } from '@/store/useMain'

import myForm from '@/base-ui/form'

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    require: true
  }
})
const dialogVisible = ref(false)
const formData = ref<any>({})
const titledata = ref('新建用户')
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  }
)

// 点击确定按钮的逻辑
const System = useSystem()
const handleConfirmClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    console.log('编辑用户')
    System.editPageDataAction({
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    console.log('新建用户')
    System.createPageDataAction({
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }
}

defineExpose({ dialogVisible, titledata })
</script>

<style scoped></style>
