import Cookies from 'js-cookie';
import Router from 'next/router';
import apiUserController from '../../api/apiUserController';
import { LOGIN_COOKIE } from '../../constants/index';
import { FILE, ROUTES } from '../../enums';
import styles from './Maintenance.module.css';



const Maintenance: React.FC<{ setLoading: (value: boolean) => void }> = ({ setLoading }) => {

async function handleLogout() {

    setLoading(true)

    try {
        const accessToken = JSON.parse(Cookies.get(LOGIN_COOKIE)).access_token;
        const response = await apiUserController.logout(accessToken);

        if (response.status == 200) {

        Cookies.remove(LOGIN_COOKIE);

        Router.push(`${ROUTES.LOGIN}`);
        setLoading(false)

        }
    } catch (error: any) {
        // alert(error.response.data.error);
        setLoading(false)
    }
}

    return (
        <div className={styles.maintCont}>
            <div>

                <img src={FILE.MAINTENANCE} />

                <aside>
                    <div>
                        <p>{"¡Hey, estamos en mantenimiento!"}</p>
                        <p>{"Pero dentro de muy poco estamos de nuevo funcionando"}</p>
                        <br />
                        <p>{"Regresa dentro de un rato para continuar contactando y dominando tu mercado."}</p>
                    </div>
                    <button onClick={handleLogout} >LOG OUT</button>
                </aside>
            </div>
        </div>
    )
}

export default Maintenance;
