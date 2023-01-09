import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { mockCardsContProps } from '../components/cards/CardsCont.mocks';
import CardsCont from '../components/cards/CardsContFree';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
// import Search from '../components/utility/search/Search';
import { NextPageWithLayout } from './page';
import { GralProps } from './_app';




const Home: NextPageWithLayout<GralProps> = (GralProps) => {
  const { locale } = useRouter();

  useEffect(()=>{
    const locStorage = JSON.parse( localStorage.getItem('dragonchat_login') || "{}" )
    console.log( locStorage.user_id )
  },[])
  return (
    <section>
      <CardsCont {...mockCardsContProps.base} />
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return (
      <PrimaryLayout>
        {page}
      </PrimaryLayout>
    );
};