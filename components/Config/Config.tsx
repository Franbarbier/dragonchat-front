import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useState } from 'react';
import apiSenderWhatsappController from '../../api/apiSenderWhatsapp';
import styles from './Config.module.css';

export interface IConfig {
    linked_whatsapp: boolean
}




const Config: React.FC<IConfig> = ({ linked_whatsapp=true }) => {

    const [menuConfig, setMenuConfig] = useState(false);

    const linkedWhatsapp = linked_whatsapp;

    async function handleDesvWpp(){
        const userId = JSON.parse(Cookies.get("dragonchat_login")).user_id;
        const response = await apiSenderWhatsappController.unlinkWhatsapp(userId);
        const data = await response?.json();
        if (response.status == 200) {
            alert("Whatsapp correctamente desvinculado.");
            Router.push("/qr");
        } else {
            alert("Tu sesión no pudo ser desvinculada de forma correcta. Espera unos momentos y vuelve a intentar.")
        }
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

