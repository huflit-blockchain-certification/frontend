import { useAuth } from '@/hooks/common/useAuth'
import * as React from 'react'

export interface AuthProps {
  children: React.ReactNode
}

export function Auth({ children }: AuthProps) {
  useAuth()
  return <div>{children}</div>
}
