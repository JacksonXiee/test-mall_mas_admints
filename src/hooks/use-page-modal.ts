import { ref } from 'vue'
import type PageModal from '@/components/page-modal'

type CallbackFn = (item?:any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  
  const defaultInfo = ref({})
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      pageModalRef.value.titledata='新建用户'
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => { 
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      pageModalRef.value.titledata='编辑用户'
    }   
    editCb && editCb(item)
  }
  return {pageModalRef, defaultInfo, handleNewData, handleEditData}
}
