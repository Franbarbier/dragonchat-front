import Cookies from "cookies";
import { useState } from "react";
import CustomColorBtn from "../components/CustomColorBtn/CustomColorBtn";
import MainCont from "../components/MainCont/MainCont";
import ModalContainer from "../components/ModalContainer/ModalContainer";
import Notification, { INotification } from "../components/Notification/Notification";
import SignUpView from "../components/SignUpView/SignUpView";
import styles from '../components/SignUpView/SignUpView.module.css';
import CardTitle from "../components/cards/CardTitle/CardTitle";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { STRIPE_COOKIE } from "../constants/index";
import { STATUS } from "../enums";
import { decrypt } from "../utils/crypto";
import { GralProps } from "./_app";
import { NextPageWithLayout } from "./page";

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
            <div className={styles.cantSignUpModal}>

                <ModalContainer closeModal={()=>{setCantSignUpModal(false)}} addedClass="width35">
                    <div>
                        <CardTitle text="No hay mas vacantes" />
                        <h4>Actualmente esta plataforma solo está disponible para los estudiantes de la <u>U Del Closer</u>.</h4>
                        <br />
                        <p>Si tienes mas dudas o quieres tener acceso a la plataforma puedes contactarte con nuestro soporte!</p>
                        <CustomColorBtn
                            type="submit"
                            text="QUIERO MI ACCESSO"
                            backgroundColorInit="#c21c3b"
                            backgroundColorEnd="#f9bd4f"
                            borderColor="#e17846"
                            onClick={ ()=>{ 
                                window.location.href = "https://api.whatsapp.com/send/?phone=573104719365&text=Hola%21+Me+contacto+desde+dragonchat+por+&type=phone_number&app_absent=0"
                            } }
                        />
                        
                    </div>
                </ModalContainer>
            </div>
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
