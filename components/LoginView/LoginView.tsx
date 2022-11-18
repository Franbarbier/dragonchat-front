import CardTitle from '../CardTitle/CardTitle';
import InputGral from '../InputGral/InputGral';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import styles from './LoginView.module.css';

export interface ILoginView {

}



// interface contactosArr extends Array<ContactInfo>{}

const LoginView: React.FC<ILoginView> = ({  }) => {

  
   
    return (
        <div className={styles.login_cont} >
            <div>
                <CardTitle text="Ingresa al futuro" />
                <div>
                    <InputGral placeholder='E-mail' type="email" />
                    <InputGral placeholder='Contraseña' type="password"/>
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
                    <OrangeBtn text="Iniciar sesión" onClick={ ()=>{} }/>
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

            </div>
        </div>
    
    );
}

export default LoginView;