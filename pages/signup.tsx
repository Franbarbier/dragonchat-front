import Cookies from "cookies";
import { useState } from "react";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import ModalContainer from "../components/ModalContainer/ModalContainer";
import Notification, { INotification } from "../components/Notification/Notification";
import SignUpView from "../components/SignUpView/SignUpView";
import { STRIPE_COOKIE } from "../constants/index";
import { STATUS } from "../enums";
import { decrypt } from "../utils/crypto";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

// TODO: Solo recibe stripe_data, no debería ser GralProps sino SignUpProps
const SignUp: NextPageWithLayout<GralProps> = (GralProps) => {
    const [notification, setNotification] = useState<INotification>({
        status: STATUS.SUCCESS,
        render: false,
        message: "",
        modalReturn: () => { }
    })
    const [ cantSignUpModal, setCantSignUpModal ] = useState(false)


    return (
        <section>
            <Notification status={notification.status} render={notification.render} message={notification.message} modalReturn={notification.modalReturn} />

            <MainCont width={90} maxWidth={400}>
                <SignUpView setCantSignUpModal={setCantSignUpModal} stripe_data={GralProps} setNotification={setNotification} notification={notification} />
            </MainCont>
            
            {cantSignUpModal &&
                <ModalContainer closeModal={()=>{setCantSignUpModal(false)}} >
                    <>
                        <h3>Por el momento llegamos a la capacidad maxina de usuarios!</h3>
                        <h6>No estamos aceptando registros nuevos por el momento</h6>
                        <p>Si queres dejanos tu email para enterarte cuando abramos nuevamente mas vacantes para usar el Dragon Chat!</p>
                        <input type="text" placeholder="Email" />
                        <button>Enviar</button>
                    </>
                </ModalContainer>
            }
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

    return { props: { stripe_data: cookieStr ? decrypt(JSON.parse(cookieStr)) : null } };
}
