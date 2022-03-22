import { GetStaticProps } from 'next'
import { createClient } from '../../../prismicio'
import { RichText } from 'prismic-dom'
import Head from 'next/head'

import styles from './styles.module.scss'
import Link from 'next/link'

type Post = {
  slug: string,
  title: string,
  excerpt: string,
  updatedAt: string,
}

interface PostProps {
  posts: Post[]
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({previewData}) => {
  const client = createClient({ previewData })

  const response = await client.getByType('custom-publication-type')
  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.Title),
      excerpt: post.data.Content.find(content => content.type == 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })
  return {
    props: { posts }, // Will be passed to the page component as props
  }
}