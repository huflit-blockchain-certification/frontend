import { AdminLayout } from '@/layouts'
import Link from 'next/link'
import * as React from 'react'

export default function UserPage() {
  return (
    <div>
      <div className="flex flex-col gap-3 w-1/2">
        <Link href="/admin/user/university" className="p-3 shadow fw-bold text-blue-400">
          Quản lý tài khoản đơn vị giáo dục
        </Link>
        <Link href="/admin/user/student" className="p-3 shadow fw-bold text-blue-400">
          Quản lý tài khoản sinh viên
        </Link>
      </div>
    </div>
  )
}

UserPage.Layout = AdminLayout
