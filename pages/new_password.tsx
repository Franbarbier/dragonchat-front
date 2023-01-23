import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import NewPasswordView from "../components/NewPasswordView/NewPasswordView";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const NewPassword : NextPageWithLayout<GralProps> = (GralProps) => {
    return (
        <section>
            <MainCont width={90} maxWidth={340}>
                <NewPasswordView />
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