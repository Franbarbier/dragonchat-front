import Cookie from 'js-cookie';
import { useState } from 'react';
import apiSenderWhatsappController from '../../api/apiSenderWhatsappController';
import { LOGIN_COOKIE } from '../../constants/ index';
import { STATUS } from '../../enums';
import CardTitle from "../cards/CardTitle/CardTitle";
<<<<<<< HEAD
=======
import Loader from '../Loader/Loader';
>>>>>>> develop
import { INotification } from '../Notification/Notification';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import styles from './QrCard.module.css';

export interface IQrCard {
    notification: INotification,
    setNotification: (notification: INotification) => void,
}

const QrCard: React.FC<IQrCard> = ({ setNotification, notification }) => {
    const [loadingQr, setLoadingQr] = useState<boolean>(false);
<<<<<<< HEAD
    const [activeQr, setActiveQr] = useState<string>("");
    
    const [notification, setNotification] = useState<INotification>({
        status : "success",
        render : false,
        message : "",
        modalReturn : ()=>{}
    })

    const linkedWhatsapp = linked_whatsapp;
   
    useEffect(()=>{
        socket.on('message', function (data) {
            if (data.text == '¡Fallo la conexion!') {
                location.reload()
=======
    const [activeQr, setActiveQr] = useState<string | null>(null);

    const handleIsConnected = () => {
        setTimeout(async () => {
            const accessToken = JSON.parse(Cookie.get(LOGIN_COOKIE) || '')?.access_token;
            const { data: dataConnect } = await apiSenderWhatsappController.isConnected(accessToken)

            if (dataConnect?.phoneConnected) {
                setLoadingQr(true);
                window.location.href= "/dash";
            } else {
                if (dataConnect?.qrCode !== activeQr) {
                    setActiveQr(dataConnect?.qrCode)
                } else {
                    handleIsConnected();
                }
>>>>>>> develop
            }
        }, 4000);
    };

    const dispatchError = () => {
        setNotification({
            status: STATUS.ERROR,
            render: true,
            message: "Hubo un error en la conexión, intentalo de nuevo en un minuto.",
            modalReturn: () => {
                setNotification({ ...notification, render: false })
            }
        })
    };

<<<<<<< HEAD
        socket.on("ready", (err) => {
            setNotification({
                status : "success",
                render : true,
                message : "Whatsapp sincronizado con éxito! Antes de enviar mensajes, asegurate que haya terminado la sincronizacion. Desde tus dispositivos vinculados en la app.",
                modalReturn : () => {
                    setNotification({...notification, render : false})
                    location.href = "/"
                }})
            setTimeout(() => {
                location.href = "/"
            }, 6000);
        });
        
    },[socket])



    function handleEmitID() {
        const userInfo = JSON.parse( Cookie.get('dragonchat_login') || "{}" );
        socket.emit('create-session', {
            id: userInfo.user_id.toString(),
        });
=======
    const handleEmitID = async () => {
>>>>>>> develop
        setLoadingQr(true);

        const accessToken = JSON.parse(Cookie.get(LOGIN_COOKIE) || '')?.access_token;
        const { data: dataConnect } = await apiSenderWhatsappController.connect(accessToken)

        if (dataConnect) {
            const { data: dataQr } = await apiSenderWhatsappController.getQR(accessToken)

            if (dataQr?.qr) {
                setActiveQr(dataQr.qr);
            } else {
                dispatchError();
            }
        } else {
            dispatchError();
        }

        setLoadingQr(false);
    };

    return (
        <>
            <Loader loading={loadingQr} />

            <div className={styles.qrCard_cont}>
                <CardTitle text="Vincular dispositivo" />

                {activeQr && (
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
                            <img src={activeQr} alt="qrWhatsappImage" onLoad={handleIsConnected} />
                        </div>

                    </div>
                )}
                {!activeQr && (
                    <div style={{ "opacity": loadingQr ? "0.3" : "1" }}>
                        <OrangeBtn text="Generar QR" onClick={handleEmitID} />
                    </div>
                )}
            </div>
        </>
    );
}

export default QrCard;

