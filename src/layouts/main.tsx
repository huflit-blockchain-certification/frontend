import * as React from 'react'
import { Menu } from '@/components/common/Menu/menu'
import BottomNavigation from '@/components/common/BottomNavigation/bottomNavigation'

export interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Menu />
      <main className="container mx-auto">{children}</main>
      <hr></hr>
      <BottomNavigation />
    </div>
  )
}
