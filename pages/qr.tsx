import cookie from 'cookie';
import Cookies from "js-cookie";
import Router from "next/router";
import { useState } from "react";
import apiUserController from "../api/apiUserController";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import QrCard from "../components/QrCard/QrCard";
import QrWaitingRoom from "../components/QrWaitingRoom/QrWaitingRoom";
import { API_USER_URL, LOGIN_COOKIE } from '../constants/ index';
import { API_ROUTES } from '../enums';
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const Qr: NextPageWithLayout<GralProps> = ({ linkedWhatsapp }) => {

  // Este "0" hard codeado es para ocultar la cola de espera, el 0 hace referencia a la cantidad de personas en la cola.
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


  return (
    <section>
      <div style={{ 'position': 'absolute', 'top': '5%', 'right': ' 5%' }}>
        <button
          onClick={handleLogout}
          style={logoutBtnStyle}
        >LOG OUT</button>
      </div>
      {queue == 0 ? (
        <MainCont width={40}>
          <QrCard linked_whatsapp={linkedWhatsapp} />
        </MainCont>
      ) :
        <QrWaitingRoom queue={queue} />
      }
    </section>
  );
};

Qr.getInitialProps = async (context) => {
  if (context.req?.headers.cookie) {
    const cookies = cookie.parse(context.req.headers.cookie);
    const { access_token: accessToken } = JSON.parse(cookies[LOGIN_COOKIE || '']);

    const apiResponse = await fetch(
      `${API_USER_URL}${API_ROUTES.WS}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      }
    );
    const { data } = await apiResponse.json();

    if (data?.connected_whatsapp) {
      return { linkedWhatsapp: data.connected_whatsapp == 1 };
    }
  }

  return { linkedWhatsapp: false };
};

Qr.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

export default Qr;