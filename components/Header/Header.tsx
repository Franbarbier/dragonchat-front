import { useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import ModalReferiAmigos from '../ModalReferiAmigos/ModalReferiAmigos';
import ModalTimer from '../ModalTimer/ModalTimer';
import Notification, { INotification } from '../Notification/Notification';
import styles from './Header.module.css';

export interface IHeader {
    openSettings : boolean;
    setOpenSettings : (settings: boolean) => void,
}



// interface contactosArr extends Array<ContactInfo>{}

const Header: React.FC<IHeader> = ({ openSettings, setOpenSettings}) => {
    

    const [iconUrl, setIconUrl] = useState<string>('icon_config.svg')
    const [rotateAnim, setRotateAnim] = useState<boolean>(false)
    const [buleano, setBuleano] = useState<boolean>(false)
    const [modalRef, setModalRef] = useState<boolean>(false)
    const [modalTimer, setModalTimer] = useState<boolean>(false)


    useEffect(()=>{
        if (!openSettings) {
            setRotateAnim(true)
            setTimeout(() => {
                setIconUrl('icon_config.svg')
                setTimeout(() => {
                    setRotateAnim(false)
                }, 200);
            }, 300);
        }else{

            setRotateAnim(true)
            setTimeout(() => {
                setIconUrl('close.svg')
                setTimeout(() => {
                    setRotateAnim(false)
                }, 200);
            }, 300);
        }
    }, [openSettings])

    
    const [notification, setNotification] = useState<INotification>({
        status : "success",
        render : false,
        message : "",
        modalReturn : ()=>{}
    })

    return (
        <div className={styles.header_cont}>
            <Notification status={notification.status} message={notification.message} modalReturn={notification.modalReturn} render={notification.render} />
            <nav>
                <div>
                    <img width={'130px'} src={'dragonchat_logo_full.svg'} />

                </div>
                <div className={styles.timerCont} onClick={ ()=>{ setModalTimer(true) } } >
                    <div>
                        <div>
                            <h4>10:00</h4>
                        </div>
                    </div>
                </div>
                <div className={styles.menu_cont}>
                    <div className={styles.referir_cont}>
                        <button onClick={()=>{setModalRef(true)}}>
                            <img src="icon_gift.svg" />
                            <span>REFERIR AMIGOS</span>
                        </button>
                    </div>
                    <div className={`${styles.settings_cont} ${rotateAnim && styles.rotate}`} onClick={ ()=>{ setOpenSettings(!openSettings) } }>
                        <img src={iconUrl} />
                    </div>
                </div>
            </nav>
            {modalRef &&
                <div>
                    <div>
                        <ModalContainer closeModal={ ()=> {setModalRef(false)} } addedClass="refAmis">
                            <ModalReferiAmigos notification={notification} setNotification={setNotification} />
                        </ModalContainer>
                    </div>
                </div>
            }
            {modalTimer &&
                <div>
                    <div>
                        <ModalContainer closeModal={ ()=> {setModalTimer(false)} } addedClass="timerModal">
                            <ModalTimer />
                        </ModalContainer>
                    </div>
                </div>
            }
            
        </div>
    
    );
}

export default Header;