import * as React from 'react'
import Navbar from '@/components/common/Navbar/navbar'
import Footer from '@/components/common/Footer/footer'

export interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="shadow w-56 h-screen">
        <div className="shadow flex flex-col gap-3 p-3">
          <div className="font-semibold ">Blockchain Dashboard</div>
          <div className="text-sm">v0.01</div>
        </div>
        <ul className="flex flex-col gap-3 w-full p-3">
          <li className="bg-blue-50 rounded-md p-2">Văn bằng</li>
          <li className="p-2">Sinh viên</li>
        </ul>
      </div>
      <main className="container mx-auto">{children}</main>
      <hr></hr>
      <Footer />
    </>
  )
}
