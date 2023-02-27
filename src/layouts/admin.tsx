import { Menu } from '@/components/common/Menu/menu'
import * as React from 'react'
import { LayoutProps } from 'models/'
import AdminSideBar from '@/components/common/AdminSideBar/adminSidebar'
import BottomNavigation from '@/components/common/BottomNavigation/bottomNavigation'
import { Auth } from '@/components/common/Auth/auth'

export function AdminLayout({ children }: LayoutProps) {
  return (
    <Auth>
      <Menu />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <AdminSideBar />
        </div>
        <div className="col-span-10">
          <main className="p-5">{children}</main>
        </div>
      </div>
      <BottomNavigation />
    </Auth>
  )
}
