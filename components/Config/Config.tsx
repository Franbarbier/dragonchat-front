import { useState } from 'react';
import styles from './Config.module.css';


export interface IConfig {
    
}




const Config: React.FC<IConfig> = ({  }) => {

    const [menuConfig, setMenuConfig] = useState(false)


    function handleDesvWpp(){

    }
    function handleLogout(){

    }

    return (
            <div id={styles.configBtn}>
                <div>
                    <div className={styles.config_icon} onClick={ ()=>{ setMenuConfig(!menuConfig) } }>
                        <img src="/settings.png" />                        
                    </div>
                    
                    {menuConfig &&
                        <div className={styles.menu_config}>
                            <div>
                                <p onClick={ ()=>{ handleDesvWpp } }>Desvincular Whatsapp</p>
                            </div>
                            <div>
                                <p onClick={ ()=>{ handleLogout } }>Cerrar sesión</p>
                            </div>
                        </div>
                    }

                </div>
            </div>
    
    );
}

export default Config;

