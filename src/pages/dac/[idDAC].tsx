import { MainLayout } from '@/layouts'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export interface InfoDACPageProps {}

export default function InfoDACPage(props: InfoDACPageProps) {
  const router = useRouter()
  const { idDAC } = router.query

  return <div></div>
}

InfoDACPage.Layout = MainLayout
