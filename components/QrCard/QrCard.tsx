import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import apiSenderWhatsappController from '../../api/apiSenderWhatsappController';
import { LOGIN_COOKIE } from '../../constants/ index';
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
    const router = useRouter();
    const [loadingQr, setLoadingQr] = useState<boolean>(false);
    const [activeQr, setActiveQr] = useState<string | null>(null);

    const handleIsConnected = () => {
        setTimeout(async () => {
            const accessToken = JSON.parse(Cookie.get(LOGIN_COOKIE) || '')?.access_token;
            const { data: dataConnect } = await apiSenderWhatsappController.isConnected(accessToken)

            if (dataConnect?.phoneConnected) {
                setLoadingQr(true);
                router.push("/dash")
            } else {
                if (dataConnect?.qrCode !== activeQr) {
                    setActiveQr(dataConnect?.qrCode)
                } else {
                    handleIsConnected();
                }
            }
        }, 4000);
    };

    const dispatchError = () => {
        setNotification({
            status: "error",
            render: true,
            message: "Hubo un error en la conexión, intentalo de nuevo en un minuto.",
            modalReturn: () => {
                setNotification({ ...notification, render: false })
            }
        })
    };

    const handleEmitID = async () => {
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
                    <div>
                        <h4>{'Escanea el QR y aguarda un momento  : )'}</h4>
                        <img src={activeQr} width="75%" alt="qrWhatsappImage" onLoad={handleIsConnected} />
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

