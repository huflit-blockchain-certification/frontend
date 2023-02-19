import * as React from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

export interface PostDetailProps {
  post: any
}

export default function App({ post }: PostDetailProps) {
  return (
    <div>
      <h1>Post detail</h1>
      <div>{post.title}</div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await res.json()
  return {
    paths: data.map((post: any) => ({ params: { postId: post.id.toString() } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PostDetailProps> = async (
  context: GetStaticPropsContext
) => {
  const postId = context.params?.postId
  if (!postId) return { notFound: true }
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${postId}`)
  const data = await res.json()
  return {
    props: {
      post: data,
    },
  }
}
