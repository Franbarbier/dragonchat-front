import { getCookie, deleteCookie } from "cookies-next";
import Router from "next/router";
import apiUserController from "../api/apiUserController";
import MainCont from "../components/MainCont/MainCont";
import QrCard from "../components/QrCard/QrCard";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { GralProps } from "./_app";
import { NextPageWithLayout } from "./page";

const Qr: NextPageWithLayout<GralProps> = ({ linkedWhatsapp }) => {

  const url = 'https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png';

  const logoutBtnStyle = {
    'width': '100%',
    'padding': '8px 16px',
    'borderRadius': '5px',
    'backgroundColor': '#7561ca57',
    'border': '1px solid var(--rosita2)',
    'color': 'var(--rosita2)',
    'cursor': 'pointer',
    'letterSpacing': '1px',
  }

  async function handleLogout() {
    try {
      const accessToken = JSON.parse(String(getCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || '') || '{}')).access_token;
      const response = await apiUserController.logout(accessToken);
      if (response.status == 200) {
        deleteCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || '');
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
      <MainCont width={40}>
        <QrCard qr_url={url} linked_whatsapp={linkedWhatsapp} />
      </MainCont>
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