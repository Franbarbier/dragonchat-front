import Cookies from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import apiUserController from '../../api/apiUserController';
import { LOGIN_COOKIE } from '../../constants/index';
import { STATUS } from '../../enums';
import CountryCodeFlagSelector from '../CountryCodeFlagSelector/CountryCodeFlagSelector';
import InputGral from '../InputGral/InputGral';
import Loader from '../Loader/Loader';
import { INotification } from '../Notification/Notification';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import CardTitle from '../cards/CardTitle/CardTitle';
import styles from './SignUpView.module.css';

export interface ISignUpView {
    stripe_data: Object | null,
    setNotification: (notification: INotification) => void,
    notification: INotification
}

const SignUpView: React.FC<ISignUpView> = ({ stripe_data, setNotification, notification }) => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [phone, setPhone] = useState({code: '', number: ''});
    const [equalPass, setEqualPass] = useState(true);
    const [userExists, setUserExists] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false)
    }, [userExists]);

    useEffect(() => {
        Router.prefetch("/login");
    }, []);

    async function handleLogin(loginMail, loginPass) {
        const login_status = await apiUserController.login(loginMail, loginPass);
        if (login_status?.status == 200 || login_status?.status == 201) {
            const login_storage = {
                access_token: login_status?.data.access_token,
                user_id: login_status?.data.user_id
            }
            Cookies.set(
                LOGIN_COOKIE,
                JSON.stringify(login_storage), // secure flag option must be added in the future
                {
                    sameSite: 'strict'
                }
            );
            Router.push("/dash")
        }
    }

    async function handleCrearCuenta() {
        setLoading(true)

        if (equalPass) {
            if (name != "" && mail != "" && pass != "" && confirmPass != "") {

                if (!validateEmail(mail)) {
                    setNotification({
                        status: STATUS.ERROR,
                        render: true,
                        message: "El mail ingresado no es valido.",
                        modalReturn: () => { setNotification({ ...notification, render: false }) }
                    })
                    setLoading(false)
                    return false;
                }
                if (pass.length < 8) {
                    setNotification({
                        status: STATUS.ERROR,
                        render: true,
                        message: "La contraseña debe tener al menos 8 caracteres.",
                        modalReturn: () => { setNotification({ ...notification, render: false }) }
                    })
                    setLoading(false)
                    return false;
                }


                const onSuccess = () => {
                    if (signUp_res?.status == 200 || signUp_res?.status == 201) {
                        setNotification({
                            status: STATUS.SUCCESS,
                            render: true,
                            message: "Usuario creado con exito!",
                            modalReturn: () => { setNotification({ ...notification, render: false }) }
                        })
                        handleLogin(mail, pass)
                    }
                }

                const signUp_res = await apiUserController.signUp(name, mail, pass, confirmPass, setUserExists, stripe_data);
                onSuccess()
            } else {
                setNotification({
                    status: STATUS.ERROR,
                    render: true,
                    message: "Asegurate de completar todos los campos!",
                    modalReturn: () => { setNotification({ ...notification, render: false }) }
                })
            }
        } else {
            setNotification({
                status: STATUS.ERROR,
                render: true,
                message: "Las contraseñas no coinciden!",
                modalReturn: () => { setNotification({ ...notification, render: false }) }
            })
        }
    }



    useEffect(() => {
        if (confirmPass != '' && confirmPass != pass) {
            setEqualPass(false)
        } else {
            setEqualPass(true)
        }

    }, [confirmPass, pass])


    const validateEmail = (email) => {
        // Regular expression to validate email addresses
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Trigger sign-up function when Enter key is pressed
            handleCrearCuenta();
        }
    };

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    });

    return (
        <>
            <Loader loading={loading} />

            <div className={styles.signup_cont} >
                <div>
                    <CardTitle text="Registrarse" />

                    <h6>Registrarte con tu email</h6>
                    <InputGral placeholder='Nombre' type="text" value={name} onChange={setName} classes={['error']} />
                    <InputGral placeholder='E-mail' type="email" value={mail} onChange={setMail} />
                    <CountryCodeFlagSelector phone={phone} setPhone={setPhone} />
                    <InputGral placeholder='Contraseña' type="password" value={pass} onChange={setPass} />
                    <InputGral placeholder='Repetir contraseña' type="password" value={confirmPass} onChange={setConfirmPass} />
                    {!equalPass && (
                        <p className={styles.alert}>{"Las contraseñas no coinciden :("}</p>
                    )}
                    {userExists && (
                        <p className={styles.alert}>{"Ya existe un usuario registrado con ese email."}</p>
                    )}

                    <OrangeBtn text="Crear cuenta" onClick={handleCrearCuenta} />

                    <div className={styles.hasAccount}>
                        <hr />

                        <div>
                            <span>Ya tienes una cuenta?</span>
                            <button>
                                <span onClick={() => Router.push('/login')}>Iniciar sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpView;

