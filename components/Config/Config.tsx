import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { useState } from 'react';
import styles from './Config.module.css';


export interface IConfig {
    
}




const Config: React.FC<IConfig> = ({  }) => {

    const [menuConfig, setMenuConfig] = useState(false);

    function handleDesvWpp(){

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
                            <div className={styles.unlink_whatsapp}>
                                <p onClick={ ()=>{ handleDesvWpp } }>Desvincular Whatsapp</p>
                            </div>
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

