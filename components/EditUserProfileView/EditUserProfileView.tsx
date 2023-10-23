import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useMemo, useState } from "react";
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
  setLoading: (value: boolean) => void,
  notification: INotification,
  setNotification: (value: INotification) => void,
};

const EditUserProfileView: React.FC<IEditUserProfileView> = ({ setLoading, notification, setNotification }) => {
  const [userData, setUserData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const equalPassword = useMemo(() => (
    userData.password && (userData.password === userData.confirmPassword)
  ), [userData.password, userData.confirmPassword])

  useEffect(() => {
    async function getUserData() {
      setLoading(true);
      const authToken = JSON.parse(Cookies.get(LOGIN_COOKIE)).access_token;
      const response = await apiUserController.getData(authToken);
      setLoading(false);

      return response;
    }

    getUserData().then(({ data }) => {
      if (data) {
        setUserData(prev => ({
          ...prev,
          name: data.name,
          email: data.email,
        }))
      }
    });
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
      const accessToken = JSON.parse(Cookies.get(LOGIN_COOKIE)).access_token;
      const response = await apiUserController.logout(accessToken);

      if (response.status == 200) {
        Cookies.remove(LOGIN_COOKIE);
        Router.push(ROUTES.LOGIN);
        setLoading(false)
      }
    } catch (error: any) {
      setLoading(false)
      return false;
    }
  }

  async function editUserProfile() {
    if (!equalPassword || userData.password.length < 6) {
      setNotification({
        status: STATUS.ERROR,
        render: true,
        message: "La contraseña no puede tener espacios y debe tener 6 o mas caracteres.",
        modalReturn: () => {
          setNotification({ ...notification, render: false })
        }
      })
    } else {
      const accessToken = JSON.parse(Cookies.get(LOGIN_COOKIE)).access_token;

      setLoading(true);

      try {
        const response = await apiUserController.edit(accessToken, userData.name, userData.email, userData.password, userData.confirmPassword);

        if (response.status == 200) {
          setNotification({
            status: STATUS.SUCCESS,
            render: true,
            message: "Perfil actualizado de forma exitosa!",
            modalReturn: () => {
              setNotification({ ...notification, render: false })
            }
          })
        } else {
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

      setLoading(false);
    }
  }

  return (
    <div>
      <CardTitle text="Opciones" />
      <form onSubmit={(e) => e.preventDefault()} >
        <InputGral
          placeholder="Nombre"
          type="text"
          value={userData.name}
          onChange={(value) => setUserData(prev => ({ ...prev, name: value }))}
          labelText="NOMBRE"
          labelClassName={styles.input_label}
        />

        <InputGral
          placeholder="example@dragonchat.com"
          type="email"
          value={userData.email}
          onChange={(value) => setUserData(prev => ({ ...prev, email: value }))}
          labelText="E-MAIL"
          labelClassName={styles.input_label}
        />

        <InputGral
          type="password"
          value={userData.password}
          onChange={(value) => setUserData(prev => ({ ...prev, password: value.trim() }))}
          labelText="CONTRASEÑA"
          labelClassName={styles.input_label}
        />

        <InputGral
          type="password"
          value={userData.confirmPassword}
          onChange={(value) => setUserData(prev => ({ ...prev, confirmPassword: value.trim() }))}
          labelText="CONFIRMAR CONTRASEÑA"
          labelClassName={styles.input_label}
        />

        {userData.confirmPassword && !equalPassword && (
          <p className={styles.alert}>{"Las contraseñas no coinciden :("}</p>
        )}

        <div className={styles.buttons}>
          <CustomColorBtn
            type="button"
            text="DESVINCULAR WHATSAPP"
            backgroundColorInit="#c21c3b"
            backgroundColorEnd="#f94f4f"
            borderColor="#f94f4f"
            onClick={handleDesvWpp}
          />
          {equalPassword && (
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
