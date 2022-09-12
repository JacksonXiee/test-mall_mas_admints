<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="department"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></PageContent>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="department"
      :modalConfig="modalConfigRef"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'

//配置文件
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { useMain } from '@/store/useMain'

const Main = useMain()
const modalConfigRef = computed(() => {
  //找到下拉项
  const parentIdItem = modalConfig.formItems.find(
    (item) => item.field === 'parentId'
  )
  //对下拉项赋值
  parentIdItem!.options = Main.entireDepartment.map((item: any) => {
    return { label: item.name, value: item.id }
  })
  return modalConfig
})

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
  usePageModal()
</script>

<style scoped></style>
