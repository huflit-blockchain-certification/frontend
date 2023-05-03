import { UniList } from '@/components/RecipientProfile/UniList'
import CheckPermissions from '@/components/common/Auth/check-permissions'
import { DOET_ROLE, UNIVERSITY_ROLE } from '@/constants'
import { useAuth } from '@/hooks/common/useAuth'
import { AdminLayout } from '@/layouts'
import { isAllowAccess } from '@/utils/permissionChecker.util'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export interface DACAdminPageProps {}

export default function DACAdminPage(props: DACAdminPageProps) {
  const { user, roles } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!Array.isArray(roles)) return
    if (isAllowAccess([UNIVERSITY_ROLE], roles)) {
      router.push(`/admin/dac/${user?.userName}`)
    }
  }, [user?.userName, roles, router])
  return (
    <div className="container">
      <div className="text-2xl font-bold mb-4">Chọn đơn vị giáo dục</div>
      <div className="flex flex-col gap-3 w-1/2">
        <CheckPermissions requireRoles={[UNIVERSITY_ROLE]}>
          <Link
            href={`/admin/dac/${user?.userName}`}
            className="p-3 shadow fw-bold text-blue-400 hover:shadow-lg transition duration-300"
          >
            Trường đại học của bạn
          </Link>
        </CheckPermissions>
      </div>
      <CheckPermissions requireRoles={[DOET_ROLE]}>
        <UniList />
      </CheckPermissions>
    </div>
  )
}

DACAdminPage.Layout = AdminLayout
