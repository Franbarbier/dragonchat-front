import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import SignUpView from "../components/SignUpView/SignUpView";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const Login : NextPageWithLayout<GralProps> = (GralProps) => {
    return (
        <section>
            <MainCont width={90} maxWidth={400}>
                <SignUpView />
            </MainCont>
        </section>
    );
};


export default Login;

Login.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };