import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export interface LoadingIndicatorProps {
  size?: string
}

export function LoadingIndicator({ size }: LoadingIndicatorProps) {
  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{ marginRight: '-50%', transform: 'translate(-50%,-50%)' }}
    >
      <CircularProgress className="text-center" />
    </div>
  )
}
