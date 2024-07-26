import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import apiSenderWhatsappController from '../../api/apiSenderWhatsappController';
import { LOGIN_COOKIE } from '../../constants/index';
import { ROUTES, STATUS } from '../../enums';
import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import Loader from '../Loader/Loader';
import { INotification } from '../Notification/Notification';
import CardTitle from "../cards/CardTitle/CardTitle";
import styles from './QrCard.module.css';

export interface IQrCard {
    notification: INotification,
    setNotification: (notification: INotification) => void,
    isPaid: boolean,
    setModalIP : (modalIP: boolean) => void
}

const QrCard: React.FC<IQrCard> = ({ setNotification, notification, isPaid, setModalIP}) => {
    const [loadingQr, setLoadingQr] = useState<boolean>(false);
    const [activeQr, setActiveQr] = useState<string | null>(null);
    const [ connectionSuccess, setConnectionSuccess ] = useState<boolean>(false);

    const [errorQRModal, setErrorQRModal] = useState<boolean>(false);
    const [errorCounter, setErrorCounter] = useState<number>(0);
    const maxErrorCounter = 6;

    let intervalId;

    let count417 = 0;

    function startInterval(accessToken) {
        
        intervalId = setInterval(async () => {
            
            const dataConnect = await apiSenderWhatsappController.isConnected(accessToken)
            
            setLoadingQr(false);

            
            if (dataConnect?.data?.qrCode && dataConnect?.data?.qrCode.trim() !== "") {
                setActiveQr(dataConnect?.data?.qrCode);
            }else{

                if (dataConnect == 428 || dataConnect == 412 || dataConnect == 417) {
                    count417++;
                    setLoadingQr(true);
                    if(count417 == 40){
                        stopIteration()
                        return false
                    }
                }else if( dataConnect == 423){
                    setModalIP(true)
                    stopIteration()
                    return false
                
                }else{
                    stopIteration()
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
                clearInterval(intervalId);
                Cookies.set('syncTime',  new Date() )
                window.location.href = ROUTES.SYNCING
                
            }

        }, 3500); 
    
    }


        
    function stopIteration(){
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

        if (!isPaid) {
            setErrorQRModal(true)
            setErrorCounter(errorCounter + 1)
            setTimeout(() => {
                setErrorQRModal(false)
            }, 25000);
        }
    }

    const handleIsConnected = async () => {

        setLoadingQr(true)
        const accessToken = JSON.parse(Cookies.get(LOGIN_COOKIE) || '')?.access_token;
        const dataConnection = await apiSenderWhatsappController.connect(accessToken)
        
        if (dataConnection?.status == 200 || dataConnection?.status == 201 ) {
            startInterval(accessToken)
        }else{
            setLoadingQr(false)
            setNotification({
                status: STATUS.ERROR,
                render: true,
                message: "No se pudo establecer la conexion a WhatsApp.",
                modalReturn: () => {
                    setNotification({ ...notification, render: false })
                }
            })
        }


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
                    <>
                    <img src="escaneo-de-codigo-qr.png" className={styles.qrIcon} />
                    <div className={styles.qrGenBtn} style={{ "opacity": loadingQr ? "0.3" : "1" }}>

                        <CustomColorBtn
                            type="submit"
                            text={ !loadingQr ? "Generar QR" : "Generando QR"} 
                            backgroundColorInit={ "#c21c3b" }
                            backgroundColorEnd={ "#f9bd4f" }
                            borderColor={ "#e17846"}
                            onClick={() => {
                                handleIsConnected()
                            }}
                            disable={ loadingQr }
                      />
                    </div>
                    </>
                )}
            </div>

            <AnimatePresence>
                {errorQRModal && (
                    <motion.div
                        className={styles.errorQRModal}
                        initial={{ opacity: 0 , y: 30}}
                        animate={{ opacity: 1 , y: 0}}
                        exit={{ opacity: 0 , y: 30}}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        
                    >
                        <img src="/dragon_anim2.gif" alt="dragon-chat"/>

                        <div>
                            <h3>No se pudo establecer la conexion a WhatsApp. No te preocupes! Simplemente vuelve a intentarlo.</h3>
                            <p>Podrias <strong>intentalo hasta {maxErrorCounter} veces</strong> por favor para asegurarse que se genere el código QR correctamente.</p>
                            <span style={{ "color": errorCounter > maxErrorCounter ? "red" : "" }}>{errorCounter <= maxErrorCounter ? errorCounter : maxErrorCounter }/ {maxErrorCounter}</span>
                            {errorCounter > maxErrorCounter && (<p style={{"fontWeight": "600"}}>Contactate con soporte para resolver el problema</p>)}
                            
                        </div>
                    </motion.div>      
                )}
            </AnimatePresence>
            <aside className={styles.alertaMsg}>
                <p>Luego que el celular se conecte a Whatsapp aguarda unos segundos y te redirigiremos al dashboard</p>
            </aside>
         
        </>
    );
}

export default QrCard;

