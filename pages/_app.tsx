import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../styles/globals.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout<GralProps>
}


export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page)
  

  useEffect(() => {
    // Perform localStorage action
    const locStorage =  JSON.parse( localStorage.getItem('dragonchat_login')  || "{}" ) 

    // if (locStorage?.status != 200 || !locStorage.hasOwnProperty('access_token')) {
    //   if (window.location.href.indexOf("login") == -1 && window.location.href.indexOf("signup") == -1) {
    //     Router.push('/login')
    //   }
    // }
    
  }, [])




  return getLayout(<Component {...pageProps} />)
}

export type GralProps = {
  sampleTextProp: 'Este es el card cont',
}