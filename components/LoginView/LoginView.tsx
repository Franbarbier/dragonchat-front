
import Cookies from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import apiUserController from '../../api/apiUserController';
import { LOGIN_COOKIE, MAINTENANCE } from '../../constants/index';
import { ROUTES, STATUS } from '../../enums';
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

                if (login_status?.status == 200 || login_status?.status == 201) {

                    const login_storage = {
                        access_token: login_status?.data.access_token, // TODO think about ecnrypting this acces_token or the hole cookie
                        user_id: login_status?.data.user_id
                    }

                    Cookies.set(
                        LOGIN_COOKIE,
                        JSON.stringify(login_storage), // secure flag option must be added in the future
                        {
                            sameSite: 'strict'
                        }
                    );

                    window.location.href = ROUTES.DASH

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

    useEffect(() => { Router.prefetch('/dash'); }, [])

    return (
        <>
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
                            text={!logging ? "INICIAR SESIÓN" : "INICIANDO SESIÓN"}
                            backgroundColorInit="#c21c3b"
                            backgroundColorEnd="#f9bd4f"
                            borderColor="#e17846"
                            onClick={(e) => {
                                e.preventDefault()
                                handleLogin()
                            }}
                            disable={ logging }
                        />
                    </div>

                    <div className={styles.noAccount}>
                        <hr />

                        <div>
                            <span>{"No tienes una cuenta?"}</span>
                            <button type='button'>
                                <span onClick={() => !MAINTENANCE && Router.push('/signup')}>
                                    {"Regístrate"}
                                </span>
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}

export default LoginView;