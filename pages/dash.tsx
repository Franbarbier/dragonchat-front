import { useRouter } from 'next/router';
import { mockCardsContProps } from '../components/cards/CardsCont.mocks';
import CardsCont from '../components/cards/CardsContFree';
import Header from '../components/Header/Header';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
// import Search from '../components/utility/search/Search';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import { NextPageWithLayout } from './page';
import { GralProps } from './_app';




const Home: NextPageWithLayout<GralProps> = (GralProps) => {
  const { locale } = useRouter();
  const [openSettings, setOpenSettings] = useState<boolean>(false)


  console.log(GralProps)
  return (
    <section>
      <Header openSettings={openSettings} setOpenSettings={setOpenSettings}/>
      <AnimatePresence>
        {!openSettings && (
          <motion.div
            initial={{ opacity: 0, y : 15 }}
            animate={{ opacity: 1 , y:0 }}
            exit={{ opacity: 0, y : 15 }}
          >
            <CardsCont {...mockCardsContProps.base}/>

          </motion.div>
        )}
      </AnimatePresence>
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