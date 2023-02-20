import * as React from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

export interface PostDetailProps {
  post: any
}

export default function App({ post }: PostDetailProps) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  if (!post) return null
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
    fallback: true,
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
    revalidate: 60,
  }
}
