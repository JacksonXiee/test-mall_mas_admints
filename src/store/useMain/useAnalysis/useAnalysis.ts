import { defineStore } from 'pinia'

import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis'
export const useAnalysis = defineStore('useAnalysis', {
  state:()=>{
    return {
      topPanelDatas: [],
      categoryGoodsCount: []as any,
      categoryGoodsSale: []as any,
      categoryGoodsFavor: []as any,
      addressGoodsSale: []as any
    }
  },
  actions:{
    async getDashboardDataAction() {
      const resultTopPanelDatas = await getAmountList()
      this.topPanelDatas = resultTopPanelDatas.data

      const categoryCountResult = await getCategoryGoodsCount()
      this.categoryGoodsCount=categoryCountResult.data

      const categorySaleResult = await getCategoryGoodsSale()
      this.categoryGoodsSale= categorySaleResult.data

      const categoryFavorResult = await getCategoryGoodsFavor()
      this.categoryGoodsFavor=categoryFavorResult.data
      
      const addressGoodsResult = await getAddressGoodsSale()
      this.addressGoodsSale=addressGoodsResult.data
    }
  }
})