import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import LoginView from "../components/LoginView/LoginView";
import MainCont from "../components/MainCont/MainCont";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const Login : NextPageWithLayout<GralProps> = (GralProps) => {
    return (
        <section>
            <MainCont width={40} >
                <LoginView />
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