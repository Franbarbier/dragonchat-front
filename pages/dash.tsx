import Cookies from 'cookies';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import CardsCont from '../components/cards/CardsContFree';
import Header from '../components/Header/Header';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import Loader from "../components/Loader/Loader2";
import ModalContainer from '../components/ModalContainer/ModalContainer';
import ModalUpgradePlan from '../components/ModalUpgradePlan/ModalUpgradePlan';
import Notification, { INotification } from '../components/Notification/Notification';
import { API_GATEWAY_URL, LOGIN_COOKIE, STRIPE_COOKIE } from '../constants/index';
import { API_ROUTES, STATUS } from '../enums';
import { decrypt } from '../utils/crypto';
import { NextPageWithLayout } from './page';
import EditUserProfile from './user/edit';

interface IDashProps {
  stripe: null | number,
  isPaid: boolean
}


const Dash: NextPageWithLayout<IDashProps> = ({ stripe, isPaid }) => {

  const [openSettings, setOpenSettings] = useState<boolean>(false)
  const [modalStripe, setModalStripe] = useState<null | number>(stripe)

  const [contactsLength , setContactsLength] = useState<false>(false)

  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<INotification>({
    status: STATUS.SUCCESS,
    render: false,
    message: "",
    modalReturn: () => { }
  })
  

  return (
    <section style={{ 'position': 'relative', 'height': '100%', 'width': '100%' }}>
      <Header openSettings={openSettings} setOpenSettings={setOpenSettings} isPaid={isPaid}/>

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
                <CardsCont isPaid={isPaid}/>

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
              <EditUserProfile 
                setLoading={setLoading} 
                notification={notification} 
                setNotification={setNotification}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Loader loading={loading} />
      <Notification {...notification} />
    </section>
  );
};

export default Dash;



export async function getServerSideProps({ req, res }) {


  const cookies = new Cookies(req, res);
  var stripeStatus: null | number = null

  const responseText = decodeURIComponent(cookies.get(LOGIN_COOKIE));
  const accessToken = JSON.parse(responseText).access_token

  if (cookies.get(STRIPE_COOKIE)) {

    const stripe_data = decrypt(JSON.parse(cookies.get(STRIPE_COOKIE)))
    const changePlan = await fetch(`${API_GATEWAY_URL}${API_ROUTES.UPDATE_PLAN}`, {
      method: 'PUT',
      body: JSON.stringify({
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

  const getData = await fetch(`${API_GATEWAY_URL}${API_ROUTES.GET_DATA}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });

  const data = await getData.json();

  return { props: { stripe : stripeStatus, isPaid : data?.subscription?.isPaid } };
}

Dash.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};
