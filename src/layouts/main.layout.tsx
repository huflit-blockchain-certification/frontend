import React from 'react'
import { Menu } from '@/components/common/Menu/menu.component'
import BottomNavigation from '@/components/common/BottomNavigation/bottom.navgiation.component'
import { LayoutProps } from 'models/'

export function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <Menu />
      <main className="pb-8">{children}</main>
      <BottomNavigation />
    </>
  )
}
