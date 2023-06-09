import Cookies from "js-cookie";
import Router from "next/router";
import { useState } from "react";
import apiUserController from "../api/apiUserController";
import MainCont from "../components/MainCont/MainCont";
import QrCard from "../components/QrCard/QrCard";
import QrWaitingRoom from "../components/QrWaitingRoom/QrWaitingRoom";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { GralProps } from "./_app";
import { NextPageWithLayout } from "./page";

const Qr: NextPageWithLayout<GralProps> = ({ linkedWhatsapp }) => {

  const url = 'https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png';

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
          <QrCard qr_url={url} linked_whatsapp={linkedWhatsapp} />
        </MainCont>
      ) :
        <QrWaitingRoom queue={queue} />
      }
    </section>
  );
};

Qr.getInitialProps = async (context) => {
  const req = context.req;

  if (req) {
    console.log("asdf", req.headers.cookie);
    // const cookies = new Cookies(req.headers.cookie);
    const accessToken = Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || "").access_token;

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_USER_URL}/ws`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      }
    );
    const { data } = await apiResponse.json();
    console.log("asdf", data.connected_whatsapp);
    return { linkedWhatsapp: data.connected_whatsapp == 1 };
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