import CookiesJS from 'js-cookie';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../components/Header/Header';
import Loader from "../components/Loader/Loader2";
import Maintenance from '../components/Maintenance/Maintenance';
import ModalContainer from '../components/ModalContainer/ModalContainer';
import ModalUpgradePlan from '../components/ModalUpgradePlan/ModalUpgradePlan';
import Notification, { INotification } from '../components/Notification/Notification';
import CardsCont, { ContactInfo } from '../components/cards/CardsContFree';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { STATUS } from '../enums';
import { NextPageWithLayout } from './page';
import EditUserProfile from './user/edit';

interface IDashProps {
  stripe: null | number,
  isPaid: boolean,
  maintenance: boolean
}


const Dash: NextPageWithLayout<IDashProps> = ({ stripe, isPaid, maintenance }) => {

  // syncing
  if (CookiesJS.get("syncTime")) window.location.href = "/syncing";

  const [openSettings, setOpenSettings] = useState<boolean>(false)
  const [modalStripe, setModalStripe] = useState<null | number>(stripe)

  const [globalData, setGlobalData] = useState<{contactos : ContactInfo[],  messages : string[][]} >({contactos : [{nombre: '', numero: ''}], messages : [['']]});   

  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<INotification>({
    status: STATUS.SUCCESS,
    render: false,
    message: "",
    modalReturn: () => { }
  })


  return (
    <section style={{ 'position': 'relative', 'height': '100%', 'width': '100%' }}>

      {maintenance && <Maintenance setLoading={setLoading} />}

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
              }} >

                <CardsCont isPaid={isPaid} setGlobalData={setGlobalData} globalData={globalData}/>

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
  
  return { props: { stripe : null, isPaid : true, maintenance : false } };



}

Dash.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};
