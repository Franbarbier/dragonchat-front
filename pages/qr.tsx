import Config from "../components/Config/Config";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import QrCard from "../components/QrCard/QrCard";
import withSession from "../lib/session";
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

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const accessToken = user.access_token;
  headers.append("Authorization", `Bearer ${accessToken}`);
  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_USER_URL}/ws`,
    { headers }
  );
  const data = await apiResponse.json();

  return {
    props: { linkedWhatsapp: data.data.connected_whatsapp == 1 },
  };
});

Qr.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };

export default Qr;