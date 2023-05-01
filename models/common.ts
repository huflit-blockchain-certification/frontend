import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export interface CRUDInterface {
  create: (response: any) => void
  edit: (response: any) => void
}
export interface FormProps {
  recordId?: number | string | undefined | any
  setOpen: any
  afterActions: CRUDInterface
  idParam?: string | string[] | undefined
}

export interface ListParams {
  page: number
  pageSize?: number
  accessToken: string
  keyword?: string
  idParam?: string | string[] | undefined
  extraParams?: any
}

export interface CreateParams {
  data: any
  accessToken: string
  idParam?: string | string[] | undefined
}
export interface EditParams {
  id: any
  data: any
  accessToken: string
  idParam?: string | string[] | undefined
}
export interface DeleteParams {
  id: any
  accessToken: string
  idParam?: string | string[] | undefined
}

export interface DetailParams {
  id: any
  accessToken: string
  idParam?: string | string[] | undefined
}

export interface GenerateProof {
  sharedField: string
  accessToken: string
  idParam?: string | string[] | undefined
}

export interface Verify {
  accessToken: string
  data: any
}
export interface AdminUser {
  roles: string[]
  userName: string
  _id: string
}

export interface PluginNames {
  name: string
  icon: any
  slug: string
  roles: string[]
}
