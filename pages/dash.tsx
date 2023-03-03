import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { mockCardsContProps } from '../components/cards/CardsCont.mocks';
import CardsCont from '../components/cards/CardsContFree';
import { IEditUserProfileView } from '../components/EditUserProfileView/EditUserProfileView';
import Header from '../components/Header/Header';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
// import Search from '../components/utility/search/Search';
import { NextPageWithLayout } from './page';
import EditUserProfile from './user/edit';




const Home: NextPageWithLayout<IEditUserProfileView> = ({user}) => {

  const { locale } = useRouter();
  const [openSettings, setOpenSettings] = useState<boolean>(false)
  const [modalRef, setModalRef] = useState<boolean>(false)
  
  console.log(user)

  return (
    <section style={{'position':'relative', 'height':'100%', 'width':'100%'}}>
      <Header openSettings={openSettings} setOpenSettings={setOpenSettings} setModalRef={setModalRef}/>

      <AnimatePresence>
      {!openSettings && (
        <motion.div
        key="dash-cont"
        initial={{ opacity: 0, translateY : 15 }}
        animate={{ opacity: 1 , translateY : 0 , transition : {delay : 0.7} }}
        exit={{ opacity: 0, translateY : 15  }}
        style={{ position: 'absolute' }}
        >
             <div  style={{
               'width' : '100vw',
               'height' : '100vh',
               'position': 'relative'
              }}
              >
              <CardsCont {...mockCardsContProps.base} modalRef={modalRef} setModalRef={setModalRef}/>

            </div>
      </motion.div>
      )}
      {openSettings && (
          <motion.div
            key="settings-cont"
            initial={{ opacity: 0, scale : 0.5 }}
            animate={{ opacity: 1 , scale : 1 , transition : {delay : 0.7} }}
            exit={{ opacity: 0, scale : 0.5  }}
            transition={{ duration: 0.5 }}
          >
            <div  style={{
                'width' : '100vw',
                'height' : '100vh',
                'position': 'relative',
                'marginTop': '5%'
              }}
            >
              <EditUserProfile user={user}/>
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

  return {
      props: { user: data.data as IEditUserProfileView['user'] },
      }
}



Home.getLayout = (page) => {
  return (
      <PrimaryLayout>
        {page}
      </PrimaryLayout>
    );
};