import { useLogin } from '@/store/useLogin'

export function usePermission(pageName: string, hanldeName: string) {
  const Login = useLogin()
  const permissions = Login.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`

  // 如果有值，!!可以转成true
  return !!permissions.find((item: any) => item === verifyPermission)
}
