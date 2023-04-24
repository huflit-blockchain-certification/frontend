import React from 'react'
import { Menu } from '@/components/common/Menu/menu.component'
import Footer from '@/components/common/Footer/bottom.navgiation.component'
import { LayoutProps } from 'models/'

export function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <Menu />
      <main className="pb-8">{children}</main>
      <Footer />
    </>
  )
}
