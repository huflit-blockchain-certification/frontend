import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface UniCardProps {
  identity: string
  name: string
}

export function UniCard({ identity, name }: UniCardProps) {
  const router = useRouter()
  return (
    <Link
      href={
        router.pathname.includes('dac')
          ? `/admin/dac/${identity}`
          : `/admin/recipient-profile/${identity}`
      }
      className="block w-full p-6 bg-white border 
      border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Mã trường: {identity}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Trường: {name}</p>
    </Link>
  )
}
