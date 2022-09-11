import { defineStore } from 'pinia'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis'
export const useAnalysis = defineStore('useAnalysis', {
  state:()=>{
    return {
      categoryGoodsCount: []as any,
      categoryGoodsSale: []as any,
      categoryGoodsFavor: []as any,
      addressGoodsSale: []as any
    }
  },
  actions:{
    async getDashboardDataAction() {
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