import '@/styles/globals.css'
import { AppPropsWithLayout } from 'models'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import store from '../store'
import { appWithTranslation } from 'next-i18next'
import nextI18nConfig from 'next-i18next.config'

function App({ Component, pageProps }: AppPropsWithLayout) {
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

export default appWithTranslation(App, nextI18nConfig)
