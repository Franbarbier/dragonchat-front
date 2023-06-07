import { getCookie, removeCookies } from "cookies-next";
import Router from "next/router";
import { useEffect, useState } from "react";
import apiSenderWhatsappController from "../../api/apiSenderWhatsappController";
import apiUserController from "../../api/apiUserController";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import InputGral from "../InputGral/InputGral";
import MainCont from "../MainCont/MainCont";
import { INotification } from "../Notification/Notification";
import CardTitle from "../cards/CardTitle/CardTitle";
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

const EditUserProfileView: React.FC<IEditUserProfileView> = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('');
  const [equalPass, setEqualPass] = useState(true);
  const [notification, setNotification] = useState<INotification>({
    status: "success",
    render: false,
    message: "",
    modalReturn: () => { }
  })

  async function handleDesvWpp() {
    const response = await apiSenderWhatsappController.unlinkWhatsapp(getCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || ''));
    if (response.status == 200) {
      user.connected_whatsapp = 0
    } else {
      const data = await response.json();
      console.log(data);
    }
  }
  async function handleLogout() {
    try {
      const accessToken = JSON.parse(String(getCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || ''))).access_token;
      const response = await apiUserController.logout(accessToken);
      if (response.status == 200) {
        removeCookies(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || '');
        Router.push("/login");
      }
    } catch (error: any) {
      setNotification({
        status: "error",
        render: true,
        message: "Algo salió mal, no fue posible cerrar sesión",
        modalReturn: () => {
          setNotification({ ...notification, render: false })
        }
      })
    }
  }

  async function editUserProfile() {
    const accessToken = JSON.parse(String(getCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || ''))).access_token;
    try {
      const response = await apiUserController.edit(accessToken, name, email, pass, confirmPass);

      setNotification({
        status: "success",
        render: true,
        message: "Perfil actualizado de forma exitosa!",
        modalReturn: () => {
          setNotification({ ...notification, render: false })
        }
      })

    } catch (error: any) {
      setNotification({
        status: "error",
        render: true,
        message: "Ups! algo salió mal.",
        modalReturn: () => {
          setNotification({ ...notification, render: false })
        }
      })
    }
  }

  useEffect(() => {
    if (confirmPass != '' && confirmPass != pass) {
      setEqualPass(false)
    } else {
      setEqualPass(true)
    }

  }, [confirmPass])

  return (
    <MainCont width={90} maxWidth={340}>
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
            <InputGral placeholder='• • • • • • • •' type="password" value={pass} onChange={setPass} />
            <label className={styles.input_label} htmlFor="">CONFIRMAR CONTRASEÑA</label>
            <InputGral placeholder='• • • • • • • •' type="password" value={confirmPass} onChange={setConfirmPass} />
            {!equalPass &&
              <p className={styles.alert}>Las contraseñas no coinciden :(</p>
            }
          </div>
          <div className={styles.buttons}>
            {
              user.connected_whatsapp == 1 ?
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

            <div className={styles.logout_btn}>
              <hr />
              <button onClick={handleLogout}>CERRAR SESION</button>
            </div>

          </div>
        </form>
      </div>
    </MainCont>
  );
};

export default EditUserProfileView;
