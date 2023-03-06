import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

//When we don't want to render at severside, we can use dynamic

const Menu = dynamic(
  () => import('@/components/common/Menu/menu').then((module) => ({ default: module.Menu })),
  { ssr: false }
)

export interface AboutProps {}

export default function About(props: AboutProps) {
  const router = useRouter()

  return (
    <div>
      <Menu />
      <div className="text-slate-700 text-7xl">About</div>
    </div>
  )
}
