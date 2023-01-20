import Router from "next/router";
import { useEffect, useState } from "react";
import CardTitle from "../cards/CardTitle/CardTitle";
import InputGral from "../InputGral/InputGral";
import OrangeBtn from "../OrangeBtn/OrangeBtn";
import styles from "./RecoverPasswordView.module.css";

export interface IRecoverPasswordView {}

const RecoverPasswordView: React.FC<IRecoverPasswordView> = ({}) => {
  const [email, setEmail] = useState("");

  async function handleRecoverPassword() {
    // hit user api to send the user email with OTP and redirect to new_password page
    
    Router.push('/new_password');
  }

  useEffect(() => {
    Router.prefetch('/new_password');
  }, [])
  

  return (
    <div className={styles.recover_password_cont}>
      <div>
        <CardTitle text="Recuperar Contraseña" />
        <div className={styles.recover_password_span}>
          <span>Ingresa el e-mail con el que te registraste para que te enviemos un código de recuperación.</span>
        </div>
        <div>
          <InputGral
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
          />
        </div>

        <OrangeBtn text="Continuar" onClick={handleRecoverPassword} />
      </div>
    </div>
  );
};

export default RecoverPasswordView;
