<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick"
            ><el-icon><SwitchButton /></el-icon><span>退出登录</span>
          </el-dropdown-item>
          <el-dropdown-item
            ><el-icon><User /></el-icon><span>用户信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Operation /></el-icon><span>系统管理</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLogin } from '@/store/useLogin'
import { SwitchButton, User, Operation } from '@element-plus/icons-vue'
import localcache from '@/utils/cache'
import { useRouter } from 'vue-router'

const Login = useLogin()
const name = computed(() => Login.userInfo.name)
const router = useRouter()
const handleExitClick = () => {
  localcache.deleteCache('token')
  router.push('/main')
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
