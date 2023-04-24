import CheckPermissions from '@/components/common/Auth/check-permissions'
import { UNIVERSITY_ROLE } from '@/constants'
import { useAuth } from '@/hooks/common/useAuth'
import { AdminLayout } from '@/layouts'
import Link from 'next/link'
import * as React from 'react'

export interface RecipientProfilePageProps {}

export default function RecipientPage(props: RecipientProfilePageProps) {
  const { user } = useAuth()
  return (
    <div>
      <div className="text-2xl font-bold">Chọn đơn vị giáo dục</div>
      <div className="flex flex-col gap-3 w-1/2">
        <CheckPermissions requireRoles={[UNIVERSITY_ROLE]}>
          <Link
            href={`/admin/recipient-profile/${user?.userName}`}
            className="p-3 shadow fw-bold text-blue-400 hover:shadow-lg transition duration-300"
          >
            Trường đại học của bạn
          </Link>
        </CheckPermissions>
      </div>
    </div>
  )
}

RecipientPage.Layout = AdminLayout
