import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

//When we don't want to render at severside, we can use dynamic

const Menu = dynamic(
  () => import('@/components/common/Menu/menu').then((module) => ({ default: module.Menu })),
  { ssr: false }
)

export interface AboutProps {}

export default function About(props: AboutProps) {
  const router = useRouter()
  const fetcher = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await res.json()
    return data
  }
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/todos', fetcher)
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  function handleNextPage() {
    router.push({
      pathname: '/about',
      query: {
        page: 2,
      },
    })
  }

  return (
    <div>
      <Menu />
      <div className="text-slate-700 text-7xl">About</div>
      <ul>
        {data.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
        <button className="p-3 shadow border-l-amber-50 bg-slate-500" onClick={handleNextPage}>
          Next
        </button>
      </ul>
    </div>
  )
}
