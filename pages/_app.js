import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="icon" type="image/svg+xml" href="/urbanride-mark.svg" />
      <meta name="color-scheme" content="light" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
