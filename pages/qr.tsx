import Cookies from "js-cookie";
import Router from "next/router";
import { useState } from "react";
import apiUserController from "../api/apiUserController";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import Loader from "../components/Loader/Loader";
import MainCont from "../components/MainCont/MainCont";
import Notification, { INotification } from '../components/Notification/Notification';
import QrCard from "../components/QrCard/QrCard";
import QrWaitingRoom from "../components/QrWaitingRoom/QrWaitingRoom";
import { ROUTES } from "../enums";
import useDeviceType from "../utils/checkDevice";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const Qr: NextPageWithLayout<GralProps> = () => {
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
      const accessToken = JSON.parse(Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).access_token;
      const response = await apiUserController.logout(accessToken);
      if (response.status == 200) {
        Cookies.remove(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME);
        Router.push(`${ROUTES.LOGIN}`);
        setLoading(false)

      }
    } catch (error: any) {
        alert(error.response.data.error);
        setLoading(false)
    }
  }

  const [notification, setNotification] = useState<INotification>({
    status : "success",
    render : false,
    message : "",
    modalReturn : ()=>{}
  })

  const isMobile = useDeviceType();



  return (
    <section style={{"paddingTop": isMobile ? "15%" : '' }}>
      <Loader loading={loading} />
      <Notification {...notification} />

      <div style={{ 'position': 'absolute', 'top': '5%', 'right': ' 5%' }}>
        <button
          onClick={handleLogout}
          style={logoutBtnStyle}
        >LOG OUT</button>
      </div>
      {queue == 0 ? (
        <MainCont width={isMobile ? 90 : 40} style={ isMobile ? {'top' : "55%" } : {}  }>
          <QrCard notification={notification} setNotification={setNotification}/>
        </MainCont>
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