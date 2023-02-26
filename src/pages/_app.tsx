import '@/styles/globals.css'
import { AppPropsWithLayout } from 'models'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? Component
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
