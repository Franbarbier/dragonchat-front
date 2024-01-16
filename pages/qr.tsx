
import Cookies from "cookies";
import Cookie from "js-cookie";
import Router from "next/router";

import { useState } from "react";
import apiUserController from "../api/apiUserController";
import Header from "../components/Header/Header";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
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
import { API_GATEWAY_URL, LOGIN_COOKIE, MAINTENANCE_FREE, MAINTENANCE_PREMIUM, STRIPE_COOKIE } from "../constants/index";
import { API_ROUTES, ROUTES, STATUS } from "../enums";
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

  const logoutBtnStyle = {
    'width': '100%',
    'padding': '8px 16px',
    'borderRadius': '5px',
    'backgroundColor': '#000',
    'border': '1px solid var(--amarillo)',
    'color': 'var(--amarillo)',
    'cursor': 'pointer',
    'letterSpacing': '1px',
  }
  const pro_btn : React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%)",
    top: "5%",
  }

  async function handleLogout() {
    
    setLoading(true)

    try {
      const accessToken = JSON.parse(Cookie.get(LOGIN_COOKIE)).access_token;
    
      const response = await apiUserController.logout(accessToken);

      if (response.status == 200) {

        Cookie.remove(LOGIN_COOKIE);


        Router.push(`${ROUTES.LOGIN}`);
        setLoading(false)

      }
    } catch (error: any) {
        // alert(error.response.data.error);
        setLoading(false)
    }
  }

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
            
              <QrCard notification={notification} setNotification={setNotification}/>
           
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

    console.log(responseData)

    if (responseData.subscription && responseData.subscription.isPaid === undefined) {
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


  return { props: { stripe : stripeStatus, isPaid : data?.subscription?.isPaid, maintenance : maint } };
  
  
  }
