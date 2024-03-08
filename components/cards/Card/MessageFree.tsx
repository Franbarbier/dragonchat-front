import { useEffect } from 'react';
import { MESSAGE_TYPE } from '../../../enums';
import { INotification } from '../../Notification/Notification';
import BasicMessages from '../BasicMessages/BasicMessages';
import CardTitle from '../CardTitle/CardTitle';
import { IChat, ISecuence } from '../ConversationPremium/ConversationPremium';
import MultiMessages from '../MultiMessages/MultiMessages';
import styles from './FreeCard.module.css';

export interface IFreeCard2 {
    activeCard : number;
    setSelectedSecuence:  (secuence: ISecuence | null) => void;
    selectedSecuence : ISecuence | null;
    setBreadcrumb : (breadcrumb: IChat[]) => void;
    setNotification : (notification: INotification) => void;
    notification : INotification;
    tipoEnvio : string;
    setTipoEnvio : (tab: MESSAGE_TYPE.DIFUSION | MESSAGE_TYPE.CONVERSACION) => void;
    activeSecuence : number | null;
    setActiveSecuence : (id: number | null) => void;
    messages : string[][];
    setMessages : (mensajes: string[][]) => void;
    isPaid: boolean;
}


const FreeCard2: React.FC<IFreeCard2> = ({ activeCard, setSelectedSecuence, selectedSecuence, setBreadcrumb, notification, setNotification, tipoEnvio, setTipoEnvio, activeSecuence, setActiveSecuence, messages, setMessages, isPaid }) => {

    let idCard = 2;

    useEffect(()=>{
        setBreadcrumb(selectedSecuence?.chat || [])
    },[selectedSecuence])
    


    return (
        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>{}} key={`card${idCard}`} >
            
            {activeCard == idCard &&
            <>
            <img src="/trama-car.svg" className={`${styles.tramaBottom} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaLeft} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaRight} ${styles.tramas}`} />
            <div className={styles.card_container}>
                <div>
                    <CardTitle text={"Mensaje"} />
                </div>
                <div>
                     {/* <div className={styles.tabs_cont}>
                        <div>
                            <div className={`${styles.difu_tab} ${tipoEnvio == MESSAGE_TYPE.DIFUSION && styles.active_tab}`}
                            onClick={ ()=>{ setTipoEnvio(MESSAGE_TYPE.DIFUSION) } }
                            >
                                <h6>Difusión</h6>
                            </div>
                           <div className={`${styles.conv_tab} ${tipoEnvio == MESSAGE_TYPE.CONVERSACION && styles.active_tab}`}
                            onClick={ ()=>{ setTipoEnvio(MESSAGE_TYPE.CONVERSACION) } }
                            >
                                <h6>Conversación</h6>
                            </div> 
                        </div>
                    </div>*/}
                    </div>
                    {isPaid ?
                            <MultiMessages messages={messages} setMessages={setMessages} notification={notification} setNotification={setNotification} />
                       :
                            <BasicMessages messages={messages} setMessages={setMessages} notification={notification} setNotification={setNotification} />
                    }
            </div>
            </>}

        </div>
    
    );
}

export default FreeCard2;