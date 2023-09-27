import { useState } from "react";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import LoginView from "../components/LoginView/LoginView";
import MainCont from "../components/MainCont/MainCont";
import Notification, { INotification } from "../components/Notification/Notification";
import { STATUS } from "../enums";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";



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

export async function getServerSideProps({ }) {

    let session_data = "";


    return {  };
}