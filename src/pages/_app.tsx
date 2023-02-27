import '@/styles/globals.css'
import { AppPropsWithLayout } from 'models'
import { SWRConfig } from 'swr'
import { fetcher } from './api/fetcher'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? Component
  return (
    <SWRConfig
      value={{
        fetcher: (url, method, body, headers) => {
          return fetcher({ url, method, body, headers })
        },
        shouldRetryOnError: false,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}
