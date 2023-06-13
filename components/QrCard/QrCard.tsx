import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CardTitle from "../cards/CardTitle/CardTitle";
import { INotification } from '../Notification/Notification';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import styles from './QrCard.module.css';


export interface IQrCard {
    linked_whatsapp: boolean;
}


const socket = io(`${process.env.NEXT_PUBLIC_API_SENDER_SOCKET_URL}`)




const QrCard: React.FC<IQrCard> = ({ linked_whatsapp }) => {

    const [loadingQr, setLoadingQr] = useState<boolean>(false);
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
            }
        });
        
        socket.on("connection_qr", (arg) => {
            setActiveQr(arg.src)
            setLoadingQr(false)

        });
        



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
        setLoadingQr(true);
    }


    return (
        <div>
            <div className={styles.qrCard_cont}>
                <CardTitle text="Vincular dispositivo" />
                {!linkedWhatsapp?
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
                        <img src={activeQr} width="75%" alt="qrWhatsappImage"/>
                    </div>
                :   !linkedWhatsapp ?
                    <div style={ {"opacity": loadingQr ? "0.3" : "1"}  }>
                        <OrangeBtn text="Generar QR" onClick={()=>{ handleEmitID()}} />
                    </div>
                : 
                    <div style={ {"opacity": loadingQr ? "0.3" : "1"}  }>
                        <OrangeBtn text="IR AL DASH" onClick={()=>{ window.location.href = "/dash"  }} />
                    </div>
                }

                
            </div>
        </div>
        
        
    
    );
}

export default QrCard;

