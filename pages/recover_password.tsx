import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import RecoverPasswordView from "../components/RecoverPasswordView/RecoverPasswordView";
import useDeviceType from "../utils/checkDevice";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const NewPassword : NextPageWithLayout<GralProps> = (GralProps) => {
    const isMobile = useDeviceType();

    return (
        <section>
            <MainCont width={isMobile ? 90 : 30}>
                <RecoverPasswordView />
            </MainCont>
        </section>
    );
};


export default NewPassword;

NewPassword.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };