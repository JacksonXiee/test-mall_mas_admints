<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="../../../assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :collapse="collapse"
      background-color="#0c2135"
      class="el-menu-vertical-demo"
      :default-active="defaultValue"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <!-- 二级菜单 -->
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu v-if="item.type === 1" :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="subitem in item.children"
            :key="subitem.id"
            :index="subitem.id + ''"
            @click="handleMenuItemClick(subitem)"
          >
            {{ subitem.name }}
          </el-menu-item>
        </el-sub-menu>
        <!-- 一级菜单 -->
        <el-menu-item v-else-if="item.type === 2" :index="item.id + ''">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useLogin } from '@/store/useLogin'
import { Monitor, Goods, Setting, ChatLineRound } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const Login = useLogin()
    const userMenus = computed(() => Login.userMenus)
    const router = useRouter()
    const handleMenuItemClick = (item: any) => {
      console.log('--------')
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    //defaultValue
    const route = useRoute()
    const currentPath = route.path
    console.log(currentPath)
    const menu = pathMapToMenu(userMenus.value, currentPath)

    const defaultValue = ref(menu.id + '')

    return { userMenus, defaultValue, handleMenuItemClick }
  },
  components: {
    'el-icon-monitor': Monitor,
    'el-icon-setting': Setting,
    'el-icon-goods': Goods,
    'el-icon-chat-line-round': ChatLineRound
  }
})
</script>
<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 42px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;

    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
