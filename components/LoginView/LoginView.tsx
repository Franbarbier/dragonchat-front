
import { setCookie } from "cookies-next";
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import apiUserController from '../../api/apiUserController';
import InputGral from '../InputGral/InputGral';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import CardTitle from '../cards/CardTitle/CardTitle';
import styles from './LoginView.module.css';

export interface ILoginView {

}

const LoginView: React.FC<ILoginView> = ({ }) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const [logging, setLogging] = useState<boolean>(false)

    async function handleLogin(e) {
        e.preventDefault()
        setLogging(true)
        if (email != "" && pass != "") {
            const login_status = await apiUserController.login(email, pass)

            if (login_status?.status == 200) {
                setCookie(
                    process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || '',
                    JSON.stringify({
                        access_token: login_status?.data.access_token,
                        user_id: login_status?.data.user_id
                    }),
                    {
                        sameSite: 'strict'
                    }
                );

                Router.push("/dash")
            } else {
                setLogging(false)
                alert('Los datos son incorrectos.')
            }
        } else {
            alert('Los datos estan incompletos')
        }
    }

    useEffect(() => {
        // Prefetch the dashboard page
        Router.prefetch('/dash');
    }, [])

    return (
        <div className={styles.login_cont} >
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
                    <OrangeBtn type="submit" text={logging ? "Verificando datos" : "Iniciar sesión"} onClick={handleLogin} />
                    <button className={styles.googleInit} type='button'>
                        <img src="/buscar.png" width="18px" alt="find-image" />
                        <span>Iniciar sesión con Google</span>
                    </button>
                </div>

                <div className={styles.noAccount}>
                    <hr />

                    <div>
                        <span>No tienes una cuenta?</span>
                        <button type='button'>
                            <Link href='/signup'>Regístrate</Link>
                        </button>
                    </div>
                </div>

            </form>
        </div>

    );
}

export default LoginView;