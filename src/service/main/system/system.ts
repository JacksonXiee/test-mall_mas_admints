import { myrequest } from '../../index'

import type { IDataType } from '../../type'

export function getPageListData(url: string, queryInfo: any) {
  return myrequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return myrequest.delete<IDataType>({
    url: url
  })
}
export function createPageData(url: string, newData: any) {
  return myrequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return myrequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
