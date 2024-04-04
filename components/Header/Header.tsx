import Cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import apiUserController from '../../api/apiUserController';
import { LOGIN_COOKIE } from '../../constants/index';
import { ROUTES, STATUS } from '../../enums';
import Loader from '../Loader/Loader';
import ModalContainer from '../ModalContainer/ModalContainer';
import ModalPasatePro from '../ModalPasatePro/ModalPasatePro';
import ModalTimer from '../ModalTimer/ModalTimer';
import Notification, { INotification } from '../Notification/Notification';
import ProBtn from '../PasateAPro/PasateAPro';
import styles from './Header.module.css';

export interface IHeader {
    openSettings : boolean;
    setOpenSettings : (settings: boolean) => void,
    isPaid : boolean,
    qr?: boolean
}



// interface contactosArr extends Array<ContactInfo>{}

const Header: React.FC<IHeader> = ({ isPaid, openSettings, setOpenSettings, qr=false}) => {
    

    const [iconUrl, setIconUrl] = useState<string>('icon_config.svg')
    const [rotateAnim, setRotateAnim] = useState<boolean>(false)
    const [buleano, setBuleano] = useState<boolean>(false)
    const [modalPro, setModalPro] = useState<boolean>(false)
    const [modalTimer, setModalTimer] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)


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


    const logoutBtnStyle = {
        'width': '100%',
        'padding': '8px 16px',
        'borderRadius': '5px',
        'backgroundColor': '#000',
        'border': '1px solid var(--amarillo)',
        'color': 'var(--amarillo)',
        'cursor': 'pointer',
        'letterSpacing': '1px',
      }
      async function handleLogout() {
    
        setLoading(true)
    
        try {
          const accessToken = JSON.parse(Cookie.get(LOGIN_COOKIE)).access_token;
        
          const response = await apiUserController.logout(accessToken);
    
          if (response) {
            Cookie.remove(LOGIN_COOKIE);
            Router.push(`${ROUTES.LOGIN}`);
            setLoading(false)
          }
    
        } catch (error: any) {
            setLoading(false)
        }
      }


    const logoClicked = () => {
        setNotification({
            status : STATUS.ALERT,
            message : "Deseas volver al incio? Los contactos y mensajes cargados se perderán. Y si hay un envío en curso, se cancelará.",
            render : true,
            modalReturn : (booleanReturn)=>{
                    setNotification({...notification, render : false })
                    if ( booleanReturn ) {
                        window.location.href = ROUTES.DASH;
                }
            }
        })
    }

    return (
        <div className={styles.header_cont}>
            <Loader loading={loading} />
            <Notification status={notification.status} message={notification.message} modalReturn={notification.modalReturn} render={notification.render} />
            <nav>
                <div>
                    <img width={'130px'} src={'dragonchat_logo_full.svg'} onClick={()=> logoClicked() } />
 
                </div>
                

                <div className={styles.menu_cont}>
                {!isPaid &&
                    <div className={styles.referir_cont}>
                        <ProBtn onClick={()=>{setModalPro(true)}}/>
                    </div>
                }
                {!qr &&
                    <div className={`${styles.settings_cont} ${rotateAnim && styles.rotate}`} onClick={ ()=>{ setOpenSettings(!openSettings) } }>
                        <img src={iconUrl} />
                    </div>
                }
                </div>
               
                {qr &&
                    <div style={{"width":"fit-content"}}>
                        <button
                        onClick={handleLogout}
                        style={logoutBtnStyle}
                        >LOG OUT</button>

                    </div>
                 }
            </nav>
            {modalPro &&
                <div>
                    <div>
                        <ModalContainer closeModal={ ()=> {setModalPro(false)} } addedClass="pro">
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