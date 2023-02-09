import Cookies from "js-cookie";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import apiSenderWhatsappController from "../../api/apiSenderWhatsappController";
import apiUserController from "../../api/apiUserController";
import CardTitle from "../cards/CardTitle/CardTitle";
import InputGral from "../InputGral/InputGral";
import OrangeBtn from "../OrangeBtn/OrangeBtn";
import RedBtn from "../RedBtn/RedBtn";
import styles from './EditUserProfileView.module.css';

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
    const userId = JSON.parse(Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).user_id;
    const response = await apiSenderWhatsappController.unlinkWhatsapp(userId);
    if (response.status == 200) {
      user.connected_whatsapp = 0
    } else {
      const data = await response.json();
      console.log(data);
    }
  }

  async function editUserProfile() {
    const accessToken = JSON.parse(Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).access_token;
    try {
      const response = await apiUserController.edit(accessToken, name, email, pass, confirmPass);
      console.log(response);
      alert("Perfil actualizado de forma exitosa!");
    } catch (error: any) {
      console.log(error.response.data);
      alert("Ups! algo salió mal.");
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
            <RedBtn
              type="button"
              text="DESVINCULAR WHATSAPP"
              onClick={handleDesvWpp}
            /> :
            <Link href="/qr">
              <RedBtn
                type="button"
                text="VINCULAR WHATSAPP"
                onClick={() => {
                  return Router.push("/qr")
                }}
              />
            </Link>
          }
          {
            equalPass && 
            <OrangeBtn
            type="submit"
            text="GUARDAR CAMBIOS"
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
