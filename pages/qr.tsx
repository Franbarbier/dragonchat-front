import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import QrCard, { IQrCard } from "../components/QrCard/QrCard";
import { NextPageWithLayout } from "./page";

const Qr : NextPageWithLayout = () => {

    const qrProps:IQrCard = {
        qr : 'https://qrcg-free-editor.qr-code-generator.com/main/assets/images/websiteQRCode_noFrame.png'
    }

    return (
        <section>
            <MainCont width={40}>
                <QrCard qr={qrProps} />
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