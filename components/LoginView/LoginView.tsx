import Router from 'next/router';
import { useState } from 'react';
import { login } from '../../actions/users';
import CardTitle from '../cards/CardTitle/CardTitle';
import InputGral from '../InputGral/InputGral';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import styles from './LoginView.module.css';

export interface ILoginView {

}



// interface contactosArr extends Array<ContactInfo>{}

const LoginView: React.FC<ILoginView> = ({  }) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    async function handleLogin(e) {
        e.preventDefault()
        if (email != "" && pass != "") {
            
            const onSuccess = () => {
                if (login_status?.status == 200 ) {

                    const login_storage = {
                        status : 200,
                        access_token : login_status?.data.access_token,
                        user_id : login_status?.data.user_id,
                        wpp_connected : false
                    }

                    localStorage.setItem( "dragonchat_login" , JSON.stringify(login_storage))
                    Router.push('/')

                }else{
                    alert('Los datos son incorrectos.')
                }
            }
            const login_status = await login({email, password: pass})
            onSuccess()


        }else{
            alert('Los datos estan incompletos')
        }
    }

    
   
    return (
        <div className={styles.login_cont} >
            <form>
                <CardTitle text="Ingresa al futuro" />
                <div>
                    <InputGral placeholder='E-mail' type="email" value={email} onChange={ setEmail } />
                    <InputGral placeholder='Contraseña' type="password" value={pass} onChange={ setPass }/>
                </div>
                <div className={styles.login_options}>
                    <div className={styles.rememberMe}>
                        <div>
                            <div></div>
                        </div>
                        <span>Recordarme</span> 
                    </div>
                    <div className={styles.forget}>
                        <p>Olvidé mi contraseña</p>
                    </div>
                </div>

                <div>
                    <OrangeBtn text="Iniciar sesión" onClick={ handleLogin }/>
                    <button className={styles.googleInit}>
                        <img src="/buscar.png" width="18px" />
                        <span>Iniciar sesión con Google</span>
                    </button>
                </div>

                <div className={styles.noAccount}>
                    <hr />
                    
                    <div>
                        <span>No tienes una cuenta?</span><button>Regístrate</button>
                    </div>
                </div>

            </form>
        </div>
    
    );
}

export default LoginView;