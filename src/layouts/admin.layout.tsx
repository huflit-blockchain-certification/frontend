import { Menu } from '@/components/common/Menu/menu.component'
import * as React from 'react'
import { LayoutProps } from 'models/'
import AdminSideBar from '@/components/common/AdminSideBar/admin.sidebar.component'
import BottomNavigation from '@/components/common/BottomNavigation/bottom.navgiation.component'
import { Auth } from '@/components/common/Auth/auth.component'
import { useAuth } from '@/hooks/common/useAuth'

export function AdminLayout({ children }: LayoutProps) {
  const { user } = useAuth()

  return (
    <Auth>
      <Menu />
      <div className="flex">
        <div>
          <AdminSideBar user={user} />
        </div>
        <div className="flex-1">
          <main className="p-5">{children}</main>
        </div>
      </div>
      <BottomNavigation />
    </Auth>
  )
}
