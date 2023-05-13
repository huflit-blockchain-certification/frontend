import { Menu } from '@/components/common/Menu/menu.component'
import * as React from 'react'
import { LayoutProps } from 'models/'
import AdminSideBar from '@/components/common/AdminSideBar/admin.sidebar.component'
import Footer from '@/components/common/Footer/bottom.navgiation.component'
import { Auth } from '@/components/common/Auth/auth.component'

export function AdminLayout({ children }: LayoutProps) {
  return (
    <Auth>
      <Menu />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1">
          <main className="p-5">{children}</main>
        </div>
      </div>
      <Footer />
    </Auth>
  )
}
