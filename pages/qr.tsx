import Cookies from "universal-cookie";
import Config from "../components/Config/Config";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import QrCard from "../components/QrCard/QrCard";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const Qr : NextPageWithLayout<GralProps> = ({linkedWhatsapp}) => {
    
    const url = 'https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png';

    return (
        <section>
            <MainCont width={40}>
                <QrCard qr_url={url} linked_whatsapp={linkedWhatsapp}/>
            </MainCont>
            <Config linked_whatsapp={linkedWhatsapp}/>
        </section>
    );
};

Qr.getInitialProps = async (context) => {
  const req = context.req;
  if (req) {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const cookies = new Cookies(req.headers.cookie);
    const accessToken = cookies.get("dragonchat_login").access_token;
    headers.append("Authorization", `Bearer ${accessToken}`);
    const apiResponse = await fetch(
      "http://api-user.dragonchat.io/api/v1/ws",
      { headers }
    );
    const data = await apiResponse.json();
    return { linkedWhatsapp: data.data.connected_whatsapp == 1};
  }
  return { linkedWhatsapp: false};
};

Qr.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };

export default Qr;