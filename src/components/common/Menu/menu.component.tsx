import { APP_NAME } from '@/static'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useCallback } from 'react'
import Popover from '@mui/material/Popover'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import CheckPermissions from '../Auth/check-permissions'
import { DOET_ROLE, STUDENT_ROLE, UNIVERSITY_ROLE } from '@/constants'
import { Modal } from '../Modal/modal.component'
import { Button, TextField } from '@mui/material'

export interface Navbar {}

export function Menu(props: Navbar) {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token'])
  const [accessToken, setAccessToken] = useState()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [openSearch, setOpenSearch] = useState(false)
  useEffect(() => {
    setAccessToken(cookies.access_token)
  }, [cookies.access_token])
  const handleOpenSearch = () => {
    setOpenSearch(true)
  }
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const logout = useCallback(() => {
    removeCookie('access_token', { httpOnly: false, path: '/' })
    removeCookie('refresh_token', { httpOnly: false, path: '/' })
    localStorage.removeItem('user')
    router.push('/')
  }, [removeCookie, router])
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Modal open={openSearch} setOpen={setOpenSearch}>
        <form className="flex flex-col gap-4  p-5">
          <div className="font-bold text-red-600">Tra cứu văn bằng chứng chỉ</div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="name" />
            </div>
            <TextField label="Tra cứu" name="search" required={true} fullWidth />
          </div>
          <Button type="submit" variant="outlined">
            Tra cứu
          </Button>
        </form>
      </Modal>
      <nav className="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link
            href="/"
            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer"
          >
            {APP_NAME}
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <a
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={handleOpenSearch}
                >
                  Tra cứu
                </a>
              </li>
              {!accessToken && (
                <li>
                  <Link
                    href="/login"
                    className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Đăng nhập
                  </Link>
                </li>
              )}
              {accessToken && (
                <li>
                  <a
                    className="cursor-pointer block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={handleOpen}
                  >
                    Tài khoản
                  </a>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <div className="flex flex-col w-32 p-3 cursor-pointer">
                      <CheckPermissions requireRoles={[STUDENT_ROLE]}>
                        <Link href="/dac">Văn bằng</Link>
                      </CheckPermissions>
                      <CheckPermissions requireRoles={[UNIVERSITY_ROLE, DOET_ROLE]}>
                        <Link href="/admin">Quản lý</Link>
                      </CheckPermissions>
                      <div onClick={logout}>Đăng xuất</div>
                    </div>
                  </Popover>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
