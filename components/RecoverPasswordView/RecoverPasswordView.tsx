import { useEffect, useState } from "react";
import CardTitle from '../cards/CardTitle/CardTitle';
import styles from "./RecoverPasswordView.module.css";

export interface IRecoverPasswordView {}

const RecoverPasswordView: React.FC<IRecoverPasswordView> = ({}) => {
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [equalNewPass, setEqualNewPass] = useState(true);

  useEffect(() => {
    if (confirmNewPass != "" && confirmNewPass != newPass) {
      setEqualNewPass(false);
    } else {
      setEqualNewPass(true);
    }
  }, [confirmNewPass]);

  return (
    <div className={styles.signup_cont}>
      <div>
        <CardTitle text="Cambiar Contraseña" />
      </div>
    </div>
  );
};

export default RecoverPasswordView;
