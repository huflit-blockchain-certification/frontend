import { Menu } from '@/components/common/Menu/menu'
import * as React from 'react'
import { LayoutProps } from 'models/'
import AdminSideBar from '@/components/common/AdminSideBar/adminSidebar'
import BottomNavigation from '@/components/common/BottomNavigation/bottomNavigation'

export function AdminLayout({ children }: LayoutProps) {
  return (
    <>
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
    </>
  )
}
