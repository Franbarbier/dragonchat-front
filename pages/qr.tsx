import Cookies from "js-cookie";
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
      <MainCont width={40}>
        {/* <Header /> */}
        <QrCard qr_url={url} linked_whatsapp={linkedWhatsapp} />
      </MainCont>
    </section>
  );
};

// Qr.getInitialProps = async (context) => {
//   const req = context.req;

//   //   ~ codigo para testear ~

//   if (req) {
//     const headers = new Headers({
//       "Content-Type": "application/json",
//     });

//     console.log("asdf!", Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME))
//     const cookies = new Cookies(req.headers.cookie);
//     const accessToken = cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || "").access_token;
//     headers.append("Authorization", `Bearer ${accessToken}`);
//     const apiResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_API_USER_URL}/ws`,
//       { headers }
//     );
//     const data = await apiResponse.json();
//     return { linkedWhatsapp: data.data.connected_whatsapp == 1 };
//   }
//   return { linkedWhatsapp: false };
// };

Qr.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

export default Qr;