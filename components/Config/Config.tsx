import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteCookie, getCookie } from "cookies-next";
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import apiUserController from '../../api/apiUserController';
import styles from './Config.module.css';

export interface IConfig {
}

const Config: React.FC<IConfig> = () => {
    const [menuConfig, setMenuConfig] = useState(false);

    async function handleLogout() {
        try {
            const accessToken = JSON.parse(String(getCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || '')) || '{}').access_token;
            const response = await apiUserController.logout(accessToken);
            if (response.status == 200) {
                deleteCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || '');
                Router.push("/login");
            }
        } catch (error: any) {
            alert(error.response.data.error);
        }
    }

    return (
        <div id={styles.configBtn}>
            <div>
                <div className={styles.config_icon} onClick={() => { setMenuConfig(!menuConfig) }}>
                    <FontAwesomeIcon icon={faUserCircle} />
                </div>

                {menuConfig && (
                    <div className={styles.menu_config}>

                        <div className={styles.unlink_whatsapp}>
                            <Link href='/user/edit'><p>Mi perfil</p></Link>
                        </div>

                        <div className={styles.sign_out} onClick={handleLogout}>
                            <p>Cerrar sesión</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Config;

