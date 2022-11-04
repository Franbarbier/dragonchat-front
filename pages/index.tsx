import { useRouter } from 'next/router';
import FreeCard1 from '../components/cards/free/FreeCard1';
import { mockFreeCard1Props } from '../components/cards/free/FreeCard1.mocks';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
// import Search from '../components/utility/search/Search';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  const { locale } = useRouter();

  
  return (
    <section>
      <h1>Dale campeon</h1>
      <FreeCard1 {...mockFreeCard1Props.base}/>
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