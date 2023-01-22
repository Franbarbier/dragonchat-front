import Router from "next/router";
import { useEffect, useState } from "react";
import apiUserController from "../../api/apiUserController";
import CardTitle from "../cards/CardTitle/CardTitle";
import InputGral from "../InputGral/InputGral";
import OrangeBtn from "../OrangeBtn/OrangeBtn";
import styles from "./RecoverPasswordView.module.css";

export interface IRecoverPasswordView {}

const RecoverPasswordView: React.FC<IRecoverPasswordView> = ({}) => {
  const [email, setEmail] = useState("");
  const [existingUser, setExistingUser] = useState(true);

  async function handleRecoverPassword(e) {
    e.preventDefault();
    await apiUserController.passwordRecoverSendEmail(email, setExistingUser);
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
        <form>
            <div>
              <InputGral
                placeholder="E-mail"
                type="email"
                value={email}
                onChange={setEmail}
              />
            </div>
            {!existingUser &&
                  <p className={styles.Alert}>El usuario no existe.</p>
            }

            <OrangeBtn type="submit" text="Continuar" onClick={handleRecoverPassword} />
        </form>
      </div>
    </div>
  );
};

export default RecoverPasswordView;
