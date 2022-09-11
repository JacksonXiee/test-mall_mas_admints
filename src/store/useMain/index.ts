import { defineStore } from 'pinia'
import { getPageListData} from '@/service/main/system/system'
export const useMain = defineStore('useMain', {
  state: () => {
    return {
      entireDepartment: [] as any,
      entireRole: [] as any,
      entireMenu: [] as any
    }
  },actions: {
    async getInitialDataAction() {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      // 2.保存数据
      this.entireDepartment = departmentList
      this.entireRole = roleList
      this.entireMenu = menuList
    }
  }

})



export * from './useSystem'
export * from './useAnalysis/useAnalysis'
