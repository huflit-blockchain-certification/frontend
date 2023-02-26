import { Sidebar } from 'flowbite-react'
import * as React from 'react'
import { HiChartPie, HiUser } from 'react-icons/hi'
export interface AdminSideBar {}

export default function AdminSideBar(props: AdminSideBar) {
  return (
    <div className="w-fit border-r-2 border-gray-100 h-screen">
      <Sidebar aria-label="blockchain-sidebar">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/admin" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/admin/user" icon={HiUser}>
              Users
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
