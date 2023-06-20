import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import apiUserController from "../api/apiUserController";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import Notification, { INotification } from '../components/Notification/Notification';
import QrCard from "../components/QrCard/QrCard";
import QrWaitingRoom from "../components/QrWaitingRoom/QrWaitingRoom";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const Qr: NextPageWithLayout<GralProps> = () => {
  const [queue, setQueue] = useState<number>(0);

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
    try {
      const accessToken = JSON.parse(Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).access_token;
      const response = await apiUserController.logout(accessToken);
      if (response.status == 200) {
        Cookies.remove(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME);
        Router.push("/login");
      }
    } catch (error: any) {
      alert(error.response.data.error);
    }
  }

  const [notification, setNotification] = useState<INotification>({
    status : "success",
    render : false,
    message : "",
    modalReturn : ()=>{}
})

const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isMobileDevice);
    };
    // Initial check
    handleResize();
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section>
      <Notification {...notification} />

      <div style={{ 'position': 'absolute', 'top': '5%', 'right': ' 5%' }}>
        <button
          onClick={handleLogout}
          style={logoutBtnStyle}
        >LOG OUT</button>
      </div>
      {queue == 0 ? (
        <MainCont width={isMobile ? 90 : 40}>
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