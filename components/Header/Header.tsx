import Cookie from 'js-cookie';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import apiUserController from '../../api/apiUserController';
import { LOGIN_COOKIE } from '../../constants/index';
import { ROUTES, STATUS } from '../../enums';
import Loader from '../Loader/Loader';
import ModalCalentador from '../ModalCalentador/ModalCalentador';
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
    const [modalPro, setModalPro] = useState<boolean>(false)
    const [modalTimer, setModalTimer] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)

    const [calentador, setCalentador] = useState<boolean>(false)
    const [calentadorModal, setCalentadorModal] = useState<boolean>(false)


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


    useEffect(()=>{
        if (calentador){
            setCalentadorModal(true)
        }
    }, [calentador])
    
    return (
        <div className={styles.header_cont}>
            <Loader loading={loading} />
            <Notification status={notification.status} message={notification.message} modalReturn={notification.modalReturn} render={notification.render} />
            <nav>
                <div>
                    <img width={'130px'} src={'dragonchat_logo_full.svg'} onClick={()=> logoClicked() } />
                    
                        {isPaid ? <span className={`${styles.proGradient} ${styles.proLogo}`}>2.0</span> : <span className={styles.proLogo} style={{"cursor": "pointer"}} onClick={()=> setModalPro(true)}>1.0</span>}
                    
                </div>
                

                <div className={styles.menu_cont}>
                {!isPaid &&
                    <div className={styles.referir_cont}>
                        <ProBtn onClick={()=>{setModalPro(true)}}/>
                    </div>
                }
                {!qr &&
                <>
                    <div className={styles.calentadorCont} onClick={ ()=> setCalentador(!calentador) }>
                        <span>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500</span>
                        <div className={`${calentador && styles.calentadorOn }`}>
                            <div className={styles.trackToggle}></div>
                            <div className={styles.calentadorIcon}>
                                <img src='icon_fire2.svg' onClick={()=> console.log(":sddd") } />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.settings_cont} ${rotateAnim && styles.rotate}`} onClick={ ()=>{ setOpenSettings(!openSettings) } }>
                        <img src={iconUrl} />
                    </div>
                </>
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
            {calentadorModal &&
                <div>
                    <div>
                        <ModalContainer closeModal={ ()=> {setCalentadorModal(false)} } addedClass="timerModal">
                            <ModalCalentador setCalentadorModal={setCalentadorModal}/>
                        </ModalContainer>
                    </div>
                </div>
            }
            
        </div>
    
    );
}

export default Header;