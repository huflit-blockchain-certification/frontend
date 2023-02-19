import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

//When we don't want to render at severside, we can use dynamic

const Header = dynamic(() => import('@/components/common/header'), { ssr: false })

export interface AboutProps {}

export default function About(props: AboutProps) {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  useEffect(() => {
    ;(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await res.json()
      setPosts(data)
    })()
  }, [])

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
      <Header />
      <div className="text-slate-700 text-7xl">About</div>
      <ul>
        {posts.map((post: any) => (
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
