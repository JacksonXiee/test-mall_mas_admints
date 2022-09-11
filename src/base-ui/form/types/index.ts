type IFormType = 'input' | 'password' | 'select' | 'datepicker'

interface optionType {
  label: string
  value: string | number
}

export interface myFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: optionType[]
  // 针对特殊的属性 el-date-picker或者其他属性
  otherOptions?: any
  isHidden?: boolean
}
export interface myFormType {
  formItems: myFormItem[]
  labelWidth?: string
  //ele容器的布局配置 响应式布局
  colLayout?: any
  //item的样式
  itemStyle?: any
}
