import { myrequest } from '../../index'

import type { IDataType } from '../../type'

enum DashboardAPI {
  amountList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}
export function getAmountList() {
  return myrequest.get<IDataType>({
    url: DashboardAPI.amountList
  })
}
export function getCategoryGoodsCount() {
  return myrequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return myrequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return myrequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return myrequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  })
}
