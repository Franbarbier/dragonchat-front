import Link from 'next/link';
import Router from "next/router";
import { useEffect, useMemo, useState } from "react";
import apiUserController from "../../api/apiUserController";
import { ROUTES } from '../../enums';
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import InputGral from "../InputGral/InputGral";
import CardTitle from "../cards/CardTitle/CardTitle";
import styles from "./RecoverPasswordView.module.css";

const RecoverPasswordView: React.FC<{}> = ({ }) => {
  const [email, setEmail] = useState('');
  const [existingUser, setExistingUser] = useState(true);
  const validEmail = useMemo(() => email.length > 8 && email.includes('@') && email.split('@')[1].includes('.'), [email]);

  async function handleRecoverPassword(e) {
    e.preventDefault();

    if (validEmail) {
      await apiUserController.passwordRecoverSendEmail(email, setExistingUser);
    }
  }

  useEffect(() => {
    Router.prefetch(ROUTES.NEW_PASS);
  }, [])

  return (
    <div className={styles.recover_password_cont}>
      <CardTitle text="Recuperar Contraseña" />
      <div className={styles.recover_password_span}>
        <span>{"Ingresa el e-mail con el que te registraste para que te enviemos un código de recuperación."}</span>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <InputGral
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={setEmail}
        />

        {!existingUser && <p className={styles.Alert}>{"El usuario no existe."}</p>}

        <CustomColorBtn
          type="submit"
          text="Continuar"
          backgroundColorInit="#c21c3b"
          backgroundColorEnd="#f9bd4f"
          borderColor="#e17846"
          onClick={handleRecoverPassword}
          disable={!validEmail}
        />

        <Link href={ROUTES.LOGIN}>
          <button className={styles.login}>VOLVER AL LOGIN</button>
        </Link>
      </form>
    </div>
  );
};

export default RecoverPasswordView;
