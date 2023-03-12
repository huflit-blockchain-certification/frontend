import '@/styles/globals.css'
import { AppPropsWithLayout } from 'models'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import store from '../store'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? Component
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </Provider>
  )
}
