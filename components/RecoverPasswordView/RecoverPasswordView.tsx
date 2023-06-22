import Link from 'next/link';
import Router, { useRouter } from "next/router";

import { useEffect, useState } from "react";
import apiUserController from "../../api/apiUserController";
import CardTitle from "../cards/CardTitle/CardTitle";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import InputGral from "../InputGral/InputGral";
import styles from "./RecoverPasswordView.module.css";

export interface IRecoverPasswordView {}

const RecoverPasswordView: React.FC<IRecoverPasswordView> = ({}) => {
  const [email, setEmail] = useState("");
  const [existingUser, setExistingUser] = useState(true);

  const router = useRouter();

  async function handleRecoverPassword(e) {
    e.preventDefault();
    await apiUserController.passwordRecoverSendEmail(email, setExistingUser);
  }

  useEffect(() => {
    Router.prefetch('/new_password');
  }, [])

  function returnToLogin() {
    router.push("/login");
  }
  

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

            <CustomColorBtn
                  type="submit"
                  text="Guardar secuencia"
                  backgroundColorInit="#c21c3b"
                  backgroundColorEnd="#f9bd4f"
                  borderColor="#e17846"
                  onClick={()=>{ handleRecoverPassword }}
                  disable={ false }
              />
              <Link href="/login">
                <button className={styles.login}>VOLVER AL LOGIN</button>
              </Link>
        </form>
      </div>
    </div>
  );
};

export default RecoverPasswordView;
