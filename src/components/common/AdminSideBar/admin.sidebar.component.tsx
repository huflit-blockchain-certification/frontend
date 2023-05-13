import Link from 'next/link'
import React from 'react'
import _ from 'lodash'
import usePermissions from '@/hooks/common/usePermissions'

export default function AdminSideBar() {
  const { adminPlugins } = usePermissions()
  return (
    <aside
      id="default-sidebar"
      className="top-0 left-0 z-40 w-60 border-r-2 border-gray-100 h-screen hidden sm:hidden md:block lg:block"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 w-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            {adminPlugins.map((plugin, index) => {
              return (
                <div className="flex gap-3 items-center" key={index}>
                  {plugin.icon}
                  <Link
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    href={`/admin${plugin.slug}`}
                  >
                    {plugin.name}
                  </Link>
                </div>
              )
            })}
          </li>
        </ul>
      </div>
    </aside>
  )
}
