import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import apiSenderWhatsappController from '../../api/apiSenderWhatsappController';
import apiUserController from '../../api/apiUserController';
import { LOGIN_COOKIE } from '../../constants/index';
import { ROUTES, STATUS } from '../../enums';
import CardTitle from "../cards/CardTitle/CardTitle";
import Loader from '../Loader/Loader';
import { INotification } from '../Notification/Notification';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import styles from './QrCard.module.css';

export interface IQrCard {
    notification: INotification,
    setNotification: (notification: INotification) => void,
}

const QrCard: React.FC<IQrCard> = ({ setNotification, notification }) => {
    const [loadingQr, setLoadingQr] = useState<boolean>(false);
    const [activeQr, setActiveQr] = useState<string | null>(null);
    const [ connectionSuccess, setConnectionSuccess ] = useState<boolean>(false);

    let intervalId;
    function startInterval(accessToken) {
        intervalId = setInterval(async () => {
            const dataConnect = await apiSenderWhatsappController.isConnected(accessToken)

            console.log(dataConnect)
    
            setLoadingQr(false);
    
            console.log("dataaaaa coneeeee",dataConnect)
            
            if (dataConnect?.data?.qrCode && dataConnect?.data?.qrCode.trim() !== "") {
                setActiveQr(dataConnect?.data?.qrCode);
            }else{
                if (dataConnect == 428 || dataConnect == 412) {
                    setLoadingQr(true);
                }else{
                    setNotification({
                        status: STATUS.ERROR,
                        render: true,
                        message: "Hubo un error en la conexión, por favor intentalo de nuevo en un minuto.",
                        modalReturn: () => {
                            setNotification({ ...notification, render: false })
                        }
                    })
                    clearInterval(intervalId);
                    setActiveQr(null)
                }
                
            }
    
            if (dataConnect?.data?.phoneConnected == true) {
                setActiveQr("null")
                setConnectionSuccess(true);
                setNotification({
                    status: STATUS.SUCCESS,
                    render: true,
                    message: "El dispositivo termino de sincronizarse correctamente.",
                    modalReturn: () => {
                        setNotification({ ...notification, render: false })
                    }
                })
                setLoadingQr(true);
                // Router.push("/")
                clearInterval(intervalId);
                window.location.href = ROUTES.DASH
            }

            
        }, 3500); 
    
    }


    const handleIsConnected = async () => {

        setLoadingQr(true)
        const accessToken = JSON.parse(Cookies.get(LOGIN_COOKIE) || '')?.access_token;
        
        const getDAt = await apiUserController.getData(accessToken)
        console.log(getDAt)

        const { data: dataConnection } = await apiSenderWhatsappController.connect(accessToken)
        console.log(dataConnection)
        if (dataConnection) { startInterval(accessToken) }

    }

    // on component dismount clearInterval(intervalId);
    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        }
    });


    return (
        <>
            <Loader loading={loadingQr} />

            <div className={styles.qrCard_cont}>
                <CardTitle text="Vincular dispositivo" />

                {activeQr  && (
                    <div className={styles.qrSteps}>
                        
                        <div className={styles.instruciones_cont}>
                            <div>
                                <img src='/cellphone.svg' />
                                <p>Desde tu WhatsApp</p>
                            </div>
                            <div>
                                    <img src='/settings1.svg' />
                                    <div>
                                        <p>Dispositivos vinculados</p>
                                        <span>(Dentro de "Ajustes" en iOS)</span>
                                    </div>
                            </div>
                            <div>
                                <img src='/touch.svg' />
                                <p> "Vincular un dispositivo"</p>
                            </div>
                        </div>

                        <div className={styles.qrImg_cont}>
                            <h4>{'Escanea el QR y aguarda un momento  : )'}</h4>
                            
                            <div className={styles.flipContainer}>
                                <div className={styles.flip} style={{"transform": `${connectionSuccess && 'rotateY(180deg)' }`}}>
                                    <div className={styles.flipFront}>
                                        <img src={activeQr} alt="qrWhatsappImage"  />  
                                    </div>
                                    <div className={styles.flipBack}>
                                        <p>✅</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
                {!activeQr && (
                    <div style={{ "opacity": loadingQr ? "0.3" : "1" }}>
                        <OrangeBtn text={ !loadingQr ? "Generar QR" : "Generando QR"} onClick={handleIsConnected} />
                    </div>
                )}
            </div>
            <aside className={styles.alertaMsg}>
                <p>Luego que el celular se conecte a Whatsapp aguarda unos segundos y te redirigiremos al dashboard</p>
            </aside>
         
        </>
    );
}

export default QrCard;

