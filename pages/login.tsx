import { useState } from "react";
import LoginView from "../components/LoginView/LoginView";
import MainCont from "../components/MainCont/MainCont";
import Notification, { INotification } from "../components/Notification/Notification";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { STATUS } from "../enums";
import handleStripeSession from "../utils/checkout";
import { GralProps } from "./_app";
import { NextPageWithLayout } from "./page";

const Login: NextPageWithLayout<GralProps> = (GralProps) => {

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

export async function getServerSideProps({ query: { session_id } }) {
    if (session_id) {
        handleStripeSession(session_id)
    }

    return { props: {} };
}