import { useEffect } from 'react';
import { INotification } from '../../Notification/Notification';
import CardTitle from '../CardTitle/CardTitle';
import ConversationPremium, { IChat, ISecuence } from '../ConversationPremium/ConversationPremium';
import styles from './FreeCard.module.css';

export interface IFreeCard2 {
    setActiveCard: (id: number) => void,
    activeCard : number;
    mensaje : string;
    setMensaje: (msj: string) => void;
    setSelectedSecuence:  (secuence: ISecuence | null) => void;
    selectedSecuence : ISecuence | null;
   
    setBreadcrumb : (breadcrumb: IChat[]) => void;
    notification : INotification;
    setNotification : (notification: INotification) => void;
    tipoEnvio : string;
    setTipoEnvio : (tab: "difusion" | "conversacion") => void;
}

const FreeCard2: React.FC<IFreeCard2> = ({ setActiveCard, activeCard, mensaje, setMensaje, setSelectedSecuence, selectedSecuence, setBreadcrumb, notification, setNotification, tipoEnvio, setTipoEnvio }) => {

    let idCard = 2;

    useEffect(()=>{
        setBreadcrumb(selectedSecuence?.chat || [])
    },[selectedSecuence])
    


    return (
        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>{}}>
            <img src="/trama-car.svg" className={`${styles.tramaBottom} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaLeft} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaRight} ${styles.tramas}`} />
            <div className={styles.card_container}>
                <div>
                    <CardTitle text={"Mensaje"} />
                </div>
                <div>
                    <div className={styles.tabs_cont}>
                        <div>
                            <div className={`${styles.difu_tab} ${tipoEnvio == "difusion" && styles.active_tab}`}
                            onClick={ ()=>{ setTipoEnvio("difusion") } }
                            >
                                <h6>Difusión</h6>
                            </div>
                            <div className={`${styles.conv_tab} ${tipoEnvio == "conversacion" && styles.active_tab}`}
                            onClick={ ()=>{ setTipoEnvio("conversacion") } }
                            >
                                <h6>Conversación</h6>
                            </div>
                        </div>
                    </div>
                    </div>
                    {tipoEnvio == "difusion" ?
                        <div className={styles.options_cont}>
                            <div className={styles.message}>
                                <textarea placeholder='Utilizando la variable `[name]` en tu mensaje, la misma será reemplazada por el nombre de cada uno de los destinatarios definidos en la sección anterior. Ejemplo: `Hola [name], tengo algo para enviarte que te va a encantar`' value={mensaje} onChange={ (e)=>{ setMensaje(e.target.value) } } />
                            </div>
                        </div>
                        :
                        <div>
                            <ConversationPremium blocked={true} setSelectedSecuence={setSelectedSecuence} selectedSecuence={selectedSecuence} notification={notification} setNotification={setNotification} />
                        </div>

                    }
            </div>
        </div>
    
    );
}

export default FreeCard2;