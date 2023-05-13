import { AdminLayout } from '@/layouts'
import { SelectPageLayout } from '@/layouts/select-page.layout'
import Link from 'next/link'
import * as React from 'react'

export default function UserPage() {
  return (
    <SelectPageLayout title="Chọn đơn vị">
      <div className="flex flex-col gap-3">
        <Link
          href="/admin/user/university"
          className="p-4 shadow fw-bold text-blue-400 hover:bg-slate-100 w-1/2"
        >
          Quản lý tài khoản đơn vị giáo dục
        </Link>
        <Link
          href="/admin/user/student"
          className="p-4 shadow fw-bold text-blue-400 hover:bg-slate-100 w-1/2"
        >
          Quản lý tài khoản sinh viên
        </Link>
      </div>
    </SelectPageLayout>
  )
}

UserPage.Layout = AdminLayout
