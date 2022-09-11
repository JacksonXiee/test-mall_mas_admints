<template>
  <div class="page-content">
    <myTable :listData="dataList" v-bind="contentTableConfig">
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="default">新建用户</el-button>
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
      <template #handler>
        <div class="handle-btns">
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </div>
      </template>
    </myTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useSystem } from '@/store/useMain'

import myTable from '@/base-ui/table'
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    myTable
  },
  setup(props) {
    const System = useSystem()
    const getPageData = (queryInfo: any = {}) => {
      System.getPageListAction({
        pageName: props.pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...queryInfo
        }
      })
    }
    getPageData()

    const dataList = computed(() => System.pageListData(props.pageName))
    // const userCount = computed(() => store.state.system.userCount)
    return { dataList, getPageData }
  }
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
