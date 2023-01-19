import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
// import Search from '../components/utility/search/Search';
import { NextPageWithLayout } from './page';
import { GralProps } from './_app';




const Home: NextPageWithLayout<GralProps> = (GralProps) => {
  const router = useRouter();

  useEffect(()=>{
      router.push("/dash")
  }, [])

  return (
    <section>
      <></>
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