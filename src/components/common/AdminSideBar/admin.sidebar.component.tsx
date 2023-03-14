import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { HiChartPie, HiUser, HiOutlineDocument, HiOutlineDocumentText } from 'react-icons/hi'
export interface AdminSideBar {}

export default function AdminSideBar(props: AdminSideBar) {
  const router = useRouter()
  return (
    <div className="w-fit border-r-2 border-gray-100 h-screen">
      <aside
        id="default-sidebar"
        className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <div className="flex gap-3 items-center">
                <HiChartPie />
                <Link
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/admin"
                >
                  Tổng quan
                </Link>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-center">
                <HiUser />
                <Link
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/admin/user"
                >
                  Tài khoản
                </Link>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-center">
                <HiOutlineDocument />
                <Link
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/admin/recipient-profile"
                >
                  Hồ sơ người nhận
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
