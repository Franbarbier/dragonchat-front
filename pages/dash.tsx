import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mockCardsContProps } from '../components/cards/CardsCont.mocks';
import CardsCont from '../components/cards/CardsContFree';
import Header from '../components/Header/Header';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import ModalContainer from '../components/ModalContainer/ModalContainer';
import ModalUpgradePlan from '../components/ModalUpgradePlan/ModalUpgradePlan';
import { INotification } from '../components/Notification/Notification';
import { STATUS } from '../enums';
import { NextPageWithLayout } from './page';
import EditUserProfile from './user/edit';

interface IDashProps {
  stripe: number,
}


const Home: NextPageWithLayout<IDashProps> = ({ stripe }) => {

  const { locale } = useRouter();
  const [openSettings, setOpenSettings] = useState<boolean>(false)
  const [modalStripe, setModalStripe] = useState<number>(stripe)

  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<INotification>({
    status : STATUS.SUCCESS,
    render : false,
    message : "",
    modalReturn : ()=>{}
})



  useEffect(() => {
    if (modalStripe == 1) {
      // removeStripeCookie()
    }
  }, [modalStripe])



  return (
    <section style={{ 'position': 'relative', 'height': '100%', 'width': '100%' }}>
      <Header openSettings={openSettings} setOpenSettings={setOpenSettings} />

      <AnimatePresence>
        {!openSettings && (
          <>
            <motion.div
              key="dash-cont"
              initial={{ opacity: 0, translateY: 15 }}
              animate={{ opacity: 1, translateY: 0, transition: { delay: 0.7 } }}
              exit={{ opacity: 0, translateY: 15 }}
              style={{ position: 'absolute' }}
            >
              <div style={{
                'width': '100vw',
                'height': '100vh',
                'position': 'relative'
              }}
              >
                <CardsCont {...mockCardsContProps.base} />

              </div>
            </motion.div>
            {modalStripe == 200 &&
              <ModalContainer addedClass='modal_plan' closeModal={() => { setModalStripe(1) }}>
                <ModalUpgradePlan setModalStripe={setModalStripe} />
              </ModalContainer>}
          </>
        )}
        {openSettings && (
          <motion.div
            key="settings-cont"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.7 } }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              'width': '100vw',
              'height': '100vh',
              'position': 'relative',
              'marginTop': '5%'
            }}
            >
              <EditUserProfile setLoading={setLoading} notification={notification} setNotification={setNotification}/>
            </div>
          </motion.div>
        )}

      </AnimatePresence>


    </section>
  );
};

export default Home;



export async function getServerSideProps(context) {

  return {
    props: {
      stripe: "cookiesResponseData"
    }
  }
}



Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};
