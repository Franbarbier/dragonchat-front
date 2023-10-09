
import Cookies from "cookies";
import Cookie from "js-cookie";

import Router from "next/router";
import { useState } from "react";
import apiUserController from "../api/apiUserController";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import Loader from "../components/Loader/Loader";
import MainCont from "../components/MainCont/MainCont";
import Notification, { INotification } from '../components/Notification/Notification';
import QrCard from "../components/QrCard/QrCard";
import QrWaitingRoom from "../components/QrWaitingRoom/QrWaitingRoom";
import { STRIPE_COOKIE } from "../constants/index";
import { ROUTES, STATUS } from "../enums";
import useDeviceType from "../utils/checkDevice";
import { NextPageWithLayout } from "./page";

// set type for IQr
interface IQr {
  stripeCookie: boolean;
}

const Qr: NextPageWithLayout<IQr> = ({ stripeCookie }) => {
  const [queue, setQueue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false)


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
      const accessToken = JSON.parse(Cookie.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).access_token;
      const response = await apiUserController.logout(accessToken);
      if (response.status == 200) {
        Cookies.remove(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME);
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
            <>
              {stripeCookie && (
                <span style={alertUpdatePlan} >Vincula tu dispositivo para activar tu nuevo plan!</span>
              )}
              <QrCard notification={notification} setNotification={setNotification}/>
            </>
          </MainCont>
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

export async function getServerSideProps({ req, res }) {
    
  const cookies = new Cookies(req, res);
  var stripeCookie = false;
  if (cookies.get(STRIPE_COOKIE)) {
    stripeCookie = true;
  }

  return { props: { stripeCookie } };
}