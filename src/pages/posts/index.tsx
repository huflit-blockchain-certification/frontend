import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import * as React from 'react'

export interface AboutProps {
  posts: any[]
}

export default function About({ posts }: AboutProps) {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<AboutProps> = async (
  context: GetStaticPropsContext
) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await res.json()
  return {
    props: {
      posts: data.map((post: any) => {
        return {
          id: post.id,
          title: post.title,
        }
      }),
    },
  }
}
