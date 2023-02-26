import { Sidebar } from 'flowbite-react'
import { useRouter } from 'next/router'
import * as React from 'react'
import { HiChartPie, HiUser } from 'react-icons/hi'
export interface AdminSideBar {}

export default function AdminSideBar(props: AdminSideBar) {
  const router = useRouter()
  return (
    <div className="w-fit border-r-2 border-gray-100 h-screen">
      <Sidebar aria-label="blockchain-sidebar">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              className="cursor-pointer"
              onClick={() => router.push('/admin')}
              icon={HiChartPie}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              className="cursor-pointer"
              onClick={() => router.push('/admin/user')}
              icon={HiUser}
            >
              Users
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
