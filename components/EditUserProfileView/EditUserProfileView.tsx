import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import apiSenderWhatsappController from "../../api/apiSenderWhatsappController";
import apiUserController from "../../api/apiUserController";
import { LOGIN_COOKIE } from "../../constants/index";
import { ROUTES, STATUS } from '../../enums';
import CardTitle from "../cards/CardTitle/CardTitle";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import InputGral from "../InputGral/InputGral";
import { INotification } from "../Notification/Notification";
import styles from './EditUserProfileView.module.css';

export interface IEditUserProfileView {
  user: {
    id: number;
    name: string;
    state: number,
    email: string;
    connected_whatsapp: number,
    created_at: string,
    updated_at: string,
  }
  setLoading : (value : boolean) => void,
  notification: INotification,
  setNotification: (value: INotification) => void
}


const EditUserProfileView: React.FC<IEditUserProfileView> = ({ user, setLoading, notification, setNotification }) => {
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  let plan = '';
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('');
  const [equalPass, setEqualPass] = useState(true);


  useEffect(() => {
    async function getUserData() {
      const authToken = JSON.parse(Cookies.get(LOGIN_COOKIE)).access_token;
      const response = await apiUserController.getData(authToken);
      console.log(response.data.name, response.data.email)
      setName(response.data.data.name)
      setEmail(response.data.data.email)
      return response;
    }
    getUserData()
  
  }, [])
  

  async function handleDesvWpp() {
    setLoading(true)
    const authToken = JSON.parse(Cookies.get(LOGIN_COOKIE)).access_token;
    const response = await apiSenderWhatsappController.disconnect(authToken);
    if (response) {
      Router.push(ROUTES.QR);
    }
    setLoading(false)

  }
  async function handleLogout() {
    setLoading(true)
    try {
      const accessToken = JSON.parse(Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).access_token;
      const response = await apiUserController.logout(accessToken);
      if (response.status == 200) {
        Cookies.remove(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME);
        Router.push(ROUTES.LOGIN);
        setLoading(false)

      }
    } catch (error: any) {
        setLoading(false)
      return false;
    }
  }


  async function editUserProfile() {


    
    // validar que los campos no tengan espacio en blanco y tenga mas de de 6 caracteres la pass
    if ((pass != '' && pass.length < 6) || (confirmPass != '' && confirmPass.length < 6) || pass.trim().length == 0 || pass.includes(' ') ) {
      setNotification({
        status: STATUS.ERROR,
        render: true,
        message: "La contraseña no puede tener espacios y debe tener 6 o mas caracteres.",
        modalReturn: () => {
          setNotification({ ...notification, render: false })
        }
      })
      return false;
    }


    const accessToken = JSON.parse(Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).access_token;
    try {
      const response = await apiUserController.edit(accessToken, name, email, pass, confirmPass);

      if (response.status == 200) {
        setNotification({
          status: STATUS.SUCCESS,
          render: true,
          message: "Perfil actualizado de forma exitosa!",
          modalReturn: () => {
            setNotification({ ...notification, render: false })
          }
        })
      }else{
        setNotification({
          status: STATUS.ERROR,
          render: true,
          message: "Ups! algo salió mal.",
          modalReturn: () => {
            setNotification({ ...notification, render: false })
          }
        })
      }

    } catch (error: any) {
      setNotification({
        status: STATUS.ERROR,
        render: true,
        message: "Ups! algo salió mal.",
        modalReturn: () => {
          setNotification({ ...notification, render: false })
        }
      })
    }
  }

  useEffect(() => {

    if ( (confirmPass != '' || pass != '') && confirmPass != pass ) {
      setEqualPass(false)
    } else {
      setEqualPass(true)
    }

  }, [confirmPass, pass])


  return (
      <div>
        
        <CardTitle text="Opciones" />
        <form onSubmit={(e)=> e.preventDefault() } >
          <div>
            <label className={styles.input_label} htmlFor="">NOMBRE</label>
            <InputGral
              placeholder="Nombre"
              type="text"
              value={name}
              onChange={setName}
              isDisabled={true}
              classes={["error"]}
            />
            <label className={styles.input_label} htmlFor="">E-MAIL</label>
            <InputGral
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={setEmail}
              isDisabled={true}
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
            <CustomColorBtn
              type="button"
              text="DESVINCULAR WHATSAPP"
              backgroundColorInit="#c21c3b"
              backgroundColorEnd="#f94f4f"
              borderColor="#f94f4f"
              onClick={handleDesvWpp}
            />
            {equalPass && (
              <CustomColorBtn
                type="submit"
                text="GUARDAR CAMBIOS"
                backgroundColorInit="#c21c3b"
                backgroundColorEnd="#f9bd4f"
                borderColor="#e17846"
                onClick={editUserProfile}
              />
            )}

            <div className={styles.logout_btn}>
              <hr />
              <button onClick={handleLogout}>CERRAR SESION</button>
            </div>

          </div>
        </form>
      </div>
  );
};

export default EditUserProfileView;
