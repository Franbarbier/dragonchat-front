import { useState } from "react";
import CardTitle from "../cards/CardTitle/CardTitle";
import InputGral from "../InputGral/InputGral";
import OrangeBtn from "../OrangeBtn/OrangeBtn";
import styles from "./RecoverPasswordView.module.css";

export interface IRecoverPasswordView {}

const RecoverPasswordView: React.FC<IRecoverPasswordView> = ({}) => {
  const [email, setEmail] = useState("");

  async function handleRecoverPassword() {
    console.log("hola");
  }

  return (
    <div className={styles.recover_password_cont}>
      <div>
        <CardTitle text="Recuperar Contraseña" />
        <span>Ingresa el e-mail con el que te registraste</span>
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
