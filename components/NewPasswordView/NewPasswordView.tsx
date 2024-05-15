import { useEffect, useState } from "react";
import apiUserController from "../../api/apiUserController";
import { STATUS } from "../../enums";
import InputGral from '../InputGral/InputGral';
import { INotification } from "../Notification/Notification";
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import OtpInput from "../OtpInput/OtpInput";
import CardTitle from '../cards/CardTitle/CardTitle';
import styles from "./NewPasswordView.module.css";

interface otpType { value: string, isValid: boolean | null, size: number };
interface passwordsType { current: string, new: string, areValid: boolean | null };

const NewPasswordView: React.FC<{}> = ({ }) => {
  const [otp, setOtp] = useState<otpType>({ value: '', isValid: null, size: 0 });
  const [passwords, setPasswords] = useState<passwordsType>({ current: '', new: '', areValid: null })

  // Evaluar si ocuparlo en catch apiUserController
  const [notification, setNotification] = useState<INotification>({
    status: STATUS.SUCCESS,
    render: false,
    message: "",
    modalReturn: () => { }
  })

  useEffect(() => {
    const size = otp.value.replace(/\s/g, '').length;

    if (size === 6) {
      apiUserController.passwordRecoverCheckOtp(otp.value, isValid => setOtp(prev => ({ ...prev, isValid })));
    }

    setOtp((prev) => ({ ...prev, size }));
  }, [otp.value]);

  useEffect(() => {
    if (passwords.current && passwords.current !== '' && passwords.new !== '') {
      setPasswords((prev) => ({ ...prev, areValid: passwords.current === passwords.new }))
    }
  }, [passwords.current, passwords.new]);

  const handleChangePassword = () => {
    if (passwords.areValid) {
      apiUserController.passwordRecoverChangePassword(otp.value, passwords.current, passwords.new);
    }
  }

  return (
    <div className={styles.new_pass_cont}>
      {otp.isValid ? (
        <>
          <CardTitle text="Cambiar Contraseña" />
          <InputGral
            placeholder='Nueva contraseña'
            type="password"
            value={passwords.current}
            onChange={(currentPassword: string) => setPasswords((prev) => ({ ...prev, current: currentPassword }))}
          />
          <InputGral
            placeholder='Repetir nueva contraseña'
            type="password"
            value={passwords.new}
            onChange={(newPassword: string) => setPasswords((prev) => ({ ...prev, new: newPassword }))}
          />
          {(passwords.areValid === false) && <p className={styles.Alert}>{"Las contraseñas no coinciden :("}</p>}
          <OrangeBtn text="Confirmar" onClick={handleChangePassword} disabled={!passwords.areValid} />
        </>
      ) : (
        <div className={styles.otp_code}>
          <CardTitle text="Ingresar Código" />
          <div className={styles.otp_code_span}>
            <span>{"Revisa tu casilla de correo."}</span>
          </div>
          <OtpInput
            value={otp.value}
            valueLength={6}
            onChange={(value: string) => setOtp(prev => ({ ...prev, value }))}
          />
          {(otp.size === 6 && otp.isValid === false) && <p className={styles.Alert}>{"Código inválido."}</p>}
        </div>
      )}
    </div>
  );
};

export default NewPasswordView;
