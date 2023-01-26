
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import userServiceFactory from "../../clientServices/userService";
import useUser from '../../lib/useUser';
import CardTitle from '../cards/CardTitle/CardTitle';
import InputGral from '../InputGral/InputGral';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import styles from './LoginView.module.css';

const userService = userServiceFactory();
export interface ILoginView {

}
// interface contactosArr extends Array<ContactInfo>{}

const LoginView: React.FC<ILoginView> = ({  }) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const { mutateUser } = useUser();

    async function handleLogin(e) {
        e.preventDefault()
        if (email != "" && pass != "") {

            try {
                mutateUser(
                    await userService.login(email, pass)
                );
                Router.push("/dash");
            } catch (error: any) {
                alert(error.response.data.error);
            }


        }else{
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
                    <InputGral placeholder='E-mail' type="email" value={email} onChange={ setEmail } />
                    <InputGral placeholder='Contraseña' type="password" value={pass} onChange={ setPass }/>
                </div>
                <div className={styles.login_options}>
                    
                    <div className={styles.forget}>
                       <button type='button'>
                            <Link href='/recover_password'> Olvidé mi contraseña</Link>
                        </button>
                    </div>
                </div>

                <div>
                    <OrangeBtn type="submit" text="Iniciar sesión" onClick={ handleLogin }/>
                    <button className={styles.googleInit} type='button'>
                        <img src="/buscar.png" width="18px" alt="find-image"/>
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