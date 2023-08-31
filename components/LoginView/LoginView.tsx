
import Cookies from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import apiUserController from '../../api/apiUserController';
import { STATUS } from '../../enums';
import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import InputGral from '../InputGral/InputGral';
import Loader from '../Loader/Loader';
import { INotification } from '../Notification/Notification';
import CardTitle from '../cards/CardTitle/CardTitle';
import styles from './LoginView.module.css';


export interface ILoginView {
    notification: INotification,
    setNotification: (notification: INotification) => void,
}



// interface contactosArr extends Array<ContactInfo>{}

const LoginView: React.FC<ILoginView> = ({ setNotification, notification }) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')



    const [logging, setLogging] = useState<boolean>(false)

    async function handleLogin() {
        setLogging(true)
        if (email != "" && pass != "") {

            const onSuccess = () => {
                if (login_status?.status == 200) {

                    const login_storage = {
                        access_token: login_status?.data.access_token, // TODO think about ecnrypting this acces_token or the hole cookie
                        user_id: login_status?.data.user_id
                    }

                    Cookies.set(
                        process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME,
                        JSON.stringify(login_storage), // secure flag option must be added in the future
                        {
                            sameSite: 'strict'
                        }
                    );

                    Router.push("/dash")

                } else {
                    setLogging(false)
                    setNotification({
                        status: STATUS.ERROR,
                        render: true,
                        message: "Los datos son incorrectos.",
                        modalReturn: () => {
                            setNotification({ ...notification, render: false })
                        }
                    })
                }
            }
            const login_status = await apiUserController.login(email, pass)
            onSuccess()


        } else {
            setLogging(false)
            setNotification({
                status: STATUS.ERROR,
                render: true,
                message: "Los datos estan incompletos.",
                modalReturn: () => {
                    setNotification({ ...notification, render: false })
                }
            })

        }
    }

    useEffect(() => {
        // Prefetch the dashboard page
        Router.prefetch('/dash');
    }, [])



    return (
        <div className={styles.login_cont} >
            <Loader loading={logging} />
            <form>
                <CardTitle text="Ingresa al futuro" />
                <div>
                    <InputGral placeholder='E-mail' type="email" value={email} onChange={setEmail} />
                    <InputGral placeholder='Contraseña' type="password" value={pass} onChange={setPass} />
                </div>
                <div className={styles.login_options}>

                    <div className={styles.forget}>
                        <button type='button'>
                            <Link href='/recover_password'> Olvidé mi contraseña</Link>
                        </button>
                    </div>
                </div>

                <div>
                    <CustomColorBtn
                        type="submit"
                        text="INICIAR SESIÓN"
                        backgroundColorInit="#c21c3b"
                        backgroundColorEnd="#f9bd4f"
                        borderColor="#e17846"
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogin()
                        }}
                    />

                    {/* POC */}
                    <button id="checkout-and-portal-button" type="submit" onClick={async (e) => { e.preventDefault(); await apiUserController.poc(); }}>
                        Checkout
                    </button>
                    {/* <form action="/create-checkout-session" method="POST">
                        <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
                    </form> */}
                    {/* POC */}



                    {/* <button className={styles.googleInit} type='button'>
                        <img src="/buscar.png" width="18px" alt="find-image"/>
                        <span>Iniciar sesión con Google</span>
                    </button> */}
                </div>

                {/* Esto se esconde temporalmente hasta que se active el registre libre de usuarios */}
                {/* <div className={styles.noAccount}>
                    <hr />
                    
                    <div>
                        <span>No tienes una cuenta?</span>
                        <button type='button'>
                            <Link href='/signup'>Regístrate</Link>
                        </button>
                    </div>
                </div> */}

            </form>
        </div>
    );
}

export default LoginView;