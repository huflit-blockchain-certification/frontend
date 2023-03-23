import { GoBack } from '@/components/common/Goback/goback.component'
import { LoadingIndicator } from '@/components/common/LoadingIndicator/loadingIndicator.component'
import { Button } from '@mui/material'
import React from 'react'
interface FormProps {
  children: React.ReactNode
  customActions?: React.ReactNode
  disableHeader?: boolean
  onSubmit?: () => void
  className?: string
  goBack?: boolean
  loading?: boolean
}

export function FormHeader({
  children,
  customActions,
  onSubmit,
  disableHeader,
  className,
  goBack,
  loading,
}: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      <>
        {!loading ? (
          <>
            {goBack && <GoBack />}
            {!disableHeader && (
              <div className="flex p-5">
                {customActions ? (
                  customActions
                ) : (
                  <Button variant="outlined" style={{ marginLeft: 'auto' }} type="submit">
                    Lưu
                  </Button>
                )}
              </div>
            )}
            <div className={className ?? ''}>{children}</div>
          </>
        ) : (
          <LoadingIndicator />
        )}
      </>
    </form>
  )
}
