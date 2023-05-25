import { UniList } from '@/components/RecipientProfile/UniList'
import CheckPermissions from '@/components/common/Auth/check-permissions'
import { DOET_ROLE, PLUGIN_NAMES, UNIVERSITY_ROLE } from '@/constants'
import { useAuth } from '@/hooks/common/useAuth'
import { AdminLayout } from '@/layouts'
import { SelectPageLayout } from '@/layouts/select-page.layout'
import { isAllowAccess } from '@/utils/permissionChecker.util'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export interface RecipientProfilePageProps {}

export default function RecipientPage(props: RecipientProfilePageProps) {
  const { user, roles } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!Array.isArray(roles)) return
    if (isAllowAccess([UNIVERSITY_ROLE], roles)) {
      router.push(`/admin/recipient-profile/${user?.userName}`)
    }
  }, [user?.userName, roles, router])
  return (
    <SelectPageLayout title={PLUGIN_NAMES.RECIPIENT_PROFILE.NAME} subTitle="Chọn đơn vị giáo dục">
      <div className="flex flex-col gap-3">
        <CheckPermissions requireRoles={[UNIVERSITY_ROLE]}>
          <Link
            href={`/admin/recipient-profile/${user?.userName}`}
            className="p-4 shadow fw-bold text-blue-400 hover:bg-slate-100 w-1/2"
          >
            Trường đại học của bạn
          </Link>
        </CheckPermissions>
      </div>
      <CheckPermissions requireRoles={[DOET_ROLE]}>
        <UniList />
      </CheckPermissions>
    </SelectPageLayout>
  )
}

RecipientPage.Layout = AdminLayout
