import { useEffect, useState } from 'react';
import { STATUS } from '../../enums';
import ModalContainer from '../ModalContainer/ModalContainer';
import ModalPasatePro from '../ModalPasatePro/ModalPasatePro';
import ModalTimer from '../ModalTimer/ModalTimer';
import Notification, { INotification } from '../Notification/Notification';
import styles from './Header.module.css';

export interface IHeader {
    openSettings : boolean;
    setOpenSettings : (settings: boolean) => void,
    isPaid : boolean,
}



// interface contactosArr extends Array<ContactInfo>{}

const Header: React.FC<IHeader> = ({ isPaid, openSettings, setOpenSettings}) => {
    

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
        status : STATUS.SUCCESS,
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
                    {isPaid &&
                        <span className={styles.proLogo}>PRO</span>
                    }
                </div>
                

                <div className={styles.menu_cont}>
                {!isPaid &&
                    <div className={styles.referir_cont}>
                        <button onClick={()=>{setModalRef(true)}}>
                            <img src="corona.png" />
                            <span>PASATE A PRO</span>
                        </button>
                    </div>
                }
                    <div className={`${styles.settings_cont} ${rotateAnim && styles.rotate}`} onClick={ ()=>{ setOpenSettings(!openSettings) } }>
                        <img src={iconUrl} />
                    </div>
                </div>
            </nav>
            {modalRef &&
                <div>
                    <div>
                        <ModalContainer closeModal={ ()=> {setModalRef(false)} } addedClass="pro">
                            {/* <ModalReferiAmigos notification={notification} setNotification={setNotification} /> */}
                            <ModalPasatePro />
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