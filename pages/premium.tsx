import { useRouter } from 'next/router';
import { mockCardsContProps } from '../components/cards/CardsCont.mocks';
import CardsCont from '../components/cards/CardsContPrem';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
// import Search from '../components/utility/search/Search';
import { NextPageWithLayout } from './page';
import { GralProps } from './_app';

const Home: NextPageWithLayout<GralProps> = (GralProps) => {
  const { locale } = useRouter();

  
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