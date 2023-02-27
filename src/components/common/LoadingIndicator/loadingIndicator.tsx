import { Spinner } from 'flowbite-react'
import * as React from 'react'

export interface LoadingIndicatorProps {
  size?: string
}

export function LoadingIndicator({ size }: LoadingIndicatorProps) {
  return <Spinner aria-label="Extra large spinner example" size={size ?? 'xl'} />
}
