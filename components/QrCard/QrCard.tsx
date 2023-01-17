import styles from './QrCard.module.css';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CardTitle from "../cards/CardTitle/CardTitle";
import OrangeBtn from '../OrangeBtn/OrangeBtn';


export interface IQrCard {
    qr_url : string;
}


const socket = io("http://localhost:5002/");

socket.on("connect", () => {
    console.log(socket.id)
});


const QrCard: React.FC<IQrCard> = ({ qr_url }) => {


    const [showQr, setShowQr] = useState<boolean>(false);
    const [loadingQr, setLoadingQr] = useState<boolean>(false);
    const [activeQr, setActiveQr] = useState<string>("");
    const [linkedWhatsapp, setLinkedWhatsapp] = useState(false);
   
    useEffect(()=>{
        setLinkedWhatsapp(JSON.parse(Cookies.get("whatsapp_connected")) == 1);
        
        socket.on('message', function (data) {
            console.log(data);
            if (data.text == '¡Fallo la conexion!') {
                location.reload()
            }
        });
        
        socket.on("connection_qr", (arg) => {
            console.log(arg); // world
            let dragonchat_login = JSON.parse( localStorage.getItem('dragonchat_login') || "{}" );
            dragonchat_login.wpp_connected = true;
            localStorage.setItem("dragonchat_login", JSON.stringify(dragonchat_login));
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
            alert("Whatsapp sincronizado con éxito! Antes de enviar mensajes, asegurate que haya terminado la sincronizacion. Desde tus dispositivos vinculados en la app.")
            location.href = "/"
        });
        
    },[socket])



    function handleEmitID() {
        const locStorage = JSON.parse( localStorage.getItem('dragonchat_login') || "{}" );
        socket.emit('create-session', {
            id: locStorage.user_id.toString(),
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
                        <img src={activeQr} width="75%"/>
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

