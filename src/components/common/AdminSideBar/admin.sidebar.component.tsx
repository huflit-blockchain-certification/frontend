import { PLUGIN_NAMES } from '@/constants'
import Link from 'next/link'
import * as React from 'react'
import { HiChartPie, HiUser, HiOutlineDocument } from 'react-icons/hi'
export interface AdminSideBar {}

export default function AdminSideBar(props: AdminSideBar) {
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
                  {PLUGIN_NAMES.OVERVIEW.NAME}
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
                  {PLUGIN_NAMES.USERS.NAME}
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
                  {PLUGIN_NAMES.RECIPIENT_PROFILE.NAME}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-center">
                <HiOutlineDocument />
                <Link
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/admin/cert-type"
                >
                  {PLUGIN_NAMES.CERT_TYPE.NAME}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex gap-3 items-center">
                <HiOutlineDocument />
                <Link
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/admin/graduation-course"
                >
                  {PLUGIN_NAMES.GRADUAUATION_COURSE.NAME}
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
