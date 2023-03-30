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
  recordId: number | string | undefined | any
  setOpen: any
  afterActions: CRUDInterface
}
