import { useEffect, useState } from "react";
import CardTitle from "../cards/CardTitle/CardTitle";
import InputGral from "../InputGral/InputGral";
import OrangeBtn from "../OrangeBtn/OrangeBtn";

export interface IEditUserProfile {}

const EditUserProfile: React.FC<IEditUserProfile> = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('');
  const [equalPass, setEqualPass] = useState(true);
  const [userExists, setUserExists] = useState(false);

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
            <InputGral
              placeholder="Nombre"
              type="text"
              value={name}
              onChange={setName}
              classes={["error"]}
            />
            <InputGral
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <InputGral placeholder='Contraseña' type="password" value={pass} onChange={ setPass }/>
            <InputGral placeholder='Repetir contraseña' type="password" value={confirmPass} onChange={ setConfirmPass }/>
                    {/* {!equalPass &&
                        <p className={styles.alert}>Las contraseñas no coinciden :(</p>
                    }
                    {userExists &&
                        <p className={styles.alert}>El usuario ya existe.</p>
                    } */}
          </div>
          {/* {!existingUser &&
                  <p className={styles.Alert}>El usuario no existe.</p>
            } */}

          <OrangeBtn
            type="submit"
            text="GUARDAR CAMBIOS"
            onClick={() => {
              console.log(1);
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
