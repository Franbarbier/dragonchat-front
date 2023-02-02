import { useEffect, useState } from "react";
import CardTitle from "../cards/CardTitle/CardTitle";
import InputGral from "../InputGral/InputGral";
import OrangeBtn from "../OrangeBtn/OrangeBtn";
import RedBtn from "../RedBtn/RedBtn";
import styles from './EditUserProfile.module.css';

export interface IEditUserProfile {}

const EditUserProfile: React.FC<IEditUserProfile> = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('');
  const [equalPass, setEqualPass] = useState(true);

  useEffect(()=>{
    if (confirmPass != '' && confirmPass != pass) {
        setEqualPass(false)
    }else{
        setEqualPass(true)
    }

},[confirmPass])

  return (
    <div>
      <div>
        <CardTitle text="Opciones" />
        <form>
          <div>
            <label className={styles.input_label} htmlFor="">NOMBRE</label>
            <InputGral
              placeholder="Nombre"
              type="text"
              value={name}
              onChange={setName}
              classes={["error"]}
            />
            <label className={styles.input_label} htmlFor="">E-MAIL</label>
            <InputGral
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <label className={styles.input_label} htmlFor="">CONTRASEÑA</label>
            <InputGral placeholder='Contraseña' type="password" value={pass} onChange={ setPass }/>
            <label className={styles.input_label} htmlFor="">CONFIRMAR CONTRASEÑA</label>
            <InputGral placeholder='Repetir contraseña' type="password" value={confirmPass} onChange={ setConfirmPass }/>
            {!equalPass &&
                <p className={styles.alert}>Las contraseñas no coinciden :(</p>
            }
          </div>
          {/* {!existingUser &&
                  <p className={styles.Alert}>El usuario no existe.</p>
            } */}
          <div className={styles.buttons}>
            <RedBtn
              type="submit"
              text="DESVINCULAR WHATSAPP"
              onClick={() => {
                console.log(1);
              }}
            />
            <OrangeBtn
            type="submit"
            text="GUARDAR CAMBIOS"
            onClick={() => {
              console.log(1);
            }}
          />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
