<template>
  <div class="page-content">
    <myTable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="default"
          @click="handleNewClick"
          >新建用户</el-button
        >
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            @click="handleEditClick(scope.row)"
            v-if="isUpdate"
            size="small"
            type="primary"
            >编辑</el-button
          >
          <el-button
            @click="handleDeleteClick(scope.row)"
            v-if="isDelete"
            size="small"
            type="danger"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </myTable>
  </div>
</template>

<script lang="ts" setup>
import { defineExpose, defineProps, computed, watch, defineEmits } from 'vue'
import { useSystem } from '@/store/useMain'
import { usePermission } from '@/hooks/use-permission'
import myTable from '@/base-ui/table'
const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true
  },
  pageName: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['newBtnClick', 'editBtnClick'])
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
//处理业务
//1.监听分页器参数
watch(pageInfo, () => getPageData())

//2.请求表格数据
const System = useSystem()
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  System.getPageListAction({
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()
//3.回调方法
const handleDeleteClick = (item: any) => {
  System.deletePageDataAction({
    pageName: props.pageName,
    id: item.id
  })
}

const handleNewClick = () => {
  emit('newBtnClick')
}
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}
//从vuex中获取数据

const dataList = computed(() => System.pageListData(props.pageName))
const dataCount = computed(() => System.pageListCount(props.pageName))

const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === 'status') return false
    if (item.slotName === 'createAt') return false
    if (item.slotName === 'updateAt') return false
    if (item.slotName === 'handler') return false
    return true
  }
)

defineExpose({
  getPageData
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;

  .handle-btns {
    display: flex;

    el-button {
      flex: 1;
    }
  }
}
</style>
