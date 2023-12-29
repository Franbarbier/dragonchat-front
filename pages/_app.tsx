import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import '../styles/globals.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout<GralProps>
}


export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page)

  const [multiTab, setMultiTab] = useState<boolean>(false)
  
  useEffect(() => {
    // if domain contains "vercel" refdirect to main domain
    if (window.location.href.includes("vercel")) {
      window.location.href = "https://dragonchat.io/"
    }
  }, [])



  return (
    <>
    <Head>
      <link rel="shortcut icon" href="/dragonchat_logo.svg" />
    </Head>

    {!multiTab &&
      getLayout(<Component {...pageProps} />)
    }

    {multiTab &&
        <div className="multi_tab">
            <div>
                <div>
                    <h5>Parece que estás intentando ingresar desde mas de una ventana en simultaneo!</h5>
                    <br />
                    <h6>Solo es posible utilizar la plataforma desde una ventana a la vez :/</h6>
                </div>
            </div>
        </div>
    }
    {/* <Loader loading={false}/> */}
    
  </>
  )
}

export type GralProps = {
  sampleTextProp?: string,
  linkedWhatsapp: boolean,
  session_data?: string,
}