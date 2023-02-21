import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export interface IHeader {
    openSettings : boolean;
    setOpenSettings : (settings: boolean) => void,
    setModalRef : (arg:boolean) => void;
}



// interface contactosArr extends Array<ContactInfo>{}

const Header: React.FC<IHeader> = ({ openSettings, setOpenSettings, setModalRef}) => {
    

    const [iconUrl, setIconUrl] = useState<string>('setting.png')
    const [rotateAnim, setRotateAnim] = useState<boolean>(false)


    useEffect(()=>{
        if (!openSettings) {
            setRotateAnim(true)
            setTimeout(() => {
                setIconUrl('setting.png')
                setTimeout(() => {
                    setRotateAnim(false)
                }, 200);
            }, 300);
        }else{

            setRotateAnim(true)
            setTimeout(() => {
                setIconUrl('close.png')
                setTimeout(() => {
                    setRotateAnim(false)
                }, 200);
            }, 300);
        }
    }, [openSettings])

    return (
        <div className={styles.header_cont}>
            <nav>
                <div>
                    <img src={'boceto-logo.png'} />

                </div>
                <div className={styles.menu_cont}>
                    <div className={styles.referir_cont}>
                        <button onClick={()=>{setModalRef(true)}}>
                            <img src="regalo.png" />
                            <span>REFERIR AMIGOS</span>
                        </button>
                    </div>
                    <div className={`${styles.settings_cont} ${rotateAnim && styles.rotate}`} onClick={ ()=>{setOpenSettings(!openSettings)} }>
                        <img src={iconUrl} />
                    </div>
                </div>
            </nav>
        </div>
    
    );
}

export default Header;