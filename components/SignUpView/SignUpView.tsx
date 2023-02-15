import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import apiUserController from '../../services/apiUserController';
import CardTitle from '../cards/CardTitle/CardTitle';
import InputGral from '../InputGral/InputGral';
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

    async function handleCrearCuenta() {
        if (equalPass) {
            if( name != "" && email != "" && pass != "" && confirmPass != "" ){
                await apiUserController.signUp(name, email, pass, confirmPass, setUserExists);
            }else{
                alert('Asegurate de completar todos los campos!')
            }
        }else{
            alert('Las contraseñas no coinciden!')
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

                <div>
                    <button className={styles.googleInit}>
                        <img src="/buscar.png" width="18px" alt="find-image"/>
                        <span>Continuar con Google</span>
                    </button>
                </div>
                
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