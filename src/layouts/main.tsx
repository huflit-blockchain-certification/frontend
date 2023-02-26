import React, { useEffect } from 'react'
import { Menu } from '@/components/common/Menu/menu'
import BottomNavigation from '@/components/common/BottomNavigation/bottomNavigation'
import { LayoutProps } from 'models/'
import { useCookies } from 'react-cookie'

export function MainLayout({ children }: LayoutProps) {
  const [cookies] = useCookies(['accessToken'])
  useEffect(() => {
    console.log('hell')
  }, [cookies])
  return (
    <>
      <Menu />
      <main className="pb-8">{children}</main>
      <BottomNavigation />
    </>
  )
}
