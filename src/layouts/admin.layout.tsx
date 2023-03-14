import { Menu } from '@/components/common/Menu/menu.component'
import * as React from 'react'
import { LayoutProps } from 'models/'
import AdminSideBar from '@/components/common/AdminSideBar/admin.sidebar.component'
import BottomNavigation from '@/components/common/BottomNavigation/bottom.navgiation.component'
import { Auth } from '@/components/common/Auth/auth.component'
import { useAuth } from '@/hooks/common/useAuth'

export function AdminLayout({ children }: LayoutProps) {
  useAuth()

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
