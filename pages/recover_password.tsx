import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import RecoverPasswordView from "../components/RecoverPasswordView/RecoverPasswordView";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const RecoverPassword : NextPageWithLayout<GralProps> = (GralProps) => {
    return (
        <section>
            <MainCont width={40} >
                <RecoverPasswordView />
            </MainCont>
        </section>
    );
};


export default RecoverPassword;

RecoverPassword.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };