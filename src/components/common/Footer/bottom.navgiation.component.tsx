import { APP_NAME } from '@/static'
import * as React from 'react'
import Logo from '../../../../public/logo.png'
export interface FooterProps {}

export default function Footer(props: FooterProps) {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-auto">
      <div className="w-full p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
            <img src={Logo.src} className="h-8 mr-3" alt="Highbar Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {APP_NAME}
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Thông tin
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Chính sách
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Cấp phép
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <a href="https://flowbite.com/" className="hover:underline">
            High3ar™
          </a>
          . Đã đăng ký bản quyền.
        </span>
      </div>
    </footer>
  )
}
