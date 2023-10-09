import { default as Cookie } from 'js-cookie';
import Router from 'next/router';
import { useState } from 'react';
import apiSenderWhatsappController from '../../api/apiSenderWhatsappController';
import { LOGIN_COOKIE } from '../../constants/index';
import { STATUS } from '../../enums';
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

    const handleIsConnected = async () => {

        setLoadingQr(true)

        const accessToken = JSON.parse(Cookie.get(LOGIN_COOKIE) || '')?.access_token;
        const { data: dataConnection } = await apiSenderWhatsappController.connect(accessToken)

        if (dataConnection) {
            
            const intervalId = setInterval(async () => {
                const dataConnect = await apiSenderWhatsappController.isConnected(accessToken)
                setLoadingQr(false);
                if (dataConnect?.data?.qrCode) {
                    setActiveQr(dataConnect?.data?.qrCode);
                }
                if (dataConnect?.data?.phoneConnected) {
                    clearInterval(intervalId);
                    Router.push("/dash")
                }
              }, 3500);
        }
    }


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
                            <img src={activeQr} alt="qrWhatsappImage"  />
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

