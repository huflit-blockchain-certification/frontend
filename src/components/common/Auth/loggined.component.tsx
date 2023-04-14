import useLoggined from '@/hooks/common/useLoginned'
import * as React from 'react'

export interface LogginedPageProps {
  children: React.ReactNode
}

export function LoginnedPage({ children }: LogginedPageProps) {
  useLoggined()
  return <div>{children}</div>
}
