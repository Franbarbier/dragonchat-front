import Cookies from 'cookies';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { mockCardsContProps } from '../components/cards/CardsCont.mocks';
import CardsCont from '../components/cards/CardsContFree';
import Header from '../components/Header/Header';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import ModalContainer from '../components/ModalContainer/ModalContainer';
import ModalUpgradePlan from '../components/ModalUpgradePlan/ModalUpgradePlan';
import { INotification } from '../components/Notification/Notification';
import { API_GATEWAY_URL, LOGIN_COOKIE, STRIPE_COOKIE } from '../constants/index';
import { API_ROUTES, STATUS } from '../enums';
import { decrypt } from '../utils/crypto';
import { NextPageWithLayout } from './page';
import EditUserProfile from './user/edit';

interface IDashProps {
  stripe: null | number
}


const Home: NextPageWithLayout<IDashProps> = ({ stripe }) => {

  const { locale } = useRouter();
  const [openSettings, setOpenSettings] = useState<boolean>(false)
  const [modalStripe, setModalStripe] = useState<null | number>(stripe)

  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<INotification>({
    status : STATUS.SUCCESS,
    render : false,
    message : "",
    modalReturn : ()=>{}
})


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



export async function getServerSideProps({req, res}) {

  
  const cookies = new Cookies(req, res);
  var stripeStatus:null | number = null
  

  if (cookies.get(STRIPE_COOKIE)) {

      const stripe_data = decrypt( JSON.parse( cookies.get(STRIPE_COOKIE) ))
      const responseText = decodeURIComponent(cookies.get(LOGIN_COOKIE) );
      const accessToken = JSON.parse(responseText).access_token
      const changePlan = await fetch(`${API_GATEWAY_URL}${API_ROUTES.UPDATE_PLAN}`, {
        method: 'PUT',
        body : JSON.stringify({
          session_id: JSON.parse(stripe_data).session_id,
          product_id: JSON.parse(stripe_data).product_id
        }),
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });
      
      const handleChangePlan = await changePlan.json();

      if (handleChangePlan.isPaid == true) {
        cookies.set(STRIPE_COOKIE, null, { expires: new Date(0) });
        // no encontre como eliminarla asique la seteo con un null y ya expirada
        stripeStatus = 200
      }
  }

  


  return { props: { stripe : stripeStatus } };
}

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};
