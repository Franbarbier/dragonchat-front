import { useEffect } from 'react';
import { EVENT_KEY, MESSAGE_TYPE, STATUS } from '../../../enums';
import { INotification } from '../../Notification/Notification';
import BasicMessages from '../BasicMessages/BasicMessages';
import CardTitle from '../CardTitle/CardTitle';
import { IChat, ISecuence } from '../ConversationPremium/ConversationPremium';
import MultiMessages from '../MultiMessages/MultiMessages';
import CardStructure from './CardStructure';
import styles from './FreeCard.module.css';

export interface IFreeCard2 {
    activeCard : number;
    selectedSecuence : ISecuence | null;
    setBreadcrumb : (breadcrumb: IChat[]) => void;
    setNotification : (notification: INotification) => void;
    notification : INotification;
    tipoEnvio : string;
    setTipoEnvio : (tab: MESSAGE_TYPE.DIFUSION | MESSAGE_TYPE.CONVERSACION) => void;
    messages : string[][];
    setMessages : (mensajes: string[][]) => void;
    isPaid: boolean;
    nextCard : boolean;
    setActiveCard : (val: number) => void;
    setShowTips : (val: boolean) => void;
}


const FreeCard2: React.FC<IFreeCard2> = ({ activeCard, selectedSecuence, setBreadcrumb, notification, setNotification, tipoEnvio, setTipoEnvio, messages, setMessages, isPaid, nextCard, setActiveCard, setShowTips }) => {

    let idCard = 2;

    useEffect(()=>{
        setBreadcrumb(selectedSecuence?.chat || [])
    },[selectedSecuence])
    
    
    function handleEnter(event) {
        
        if (event.key === EVENT_KEY.ENTER && !event.shiftKey) {
            event.preventDefault()
            setNotification({
                status : STATUS.SUCCESS,
                render : true,
                message : "Para el salto de linea presionar SHIF+ENTER",
                modalReturn : () => {setNotification({...notification, render : false})}
            })

            if ( nextCard ) setActiveCard(activeCard+1)           
        } 

    }




    useEffect(()=>{
        if (activeCard == idCard) {
            document.addEventListener('keydown', handleEnter);
        
            return () => {
                document.removeEventListener('keydown', handleEnter);
            }
        }
    })


    return (
        <CardStructure id_card={idCard} activeCard={activeCard} isPaid={isPaid}>
            <>
            
            {activeCard == idCard &&
            <>
            

            <div className={styles.card_container}>
                <div>
                    <CardTitle text={"Mensaje"} />
                </div>
                <div>
                    </div>
                    {isPaid ?
                            <MultiMessages messages={messages} setMessages={setMessages} notification={notification} setNotification={setNotification} />
                       :
                            <BasicMessages messages={messages} setMessages={setMessages} notification={notification} setNotification={setNotification} />
                    }
            </div>

            <aside className={styles.tipIcon} id="tipIcon" onClick={ ()=> setShowTips(true) }>
                <span>Ayuda</span>
                <img src='./pregunta.png' />
            </aside>
            </>
            }
        </>
        </CardStructure>
    
    );
}

export default FreeCard2;