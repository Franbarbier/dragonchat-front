import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import QrCard from "../components/QrCard/QrCard";
import { NextPageWithLayout } from "./page";

const Qr : NextPageWithLayout = () => {

    
    const url = 'https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png'
    

    return (
        <section>
            <MainCont width={40}>
                <QrCard qr_url={url} />
            </MainCont>
        </section>
    );
};


export default Qr;

Qr.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };