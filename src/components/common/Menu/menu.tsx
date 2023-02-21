import { APP_NAME } from '@/dynamic'
import { Navbar } from 'flowbite-react'
import Image from 'next/image'
import * as React from 'react'
export interface Navbar {}

export function Menu(props: Navbar) {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="https://flowbite.com/">
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
        <Navbar.Link href="/navbars" active={true}>
          Trang chủ
        </Navbar.Link>
        <Navbar.Link href="/navbars">Thông tin</Navbar.Link>
        <Navbar.Link href="/navbars">Dịch vụ</Navbar.Link>
        <Navbar.Link href="/navbars">Giá cả</Navbar.Link>
        <Navbar.Link href="/navbars">Liên hệ</Navbar.Link>
        <Navbar.Link href="/navbars ">Quản trị</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
