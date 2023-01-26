import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';
import { useState } from 'react';
import userServiceFactory from "../../clientServices/userService";
import useUser from '../../lib/useUser';
import apiSenderWhatsappController from '../../services/apiSenderWhatsappController';
import styles from './Config.module.css';

const userService = userServiceFactory();
export interface IConfig {
    linked_whatsapp: boolean
}




const Config: React.FC<IConfig> = ({ linked_whatsapp=true }) => {
    const [menuConfig, setMenuConfig] = useState(false);
    const { user } = useUser();

    const linkedWhatsapp = linked_whatsapp;

    async function handleDesvWpp(){
        const userId = user.user_id;
        await apiSenderWhatsappController.unlinkWhatsapp(userId);
    }

    async function handleLogout(){
        try {
            await userService.logout();
            Router.push("/login");
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

