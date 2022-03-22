import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../../prismicio'
import Link from 'next/link'

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>
            {children}
          </a>
        </Link>
      )}
    >
      <NextAuthProvider session={pageProps.session}>
        <Header/>
        <PrismicPreview repositoryName={repositoryName}>
          <Component {...pageProps} />
        </PrismicPreview>
      </NextAuthProvider>
    </PrismicProvider>
  )
}

export default MyApp
