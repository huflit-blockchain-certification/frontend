import '@/styles/globals.css'
import { AppPropsWithLayout } from 'models'
import { CookiesProvider } from 'react-cookie'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? Component
  return (
    <CookiesProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  )
}
