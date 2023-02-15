import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import userServiceFactory from "../../clientServices/userService";
import useUser from '../../lib/useUser';
import styles from './Config.module.css';

const userService = userServiceFactory();
export interface IConfig {
}




const Config: React.FC<IConfig> = () => {

    const [menuConfig, setMenuConfig] = useState(false);
    const { user } = useUser();

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
                            
                            <div className={styles.unlink_whatsapp}>
                                <Link href='/user/edit'><p>Mi perfil</p></Link>
                                
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

