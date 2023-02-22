import { Menu } from '@/components/common/Menu/menu'
import * as React from 'react'
import { LayoutProps } from 'models/'
import AdminSideBar from '@/components/common/AdminSideBar/adminSidebar'

export function Admin({ children }: LayoutProps) {
  return (
    <>
      <Menu />
      <AdminSideBar />
      <main className="pb-8">{children}</main>
    </>
  )
}
