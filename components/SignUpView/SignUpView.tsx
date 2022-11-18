import CardTitle from '../CardTitle/CardTitle';
import InputGral from '../InputGral/InputGral';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import styles from './SignUpView.module.css';

export interface ISignUpView {

}



// interface contactosArr extends Array<ContactInfo>{}

const SignUpView: React.FC<ISignUpView> = ({  }) => {

  
   
    return (
        <div className={styles.signup_cont} >
            <div>
                <CardTitle text="Registrarse" />

                <div>
                    <button className={styles.googleInit}>
                        <img src="/buscar.png" width="18px" />
                        <span>Continuar con Google</span>
                    </button>
                </div>
                
                <h6>Registrarte con tu email</h6>
                <div>
                    <InputGral placeholder='E-mail' type="email" />
                    <InputGral placeholder='Contraseña' type="password"/>
                    <InputGral placeholder='Repetir contraseña' type="password"/>
                </div>

                <OrangeBtn text="Crear cuenta" onClick={ ()=>{} }/>

                <div className={styles.hasAccount}>
                    <hr />
                    
                    <div>
                        <span>Ya tienes una cuenta?</span><button>Iniciar sesión</button>
                    </div>
                </div>

            </div>
        </div>
    
    );
}

export default SignUpView;