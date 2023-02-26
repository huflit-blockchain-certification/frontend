import { APP_NAME } from '@/dynamic'
import { Dropdown, Navbar } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'
export interface Navbar {}

export function Menu(props: Navbar) {
  const router = useRouter()
  return (
    <Navbar fluid={true} rounded={true} border={true}>
      <Navbar.Brand className="cursor-pointer" onClick={() => router.push('/')}>
        <Image
          width="50"
          height="50"
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {APP_NAME}
        </span>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Link className="cursor-pointer" onClick={() => router.push('/')} active={true}>
          Trang chủ
        </Navbar.Link>
        <Navbar.Link className="cursor-pointer">Thông tin</Navbar.Link>
        <Navbar.Link className="cursor-pointer">Dịch vụ</Navbar.Link>
        <Navbar.Link className="cursor-pointer">Giá cả</Navbar.Link>
        <Navbar.Link className="cursor-pointer">Liên hệ</Navbar.Link>
        <Navbar.Link className="cursor-pointer" onClick={() => router.push('/login')}>
          Đăng nhập
        </Navbar.Link>
        <Dropdown inline={true} label="Tài khoản" size="sm">
          <Dropdown.Item></Dropdown.Item>
          <Dropdown.Item onClick={() => router.push('/admin')}>Quản trị</Dropdown.Item>
          <Dropdown.Item>Đăng xuất</Dropdown.Item>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}
