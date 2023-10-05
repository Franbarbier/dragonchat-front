import { default as Cookie } from 'js-cookie';
import { useEffect, useState } from 'react';
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

    const handleIsConnected = () => {
        // setTimeout(async () => {
        //     const accessToken = JSON.parse(Cookie.get(LOGIN_COOKIE) || '')?.access_token;
        //     const { data: dataConnect } = await apiSenderWhatsappController.isConnected(accessToken)

        //     setActiveQr(dataConnect?.qrCode);

        //     if (dataConnect?.phoneConnected) {
        //         setLoadingQr(true);
        //         window.location.href= "/dash";
        //     } else {
        //         if (dataConnect?.qrCode !== activeQr) {
        //             setActiveQr(dataConnect?.qrCode)
        //         } else {
        //             handleIsConnected();
        //         }
        //     }
        // }, 4000);
        console.log("no handle is connected")
    };

    useEffect(() => {
        console.log("activeQr cambio");
    }, [activeQr]);

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






    const handleTest = async () => {

        const accessToken = JSON.parse(Cookie.get(LOGIN_COOKIE) || '')?.access_token;
        const { data: dataConnection } = await apiSenderWhatsappController.connect(accessToken)

        console.log("connection a wpp", dataConnection);

        if (dataConnection) {

            const intervalId = setInterval(async () => {
                
                const dataConnect = await apiSenderWhatsappController.isConnected(accessToken)
                console.log("check user connected ", dataConnect);

                if (dataConnect?.data?.qrCode) {
                    setActiveQr(dataConnect?.data?.qrCode);
                }
                
                if (dataConnect?.data?.phoneConnected) {
                    console.log("phone connected----------------------------", dataConnect.data.phoneConnected);
                    alert("phone connected");
                    clearInterval(intervalId);
                    // set cookie and redirect to dash
                }
                


              }, 3000);
             

        }

        // const getData = await apiUserController.getData(accessToken)

        // console.log("get data ", getData);



        // Changeplan
        // const { data: dataChangePlan } = await apiSubscriptionsController.changePlan(accessToken)

        // console.log("change plan ", dataChangePlan);

    }

    async function initCheck() {
        const accessToken = JSON.parse(Cookie.get(LOGIN_COOKIE) || '')?.access_token;
        const { data: dataConnection } = await apiSenderWhatsappController.connect(accessToken)
   const dataConnect = await apiSenderWhatsappController.isConnected(accessToken)
                console.log("check user connected ", dataConnect);
    }

    useEffect(() => {
        // initCheck();
        // console.log(Cookies.remove("dragonchat_login"))
    }, []);

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
                        <OrangeBtn text="Generar QR" onClick={handleTest} />
                    </div>
                )}
            </div>
        </>
    );
}

export default QrCard;

