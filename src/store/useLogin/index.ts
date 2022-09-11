import { defineStore } from 'pinia'
import type { IAccount } from '@/service/login/type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login'
import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import { useMain } from '../useMain'
export const useLogin = defineStore('useLogin', {
  state: () => {
    return {
      token: '',
      userInfo: {} as any,
      userMenus: [] as any,
      permissions: [] as any
    }
  },
  actions: {
    async accountLoginAction(payload: IAccount) {
      //1.登录
      const resoult:any = await accountLoginRequest(payload)
      console.log(resoult)

      const { id, token } = resoult.data
      this.token = token
      localCache.setCache('token', token)

      //2.请求用户信息
      const userInfoResult:any = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)

      //3.请求用户菜单
      const userMenusResult:any = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      this.loadMenus(userMenus)
      localCache.setCache('userMenus', userMenus)
      const Main = useMain()
      Main.getInitialDataAction()

      // 4.跳到首页
      router.push('/main')
    },

    //初始化状态树
    loadLocalLogin() {
      const token = localCache.getCache('token')
      if (token) {
        this.token = token
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        this.userMenus = userMenus
        this.loadMenus(userMenus)
        const Main = useMain()
        Main.getInitialDataAction()
      }
    },
    //初始化菜单
    loadMenus(userMenus: any[]) {
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions
    }
  }
})
