import { useEffect, useState } from "react";
import CardTitle from '../cards/CardTitle/CardTitle';
import InputGral from '../InputGral/InputGral';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import styles from "./NewPasswordView.module.css";

export interface INewPasswordView {}

const NewPasswordView: React.FC<INewPasswordView> = ({}) => {
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

  async function handleChangePassword() {
    if (equalNewPass) {
        console.log("Todo ok")
    } else {
        alert("Las contaseñas no coinciden")
    }
  }

  return (
    <div className={styles.new_pass_cont}>
      <div>
        <CardTitle text="Cambiar Contraseña" />

        <div>
            <InputGral placeholder='Nueva contraseña' type="password" value={newPass} onChange={ setNewPass }/>
            <InputGral placeholder='Repetir nueva contraseña' type="password" value={confirmNewPass} onChange={ setConfirmNewPass }/>
            {!equalNewPass &&
                <p className={styles.passAlert}>Las contraseñas no coinciden :(</p>
            }
        </div>

        <OrangeBtn text="Confirmar" onClick={ handleChangePassword }/>

      </div>
    </div>
  );
};

export default NewPasswordView;
