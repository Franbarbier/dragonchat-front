
import Cookies from "cookies";

import { useState } from "react";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import MainCont from "../components/MainCont/MainCont";
import Maintenance from "../components/Maintenance/Maintenance";
import ModalContainer from "../components/ModalContainer/ModalContainer";
import ModalPasatePro from "../components/ModalPasatePro/ModalPasatePro";
import ModalUpgradePlan from "../components/ModalUpgradePlan/ModalUpgradePlan";
import Notification, { INotification } from '../components/Notification/Notification';
import QrCard from "../components/QrCard/QrCard";
import QrWaitingRoom from "../components/QrWaitingRoom/QrWaitingRoom";
import WppBtn from "../components/WppBtn/WppBtn";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { API_GATEWAY_URL, LOGIN_COOKIE, MAINTENANCE_FREE, MAINTENANCE_PREMIUM, STRIPE_COOKIE } from "../constants/index";
import { API_ROUTES, STATUS } from "../enums";
import useDeviceType from "../utils/checkDevice";
import { decrypt } from "../utils/crypto";
import { NextPageWithLayout } from "./page";

// set type for IQr
interface IQr {
  stripeCookie: null | number;
  isPaid: boolean;
  maintenance: boolean;
}

const Qr: NextPageWithLayout<IQr> = ({ stripeCookie, isPaid, maintenance }) => {
  const [queue, setQueue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false)

  const [modalPro, setModalPro] = useState<boolean>(false)

  const [modalStripe, setModalStripe] = useState<null | number>(stripeCookie)


  const [notification, setNotification] = useState<INotification>({
    status : STATUS.SUCCESS,
    render : false,
    message : "",
    modalReturn : ()=>{}
  })

  const isMobile = useDeviceType();

  
  

  return (
    <section style={{"paddingTop": isMobile ? "15%" : '0%' }}>

      {maintenance && <Maintenance setLoading={setLoading} />}
      
      <Loader loading={loading} />
      <Notification {...notification} />

      <Header openSettings={false} setOpenSettings={()=> {return false;} } isPaid={isPaid} qr={true}/>
      <WppBtn />
      {queue == 0 ? (
        <>
          <MainCont width={isMobile ? 90 : 40} style={ isMobile ? {'top' : "55%" } : {'top' : "50%" }  }>
            
              <QrCard notification={notification} setNotification={setNotification} isPaid={isPaid}/>
           
          </MainCont>
          {modalStripe == 200 &&
              <ModalContainer addedClass='modal_plan' closeModal={() => { setModalStripe(1) }}>
                <ModalUpgradePlan setModalStripe={setModalStripe} />
              </ModalContainer>
          }
          {modalPro &&
                <div>
                    <div>
                        <ModalContainer closeModal={ ()=> {setModalPro(false)} } addedClass="pro">
                            <ModalPasatePro />
                        </ModalContainer>
                    </div>
                </div>
            }
        </>
      ) :
        <QrWaitingRoom queue={queue} />
      }
    </section>
  );
};

Qr.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

export default Qr;

export async function getServerSideProps({req, res}) {


  const cookies = new Cookies(req, res);
  const responseText = decodeURIComponent(cookies.get(LOGIN_COOKIE) );
  const accessToken = JSON.parse(responseText).access_token

  var stripeStatus:null | number = null
  if (cookies.get(STRIPE_COOKIE)) {
    
    const stripe_data = decrypt( JSON.parse( cookies.get(STRIPE_COOKIE) ))
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
      
      var handleChangePlan : { isPaid?: boolean } = {}
      try {
        handleChangePlan = await changePlan.json();
      } catch (error) {
      }
      
      if (handleChangePlan?.isPaid == true) {
        // no encontre como eliminarla asique la seteo con un null y ya expirada
        cookies.set(STRIPE_COOKIE, null, { expires: new Date(0) });
        stripeStatus = 200
      }
  }
  
  let maint = false
  let data:any = {subscription:{isPaid: false}}
  
  try {
    const getData = await fetch(`${API_GATEWAY_URL}${API_ROUTES.GET_DATA}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    const responseData = await getData.json();

    if (responseData?.suscription ) {
      
      data.subscription.isPaid = false;
    }else{
      data = responseData
    }
    
  } catch (error) {
  }

  if (data?.subscription?.isPaid == false && MAINTENANCE_FREE) {
    maint = true
  }
  if ( data?.subscription?.isPaid == true && MAINTENANCE_PREMIUM ) {
      maint = true
  }


  return  { props: { stripe : stripeStatus, isPaid : data?.subscription?.isPaid ? data?.subscription?.isPaid : false, maintenance : maint } }
  
  
  }
