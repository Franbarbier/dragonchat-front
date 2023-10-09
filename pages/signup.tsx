import Cookies from "cookies";
import { useState } from "react";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import Notification, { INotification } from "../components/Notification/Notification";
import SignUpView from "../components/SignUpView/SignUpView";
import { STRIPE_COOKIE } from "../constants/index";
import { STATUS } from "../enums";
import { decrypt } from "../utils/crypto";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const SignUp : NextPageWithLayout<GralProps> = (GralProps) => {
    const [notification, setNotification] = useState<INotification>({
        status : STATUS.SUCCESS,
        render : false,
        message : "",
        modalReturn : ()=>{}
    })
    return (
        <section>
            <Notification status={notification.status} render={notification.render} message={notification.message} modalReturn={notification.modalReturn}  />

            <MainCont width={90} maxWidth={400}>
                <SignUpView stripe_data={GralProps} setNotification={setNotification} notification={notification} />
            </MainCont>
        </section>
    );
};


export default SignUp;

SignUp.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };

  export async function getServerSideProps({ req, res }) {
    
    const cookies = new Cookies(req, res);
    var cookieStr = undefined
    if (cookies.get(STRIPE_COOKIE)) {
        cookieStr = cookies.get(STRIPE_COOKIE)   
    }

    return { props: { stripe_data : cookieStr ? decrypt( JSON.parse(cookieStr) ) : null } };
}