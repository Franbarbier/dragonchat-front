import type { AppProps } from 'next/app';

import { IEditUserProfileView } from "../components/EditUserProfileView/EditUserProfileView";
import '../styles/globals.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout<GralProps>
}


export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export type GralProps = {
  sampleTextProp?: string,
  linkedWhatsapp: boolean,
  user?: IEditUserProfileView["user"]
}