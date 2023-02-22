import { APP_NAME } from '@/dynamic'
import { Sidebar } from 'flowbite-react'
import * as React from 'react'
import {
  HiChartPie,
  HiInbox,
  HiViewBoards,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
} from 'react-icons/hi'
export interface AdminSideBar {}

export default function AdminSideBar(props: AdminSideBar) {
  return (
    <div className="w-fit">
      <Sidebar aria-label="blockchain-sidebar">
        <Sidebar.Logo href="#" img="logo.png" imgAlt="Flowbite logo">
          {APP_NAME}
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="alternative">
              Kanban
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox} label="3">
              Inbox
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
