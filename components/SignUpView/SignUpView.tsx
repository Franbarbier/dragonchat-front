import Cookies from 'js-cookie';
import Router from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import apiUserController from '../../api/apiUserController';
import { LOGIN_COOKIE } from '../../constants/index';
import { STATUS } from '../../enums';
import { mailIsValid } from '../../utils/validators';
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
    const [formData, setFormData] = useState({ name: '', mail: '', pass: '', confirmPass: '', code: '', number: '' });
    const [userExists, setUserExists] = useState(false);
    const [loading, setLoading] = useState(false);

    const formIsValid = useMemo(() => (
        formData.name != "" &&
        formData.mail != "" &&
        formData.pass != "" &&
        formData.confirmPass != "" &&
        formData.number != ""
    ), [formData]);

    const equalPass = useMemo(() => (
        formData.pass !== '' && formData.confirmPass !== '' ? formData.confirmPass === formData.pass : true
    ), [formData.pass, formData.confirmPass]);

    useEffect(() => {
        setLoading(false)
    }, [userExists]);

    useEffect(() => {
        Router.prefetch("/login");
    }, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                // Trigger sign-up function when Enter key is pressed
                handleCrearCuenta();
            }
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    });

    const handleLogin = async (loginMail, loginPass) => {
        const login_status = await apiUserController.login(loginMail, loginPass);

        if (login_status?.status == 200 || login_status?.status == 201) {
            const login_storage = {
                access_token: login_status?.data.access_token,
                user_id: login_status?.data.user_id
            }

            Cookies.set(LOGIN_COOKIE, JSON.stringify(login_storage), { sameSite: 'strict' });
            Router.push("/dash")
        }
    };

    const handleNotification = useCallback((status: STATUS, message: string) => {
        setNotification({
            status,
            render: true,
            message,
            modalReturn: () => { setNotification({ ...notification, render: false }) }
        })
    }, [setNotification]);

    const handleCrearCuenta = async () => {
        setLoading(true)

        if (!equalPass) {
            handleNotification(STATUS.ERROR, "Las contraseñas no coinciden!");
            setLoading(false);
            return false;
        }

        if (!formIsValid) {
            handleNotification(STATUS.ERROR, "Asegurate de completar todos los campos!");
            setLoading(false);
            return false;
        }

        if (!mailIsValid(formData.mail)) {
            handleNotification(STATUS.ERROR, "El mail ingresado no es valido.");
            setLoading(false);
            return false;
        }

        if (formData.pass.length < 8) {
            handleNotification(STATUS.ERROR, "La contraseña debe tener al menos 8 caracteres.");
            setLoading(false);
            return false;
        }

        const signUp_res = await apiUserController.signUp(formData, setUserExists, stripe_data);

        if (signUp_res?.status == 200 || signUp_res?.status == 201) {
            handleNotification(STATUS.SUCCESS, "Usuario creado con exito!");
            handleLogin(formData.mail, formData.pass);
        }
    };

    const handleFormChange = useCallback((field: 'name' | 'mail' | 'pass' | 'confirmPass', value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [setFormData]);

    return (
        <>
            <Loader loading={loading} />

            <form className={styles.signup_cont} autoComplete='off'>
                <CardTitle text="Registrarse" />

                <InputGral
                    placeholder='Nombre'
                    type="text"
                    value={formData.name}
                    onChange={(value) => handleFormChange('name', value)}
                    classes={['error']}
                />
                <InputGral
                    placeholder='E-mail'
                    type="email"
                    value={formData.mail}
                    onChange={(value) => handleFormChange('mail', value)}
                />
                <CountryCodeFlagSelector
                    phone={{ code: formData.code, number: formData.number }}
                    setPhone={setFormData}
                />
                <InputGral
                    placeholder='Contraseña'
                    type="password"
                    value={formData.pass}
                    onChange={(value) => handleFormChange('pass', value)}
                />
                <InputGral
                    placeholder='Repetir contraseña'
                    type="password"
                    value={formData.confirmPass}
                    onChange={(value) => handleFormChange('confirmPass', value)}
                />

                {!equalPass && <p className={styles.alert}>{"Las contraseñas no coinciden :("}</p>}
                {userExists && <p className={styles.alert}>{"Ya existe un usuario registrado con ese email."}</p>}

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
            </form>
        </>
    );
}

export default SignUpView;

