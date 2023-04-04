import { AdminLayout } from '@/layouts'
import Link from 'next/link'
import * as React from 'react'

export interface RecipientProfilePageProps {}

export default function RecipientPage(props: RecipientProfilePageProps) {
  const user = JSON.parse(localStorage.getItem('user') || '')
  return (
    <div>
      <div className="text-2xl font-bold">Chọn trường đại học</div>
      <div className="flex flex-col gap-3 w-1/2">
        {user && (
          <Link
            href={`/admin/recipient-profile/${user?.userName}`}
            className="p-3 shadow fw-bold text-blue-400 hover:shadow-lg transition duration-300"
          >
            Trường đại học của bạn
          </Link>
        )}
      </div>
    </div>
  )
}

RecipientPage.Layout = AdminLayout
