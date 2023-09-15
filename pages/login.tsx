<<<<<<< HEAD
import { useEffect, useState } from "react";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
=======
import { useState } from "react";
>>>>>>> develop
import LoginView from "../components/LoginView/LoginView";
import MainCont from "../components/MainCont/MainCont";
import Notification, { INotification } from "../components/Notification/Notification";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { STATUS } from "../enums";
<<<<<<< HEAD
import { handleStripeSession } from "../utils/checkout";
import { NextPageWithLayout } from "./page";
=======
import handleStripeSession from "../utils/checkout";
>>>>>>> develop
import { GralProps } from "./_app";
import { NextPageWithLayout } from "./page";

<<<<<<< HEAD
import Cookies from 'js-cookie';
import Router from "next/router";
import { LOGIN_COOKIE, STRIPE_COOKIE } from "../constants/index";


=======
>>>>>>> develop
const Login: NextPageWithLayout<GralProps> = (GralProps) => {

    const [notification, setNotification] = useState<INotification>({
        status: STATUS.SUCCESS,
        render: false,
        message: "",
        modalReturn: () => { }
    })

    useEffect(()=>{

        if ( GralProps.session_data != "") {
            // aca @nico estaria bueno encodear la cookie
            Cookies.set(
                STRIPE_COOKIE,
                JSON.stringify(GralProps.session_data),
                {
                    sameSite: 'strict'
                }
            );
        }

        // Si ya esta logeado se redirige al dash. Esto deberia estar en el middleware pero hay que setear la cookie con el parametro antes. Y el middleware todavia no hace eso :/
        if ( Cookies.get(LOGIN_COOKIE) ) { Router.push("/dash") }

    },[])


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

export async function getServerSideProps({ query: { session_id } }) {
<<<<<<< HEAD

    let session_data = "";

    if (session_id) {
        handleStripeSession(session_id)
        session_data = await handleStripeSession(session_id) as string
    }

    return { props: { session_data } };
=======
    if (session_id) {
        handleStripeSession(session_id)
    }

    return { props: {} };
>>>>>>> develop
}