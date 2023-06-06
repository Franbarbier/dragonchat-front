import { getCookie } from "cookies-next";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { INotification } from '../Notification/Notification';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import CardTitle from "../cards/CardTitle/CardTitle";
import styles from './QrCard.module.css';

export interface IQrCard {
    qr_url: string;
    linked_whatsapp: boolean;
}

const socket = io(`${process.env.NEXT_PUBLIC_API_SENDER_SOCKET_URL}`)

socket.on("connect", () => {
    console.log(socket.id)
});

const QrCard: React.FC<IQrCard> = ({ qr_url, linked_whatsapp: linkedWhatsapp }) => {
    const [showQr, setShowQr] = useState<boolean>(false);
    const [loadingQr, setLoadingQr] = useState<boolean>(false);
    const [activeQr, setActiveQr] = useState<string>("");
    const [notification, setNotification] = useState<INotification>({
        status: "success",
        render: false,
        message: "",
        modalReturn: () => { }
    })

    useEffect(() => {
        socket.on('message', function (data) {
            if (data.text == '¡Fallo la conexion!') {
                location.reload()
            }
        });

        socket.on("connection_qr", (arg) => {
            console.log(arg); // world
            setActiveQr(arg.src)
            setLoadingQr(false)

        });

        socket.on("connection_status", (data) => {
            console.log(data);
        })

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        socket.on("ready", (err) => {
            setNotification({
                status: "success",
                render: true,
                message: "Whatsapp sincronizado con éxito! Antes de enviar mensajes, asegurate que haya terminado la sincronizacion. Desde tus dispositivos vinculados en la app.",
                modalReturn: () => {
                    setNotification({ ...notification, render: false })
                    location.href = "/"
                }
            })
            setTimeout(() => {
                location.href = "/"
            }, 6000);
        });

    }, [socket])



    function handleEmitID() {
        const userInfo = JSON.parse(String(getCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || '')) || '{}');
        socket.emit('create-session', {
            id: userInfo.user_id.toString(),
        });
        setLoadingQr(true);
    }


    return (
        <div>
            <div className={styles.qrCard_cont}>
                <CardTitle text="Vincular dispositivo" />
                {!linkedWhatsapp ?
                    <p>Vincula tu Whatsapp esacaneando el código QR:</p>
                    :
                    <p>Ya posees un dispositivo vinculado.</p>
                }

                {loadingQr &&
                    <div className={styles.loading_cont}>
                        <p>Generando código, guarde un momento...</p>
                    </div>
                }

                {activeQr != "" ?
                    <div>
                        <img src={activeQr} width="75%" alt="qrWhatsappImage" />
                    </div>
                    : !linkedWhatsapp ?
                        <div style={{ "opacity": loadingQr ? "0.3" : "1" }}>
                            <OrangeBtn text="Generar QR" onClick={() => { handleEmitID() }} />
                        </div>
                        :
                        <div style={{ "opacity": loadingQr ? "0.3" : "1" }}>
                            <OrangeBtn text="IR AL DASH" onClick={() => { window.location.href = "/dash" }} />
                        </div>
                }


            </div>
        </div>



    );
}

export default QrCard;

