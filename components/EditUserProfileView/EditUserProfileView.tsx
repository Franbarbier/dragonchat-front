import Router from "next/router";
import { useEffect, useState } from "react";
import userServiceFactory from "../../clientServices/userService";
import apiSenderWhatsappController from "../../services/apiSenderWhatsappController";
import CardTitle from "../cards/CardTitle/CardTitle";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import InputGral from "../InputGral/InputGral";
import styles from './EditUserProfileView.module.css';

const userService = userServiceFactory();
export interface IEditUserProfileView {
  user: {
    id: number;
    name: string;
    state: number,
    email: string;
    connected_whatsapp: number,
    created_at: string,
    updated_at: string
  }
}

const EditUserProfileView: React.FC<IEditUserProfileView> = ({user}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('');
  const [equalPass, setEqualPass] = useState(true);

  async function handleDesvWpp(){
    const userId = user.id;
    const response = await apiSenderWhatsappController.unlinkWhatsapp(userId);
    if (response.status == 200) {
      user.connected_whatsapp = 0
    } else {
      const data = await response.json();
      console.log(data);
    }
  }

  async function editUserProfile() {
    const response = await userService.edit( {name: name, email: email, password: pass, passwordConfirmation: confirmPass});
    if (response.status == 200) {
      alert("Perfil actualizado de forma exitosa!");
    } else {
      alert("Ups, algo salió mal")
    }
  }

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
            <InputGral placeholder='• • • • • • • •' type="password" value={pass} onChange={ setPass }/>
            <label className={styles.input_label} htmlFor="">CONFIRMAR CONTRASEÑA</label>
            <InputGral placeholder='• • • • • • • •' type="password" value={confirmPass} onChange={ setConfirmPass }/>
            {!equalPass &&
                <p className={styles.alert}>Las contraseñas no coinciden :(</p>
            }
          </div>
          <div className={styles.buttons}>
          {
            user.connected_whatsapp == 1?
            <CustomColorBtn
              type="button"
              text="DESVINCULAR WHATSAPP"
              backgroundColorInit="#c21c3b"
              backgroundColorEnd="#f94f4f"
              borderColor="#f94f4f"
              onClick={handleDesvWpp}
            /> 
            :
            <CustomColorBtn
              type="button"
              text="VINCULAR WHATSAPP"
              backgroundColorInit="#c21c3b"
              backgroundColorEnd="#f94f4f"
              borderColor="#f94f4f"
              onClick={() => {
                return Router.push("/qr")
              }}
            />
          }
          {
            equalPass && 
            <CustomColorBtn
            type="submit"
            text="GUARDAR CAMBIOS"
            backgroundColorInit="#c21c3b"
            backgroundColorEnd="#f9bd4f"
            borderColor="#e17846"
            onClick={editUserProfile}
          />
          }
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfileView;
