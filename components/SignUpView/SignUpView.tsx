import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import apiUserController from '../../api/apiUserController';
import { STATUS } from '../../enums';
import CardTitle from '../cards/CardTitle/CardTitle';
import InputGral from '../InputGral/InputGral';
import { INotification } from '../Notification/Notification';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import styles from './SignUpView.module.css';

export interface ISignUpView {

}



// interface contactosArr extends Array<ContactInfo>{}

const SignUpView: React.FC<ISignUpView> = ({  }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [equalPass, setEqualPass] = useState(true)
    const [userExists, setUserExists] = useState(false)

    const [notification, setNotification] = useState<INotification>({
        status : STATUS.SUCCESS,
        render : false,
        message : "",
        modalReturn : ()=>{}
    })


    function handleLogin(loginMail,loginPass ) {
       
            // Estaria bueno que te haga un auto-login despues de registrarte - Estoy con un error y me parece que es por timing asique lo redirijo al login

            // const login_status = await apiUserController.login(loginMail, loginPass);

            // if ( login_status?.status == 200 || login_status?.status == 201 ) {
            //     const login_storage = {
            //         access_token : login_status?.data.access_token, // TODO think about ecnrypting this acces_token or the hole cookie
            //         user_id : login_status?.data.user_id
            //     }

            //     Cookies.set(
            //         process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME,
            //         JSON.stringify(login_storage), // secure flag option must be added in the future
            //         {
            //         sameSite: 'strict'
            //         }
            //     );
            Router.push("/login")
            // }
}



    async function handleCrearCuenta() {
        if (equalPass) {
            if( name != "" && email != "" && pass != "" && confirmPass != "" ){

                
                const onSuccess = () => {
                    if (signUp_res?.status == 200 || signUp_res?.status == 201 ) {
                        setNotification({
                            status : STATUS.SUCCESS,
                            render : true,
                            message : "Usuario creado con exito!",
                            modalReturn : ()=>{setNotification({...notification, render : false })}
                        })

                        handleLogin(email, pass)
                                
                        }
                }
                const signUp_res = await apiUserController.signUp(name, email, pass, confirmPass, setUserExists);
                onSuccess()
            }else{
                setNotification({
                    status : STATUS.ERROR,
                    render : true,
                    message : "Asegurate de completar todos los campos!",
                    modalReturn : ()=>{setNotification({...notification, render : false })}
                })
            }
        }else{
            setNotification({
                status : STATUS.ERROR,
                render : true,
                message : "Las contraseñas no coinciden!",
                modalReturn : ()=>{setNotification({...notification, render : false })}
            })
        }
    }

    useEffect(() => {
        Router.prefetch("/login");
    })

    useEffect(()=>{
        if (confirmPass != '' && confirmPass != pass) {
            setEqualPass(false)
        }else{
            setEqualPass(true)
        }

    },[confirmPass])
    
    return (
        <div className={styles.signup_cont} >
            <div>
                <CardTitle text="Registrarse" />

                {/* <div>
                    <button className={styles.googleInit}>
                        <img src="/buscar.png" width="18px" alt="find-image"/>
                        <span>Continuar con Google</span>
                    </button>
                </div> */}
                
                <h6>Registrarte con tu email</h6>
                <div>
                    <InputGral placeholder='Nombre' type="text" value={name} onChange={ setName } classes={['error']} />
                    <InputGral placeholder='E-mail' type="email" value={email} onChange={ setEmail }/>
                    <InputGral placeholder='Contraseña' type="password" value={pass} onChange={ setPass }/>
                    <InputGral placeholder='Repetir contraseña' type="password" value={confirmPass} onChange={ setConfirmPass }/>
                    {!equalPass &&
                        <p className={styles.alert}>Las contraseñas no coinciden :(</p>
                    }
                    {userExists &&
                        <p className={styles.alert}>El usuario ya existe.</p>
                    }
                </div>

                <OrangeBtn text="Crear cuenta" onClick={ handleCrearCuenta }/>

                <div className={styles.hasAccount}>
                    <hr />
                    
                    <div>
                        <span>Ya tienes una cuenta?</span>
                        <button>
                            <Link href='/login'>Iniciar sesión</Link>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    
    );
}

export default SignUpView;