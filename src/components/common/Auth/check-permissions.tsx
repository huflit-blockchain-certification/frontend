import { useAuth } from '@/hooks/common/useAuth'
import { isAllowAccess } from '@/utils/permissionChecker.util'
import * as React from 'react'

export interface CheckPermissionsProps {
  children: React.ReactNode
  requireRoles: string[]
}

export default function CheckPermissions({ children, requireRoles }: CheckPermissionsProps) {
  const { roles } = useAuth()
  if (!isAllowAccess(requireRoles, roles)) {
    return null
  }
  return <div>{children}</div>
}
