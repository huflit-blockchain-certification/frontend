import { PLUGIN_NAMES } from '@/constants/'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { AdminUser } from 'models'

export interface AdminSideBar {
  user?: AdminUser
}

export default function AdminSideBar({ user }: AdminSideBar) {
  interface Plugin {
    name: string
    icon: any
    slug: string
    roles: string[]
  }

  const defaultPlugins: Plugin[] = [
    {
      name: PLUGIN_NAMES.OVERVIEW.NAME,
      icon: PLUGIN_NAMES.OVERVIEW.ICON,
      slug: PLUGIN_NAMES.OVERVIEW.SLUG,
      roles: PLUGIN_NAMES.OVERVIEW.ROLES,
    },
    {
      name: PLUGIN_NAMES.USERS.NAME,
      icon: PLUGIN_NAMES.USERS.ICON,
      slug: PLUGIN_NAMES.USERS.SLUG,
      roles: PLUGIN_NAMES.USERS.ROLES,
    },
    {
      name: PLUGIN_NAMES.RECIPIENT_PROFILE.NAME,
      icon: PLUGIN_NAMES.RECIPIENT_PROFILE.ICON,
      slug: PLUGIN_NAMES.RECIPIENT_PROFILE.SLUG,
      roles: PLUGIN_NAMES.RECIPIENT_PROFILE.ROLES,
    },
    {
      name: PLUGIN_NAMES.CERT_TYPE.NAME,
      icon: PLUGIN_NAMES.CERT_TYPE.ICON,
      slug: PLUGIN_NAMES.CERT_TYPE.SLUG,
      roles: PLUGIN_NAMES.CERT_TYPE.ROLES,
    },
    {
      name: PLUGIN_NAMES.GRADUAUATION_COURSE.NAME,
      icon: PLUGIN_NAMES.GRADUAUATION_COURSE.ICON,
      slug: PLUGIN_NAMES.GRADUAUATION_COURSE.SLUG,
      roles: PLUGIN_NAMES.GRADUAUATION_COURSE.ROLES,
    },
    {
      name: PLUGIN_NAMES.GRADUAUATION_YEAR.NAME,
      icon: PLUGIN_NAMES.GRADUAUATION_YEAR.ICON,
      slug: PLUGIN_NAMES.GRADUAUATION_YEAR.SLUG,
      roles: PLUGIN_NAMES.GRADUAUATION_YEAR.ROLES,
    },
    {
      name: PLUGIN_NAMES.DAC.NAME,
      icon: PLUGIN_NAMES.DAC.ICON,
      slug: PLUGIN_NAMES.DAC.SLUG,
      roles: PLUGIN_NAMES.DAC.ROLES,
    },
  ]

  const [adminPlugins, setAdminPlugins] = useState<Plugin[]>([])
  useEffect(() => {
    if (!user) return
    const userRole = user.roles
    const checkPermissions: Plugin[] = defaultPlugins.reduce((result: Plugin[], plugin) => {
      if (userRole.every((role) => plugin.roles.includes(role))) {
        result.push(plugin)
      }
      return result
    }, [])
    setAdminPlugins(checkPermissions)
  }, [user?.roles])

  return (
    <div className="w-60 border-r-2 border-gray-100 h-screen">
      <aside
        id="default-sidebar"
        className="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
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
    </div>
  )
}
