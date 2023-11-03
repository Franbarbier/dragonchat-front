
import Cookies from "cookies";
import Cookie from "js-cookie";
import Router from "next/router";

import { useState } from "react";
import apiUserController from "../api/apiUserController";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import Loader from "../components/Loader/Loader";
import MainCont from "../components/MainCont/MainCont";
import ModalContainer from "../components/ModalContainer/ModalContainer";
import ModalUpgradePlan from "../components/ModalUpgradePlan/ModalUpgradePlan";
import Notification, { INotification } from '../components/Notification/Notification';
import QrCard from "../components/QrCard/QrCard";
import QrWaitingRoom from "../components/QrWaitingRoom/QrWaitingRoom";
import { API_GATEWAY_URL, LOGIN_COOKIE, STRIPE_COOKIE } from "../constants/index";
import { API_ROUTES, ROUTES, STATUS } from "../enums";
import useDeviceType from "../utils/checkDevice";
import { decrypt } from "../utils/crypto";
import { NextPageWithLayout } from "./page";

// set type for IQr
interface IQr {
  stripeCookie: null | number;
}

const Qr: NextPageWithLayout<IQr> = ({ stripeCookie }) => {
  const [queue, setQueue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false)

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

  
  const alertUpdatePlan : React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%)",
    textAlign: "center",
    letterSpacing: "0.8px",
    fontSize: "11px",
    bottom: "110%",
    padding: "5px 8px",
    background: "#000",
    color: "var(--amarillo)",
    border: "1px solid var(--amarillo)",
    borderRadius: "9px",
    width: "max-content"
  }

  return (
    <section style={{"paddingTop": isMobile ? "15%" : '0%' }}>
      <Loader loading={loading} />
      <Notification {...notification} />

      <div style={{ 'position': 'absolute', 'top': '5%', 'right': ' 5%' }}>
        <button
          onClick={handleLogout}
          style={logoutBtnStyle}
        >LOG OUT</button>
      </div>
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


  return { props: { stripeCookie : stripeStatus } };
}
