import { useEffect, useState } from "react";
import apiUserController from "../../api/apiUserController";
import CardTitle from '../cards/CardTitle/CardTitle';
import InputGral from '../InputGral/InputGral';
import { INotification } from "../Notification/Notification";
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import OtpInput from "../OtpInput/OtpInput";
import styles from "./NewPasswordView.module.css";

export interface INewPasswordView {}

const NewPasswordView: React.FC<INewPasswordView> = ({}) => {
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [equalNewPass, setEqualNewPass] = useState(true);
  const [otp, setOtp] = useState('');
  const [validOtp, setValidOtp] = useState();

  const [notification, setNotification] = useState<INotification>({
    status : "success",
    render : false,
    message : "",
    modalReturn : ()=>{}
})

  const onChange = (value: string) => setOtp(value);

  async function handleChangePassword() {
    if (equalNewPass) {
        // hit user api to actually change the pass and redirect to login
        apiUserController.passwordRecoverChangePassword(otp, newPass, confirmNewPass);
    } else {
        setNotification({
          status : "error",
          render : true,
          message : "Las contaseñas no coinciden.",
          modalReturn : () => {
              setNotification({...notification, render : false})
          }})
    }
  }

  useEffect(() => {
    if (confirmNewPass != "" && confirmNewPass != newPass) {
      setEqualNewPass(false);
    } else {
      setEqualNewPass(true);
    }
  }, [confirmNewPass]);

  // while otp state changes, when it achieves 6 character length, we check if it is valid against user api, if it is, we allow the user to change its password
  useEffect(() => {
    if (otp.length === 6) {
      // hit api and check if it is ok, and if it is, set validOtp to true
      apiUserController.passwordRecoverCheckOtp(otp, setValidOtp);
    }
  }, [otp])

  return (
    <div className={styles.new_pass_cont}>

        

        {validOtp?
        <div>
          <CardTitle text="Cambiar Contraseña" />
          <div>
            <InputGral placeholder='Nueva contraseña' type="password" value={newPass} onChange={ setNewPass }/>
            <InputGral placeholder='Repetir nueva contraseña' type="password" value={confirmNewPass} onChange={ setConfirmNewPass }/>
            {!equalNewPass &&
                <p className={styles.Alert}>Las contraseñas no coinciden :(</p>
            }
            <OrangeBtn text="Confirmar" onClick={ handleChangePassword }/>
        </div>
        </div>
          
        :
        <div className={styles.otp_code}>
          <CardTitle text="Ingresar Código" />
          <div className={styles.otp_code_span}>
            <span>Revisa tu casilla de correo.</span>
          </div>
          <div>
            <OtpInput value={otp} valueLength={6} onChange={onChange} />
            {(validOtp !== undefined && !validOtp && otp.length === 6) &&
                  <p className={styles.Alert}>Código inválido.</p>
            }
          </div>
        </div>
        
        }

    </div>
  );
};

export default NewPasswordView;
