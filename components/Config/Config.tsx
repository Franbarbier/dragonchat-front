import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useState } from 'react';
import apiSenderWhatsappController from '../../api/apiSenderWhatsappController';
import styles from './Config.module.css';

export interface IConfig {
    linked_whatsapp: boolean
}




const Config: React.FC<IConfig> = ({ linked_whatsapp=true }) => {

    const [menuConfig, setMenuConfig] = useState(false);

    const linkedWhatsapp = linked_whatsapp;

    async function handleDesvWpp(){
        const userId = JSON.parse(Cookies.get("dragonchat_login")).user_id;
        await apiSenderWhatsappController.unlinkWhatsapp(userId);
       
    }
    function handleLogout(){
        Cookies.remove("dragonchat_login");
        Router.push('/login');
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

