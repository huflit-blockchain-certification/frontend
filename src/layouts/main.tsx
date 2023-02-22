import * as React from 'react'
import { Menu } from '@/components/common/Menu/menu'
import BottomNavigation from '@/components/common/BottomNavigation/bottomNavigation'
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
