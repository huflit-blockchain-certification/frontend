import CheckPermissions from '@/components/common/Auth/check-permissions'
import { DOET_ROLE, UNIVERSITY_ROLE } from '@/constants'
import { useAuth } from '@/hooks/common/useAuth'
import { AdminLayout } from '@/layouts'
import { SelectPageLayout } from '@/layouts/select-page.layout'
import { isAllowAccess } from '@/utils/permissionChecker.util'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function UserPage() {
  const { roles, user } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!Array.isArray(roles)) return
    if (isAllowAccess([UNIVERSITY_ROLE], roles)) {
      router.push(`/admin/user/student/?createdBy=${user?._id}`)
    }
  }, [user?._id, roles, router])
  return (
    <SelectPageLayout title="Chọn đơn vị">
      <div className="flex flex-col gap-3">
        <CheckPermissions requireRoles={[DOET_ROLE]}>
          <Link
            href="/admin/user/university"
            className="p-4 shadow fw-bold text-blue-400 hover:bg-slate-100 w-1/2"
          >
            Quản lý tài khoản đơn vị giáo dục
          </Link>
        </CheckPermissions>
        <Link
          href={`/admin/user/student${
            isAllowAccess([UNIVERSITY_ROLE], roles) ? `?createdBy=${user?._id}` : ''
          }`}
          className="p-4 shadow fw-bold text-blue-400 hover:bg-slate-100 w-1/2"
        >
          Quản lý tài khoản sinh viên
        </Link>
      </div>
    </SelectPageLayout>
  )
}

UserPage.Layout = AdminLayout
