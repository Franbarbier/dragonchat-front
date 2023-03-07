import { useRouter } from 'next/router';
import { useState } from 'react';
import CardsCont from '../components/cards/CardsContFree';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
// import Search from '../components/utility/search/Search';
import { NextPageWithLayout } from './page';
import { GralProps } from './_app';




const Home: NextPageWithLayout<GralProps> = (GralProps) => {

  const [modalRef, setModalRef] = useState<boolean>(false)

  const { locale } = useRouter();

  console.log(GralProps)
  return (
    <section>
      <CardsCont />
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