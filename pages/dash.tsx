import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mockCardsContProps } from '../components/cards/CardsCont.mocks';
import CardsCont from '../components/cards/CardsContFree';
import { IEditUserProfileView } from '../components/EditUserProfileView/EditUserProfileView';
import Header from '../components/Header/Header';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import ModalContainer from '../components/ModalContainer/ModalContainer';
import ModalUpgradePlan from '../components/ModalUpgradePlan/ModalUpgradePlan';
import { NextPageWithLayout } from './page';
import EditUserProfile from './user/edit';

interface IDashProps {
  user: IEditUserProfileView,
  stripe: number,
}


const Home: NextPageWithLayout<IDashProps> = ({ user, stripe }) => {

  const { locale } = useRouter();
  const [openSettings, setOpenSettings] = useState<boolean>(false)
  const [modalStripe, setModalStripe] = useState<number>(stripe)

  const typedUser = user as IEditUserProfileView;

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
              <EditUserProfile user={typedUser} />
            </div>
          </motion.div>
        )}

      </AnimatePresence>


    </section>
  );
};

export default Home;



export async function getServerSideProps(context) {
  const cookies = context.req?.cookies;
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const cookieName = process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME
  const accessToken = JSON.parse(cookies[`${cookieName}`]).access_token
  headers.append("Authorization", `Bearer ${accessToken}`);
  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_USER_URL}/auth/me`,
    { headers }
  );
  const data = await apiResponse.json();

  let dataTyped = data.data as IEditUserProfileView;

  // Esto estaria bueno hacerlo global, no en /dash pero el success del pago te lleva a /dash en principio asique por ahora esta bien
  // const cookiesResponseData = await fetchStripeData(context.req);

  return {
    props: {
      user: dataTyped,
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
