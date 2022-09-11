<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick"
      ><component :is="iconC"></component
    ></el-icon>
    <div class="content">
      <HyBreadcrumb :breadcrumbs="breadcrumbs"></HyBreadcrumb>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
import { DArrowRight, DArrowLeft } from '@element-plus/icons-vue'
import HyBreadcrumb from '@/base-ui/breadcrumb'
import { useLogin } from '@/store/useLogin'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  components: {
    UserInfo,
    DArrowRight,
    DArrowLeft,
    HyBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    //折叠逻辑
    const isFold = ref(false)
    const iconC = ref('DArrowLeft')
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      iconC.value = isFold.value ? 'DArrowRight' : 'DArrowLeft'
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据: [{name: , path: }]
    const Login = useLogin()
    const breadcrumbs = computed(() => {
      const userMenus = Login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      iconC,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
