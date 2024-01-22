import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import apiSenderWhatsappController from '../../api/apiSenderWhatsappController';
import { LOGIN_COOKIE } from '../../constants/index';
import { ROUTES, STATUS } from '../../enums';
import Loader from '../Loader/Loader';
import { INotification } from '../Notification/Notification';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import CardTitle from "../cards/CardTitle/CardTitle";
import styles from './QrCard.module.css';

export interface IQrCard {
    notification: INotification,
    setNotification: (notification: INotification) => void,
}

const QrCard: React.FC<IQrCard> = ({ setNotification, notification }) => {
    const [loadingQr, setLoadingQr] = useState<boolean>(false);
    const [activeQr, setActiveQr] = useState<string | null>("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QA4RXhpZgAASUkqAAgAAAABAA4BAgAWAAAAGgAAAAAAAABRUiBjb2RlIC0gSWxsdXN0cmF0aW9u/+0AVFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAA4HAJQAAdwb3Bfam9wHAJ4ABZRUiBjb2RlIC0gSWxsdXN0cmF0aW9uHAJuAAxHZXR0eSBJbWFnZXP/4QUKaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj4KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iICAgeG1sbnM6R2V0dHlJbWFnZXNHSUZUPSJodHRwOi8veG1wLmdldHR5aW1hZ2VzLmNvbS9naWZ0LzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHBob3Rvc2hvcDpDcmVkaXQ9IkdldHR5IEltYWdlcyIgR2V0dHlJbWFnZXNHSUZUOkFzc2V0SUQ9IjgyODA4ODI3NiIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6Ly93d3cuZ2V0dHlpbWFnZXMuY29tL2V1bGE/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");
    const [ connectionSuccess, setConnectionSuccess ] = useState<boolean>(false);

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
                    if(count417 == 40){
                        stopIteration()
                        return false
                    }
                    setLoadingQr(true);
                }
                else{
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
                // Router.push("/")
                clearInterval(intervalId);
                window.location.href = ROUTES.DASH
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

