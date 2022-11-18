import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import SignUpView from "../components/SignUpView/SignUpView";
import { NextPageWithLayout } from "./page";

const Login : NextPageWithLayout = () => {
    return (
        <section>
            <MainCont width={40} >
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