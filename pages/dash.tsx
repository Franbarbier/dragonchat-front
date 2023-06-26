import cookie from 'cookie';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { mockCardsContProps } from '../components/cards/CardsCont.mocks';
import CardsCont from '../components/cards/CardsContFree';
import { IEditUserProfileView } from '../components/EditUserProfileView/EditUserProfileView';
import Header from '../components/Header/Header';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import Loader from '../components/Loader/Loader';
import { API_USER_URL, LOGIN_COOKIE } from '../constants/ index';
import { API_ROUTES } from '../enums';
import { NextPageWithLayout } from './page';
import EditUserProfile from './user/edit';


const Home: NextPageWithLayout<IEditUserProfileView> = ({ user }) => {
  const [openSettings, setOpenSettings] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <section style={{ 'position': 'relative', 'height': '100%', 'width': '100%' }}>
      <Loader loading={loading} />
      <Header openSettings={openSettings} setOpenSettings={setOpenSettings} />

      <AnimatePresence>
        {!openSettings && (
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
              <EditUserProfile user={user} setLoading={setLoading}/>
            </div>
          </motion.div>
        )}

      </AnimatePresence>


    </section>
  );
};

export default Home;

Home.getInitialProps = async (context) => {
  if (context.req?.headers.cookie) {
    const cookies = cookie.parse(context.req.headers.cookie);
    const { access_token: accessToken } = JSON.parse(cookies[LOGIN_COOKIE || '']);

    const apiResponse = await fetch(
      `${API_USER_URL}${API_ROUTES.AUTH_ME}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      }
    );
    const { data } = await apiResponse.json();

    return { user: data } as IEditUserProfileView
  }

  return { user: {} } as IEditUserProfileView
}

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};