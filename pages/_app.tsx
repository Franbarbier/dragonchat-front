import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout<GralProps>
}


export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
    <Head>
      <link rel="shortcut icon" href="/dragonchat_logo.svg" />
    </Head>
    {getLayout(<Component {...pageProps} />)}
  </>
  )
}

export type GralProps = {
  sampleTextProp?: string,
  linkedWhatsapp: boolean
}