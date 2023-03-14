import { useRouter } from 'next/router'
import * as React from 'react'
import { HiArrowLeft } from 'react-icons/hi'

export interface GoBackProps {}

export function GoBack(props: GoBackProps) {
  const router = useRouter()
  return (
    <div className="flex gap-3 items-center text-blue-400 cursor-pointer">
      <HiArrowLeft />
      <div onClick={() => router.back()}>Quay lại</div>
    </div>
  )
}
