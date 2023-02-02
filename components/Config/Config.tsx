import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useState } from 'react';
import apiSenderWhatsappController from '../../api/apiSenderWhatsappController';
import apiUserController from '../../api/apiUserController';
import styles from './Config.module.css';

export interface IConfig {
    linked_whatsapp: boolean
}




const Config: React.FC<IConfig> = ({ linked_whatsapp=true }) => {

    const [menuConfig, setMenuConfig] = useState(false);

    const linkedWhatsapp = linked_whatsapp;

    async function handleDesvWpp(){
        const userId = JSON.parse(Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).user_id;
        await apiSenderWhatsappController.unlinkWhatsapp(userId);
       
    }

    async function handleLogout(){
        try {
            const accessToken = JSON.parse(Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).access_token;
            const response = await apiUserController.logout(accessToken);
            if (response.status == 200) {
                Cookies.remove(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME);
                Router.push("/login");
            }
        } catch (error: any) {
            alert(error.response.data.error);
        }
    }
    

    return (
            <div id={styles.configBtn}>
                <div>
                    <div className={styles.config_icon} onClick={ ()=>{ setMenuConfig(!menuConfig) } }>
                        <FontAwesomeIcon icon={faUserCircle} />
                        {/* <img src="/settings.png" />                         */}
                    </div>
                    
                    {menuConfig &&
                        <div className={styles.menu_config}>
                            {
                                linkedWhatsapp &&
                                <div className={styles.unlink_whatsapp}>
                                    <p onClick={ handleDesvWpp } >Desvincular Whatsapp</p>
                                </div>
                            }
                            <div className={styles.sign_out} onClick={ handleLogout }>
                                <p>Cerrar sesión</p>
                            </div>
                        </div>
                    }

                </div>
            </div>
    
    );
}

export default Config;

