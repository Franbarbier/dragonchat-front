import Cookies from 'cookies';
import { useState } from "react";
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import LoginView from "../components/LoginView/LoginView";
import MainCont from "../components/MainCont/MainCont";
import Notification, { INotification } from "../components/Notification/Notification";
import { STRIPE_COOKIE } from '../constants/index';
import { STATUS } from "../enums";
import { handleStripeSession } from "../utils/checkout";
import { encrypt } from '../utils/crypto';
import { NextPageWithLayout } from "./page";

const Login: NextPageWithLayout<{}> = () => {
    const [notification, setNotification] = useState<INotification>({
        status: STATUS.SUCCESS,
        render: false,
        message: "",
        modalReturn: () => { }
    })

    return (
        <section>
            <Notification {...notification} />

            <MainCont width={90} maxWidth={400}>
                <LoginView notification={notification} setNotification={setNotification} />
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

export async function getServerSideProps({ req, res, query: { session_id } }) {
    if (session_id) {
        const cookies = new Cookies(req, res)
        const sessionData = await handleStripeSession(session_id)
        cookies.set(STRIPE_COOKIE, JSON.stringify(encrypt(sessionData)))
        
       // Remove the session_id query parameter from the URL
       const currentUrl = req.url;
       const updatedUrl = currentUrl.replace(/(\?|&)session_id=[^&]*/g, '');
       res.setHeader('Location', updatedUrl);
       res.statusCode = 302;
       res.end();


        const cookieStr = cookies.get(STRIPE_COOKIE)
    }
 
    
    return { props: {} };
}