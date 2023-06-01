import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';

export interface IAddChatBox {
    setArrMessages : (arrMessages:IChat[])=> void,
    arrMessages : IChat[],
    setSplitModal : (boolean: IChat | null)=> void,
    splitModal : IChat | null,
    scrollToBottom : ()=> void,
    focusLastMessage: ()=> void

}
type PossibleType = "texto" | "archivo" | "followup" | "any" | "exclude" | "include" | "split";


const AddChatBox: React.FC<IAddChatBox> = ({ arrMessages, setArrMessages, setSplitModal, splitModal, scrollToBottom, focusLastMessage}) => {
    
    // animate states
    const [hoverNewSign, setHoverNewSign] = useState(false)

    const [lastMessageType, setLastMessageType] = useState('')

    useEffect(() => {
        setLastMessageType(arrMessages[arrMessages.length - 1]?.type)
    }, [arrMessages])

    function addMessage(message:any, color:string, type:PossibleType){

        if (type == "split" && lastMessageType == "any" ) { return false; }
        if (type == "followup" && lastMessageType != "texto" ) { return false; }
        setArrMessages( [...arrMessages, {info:message, color, type: type}] )
        setTimeout(() => {
            scrollToBottom()
            focusLastMessage()
        }, 100);

    }

    // new split modal layout
    function newSplitModal(type) { 
    
        return {
            type,
            color : 'red',
            info : { name :'',
            key_words : [],
            split_chat : [],
        }}
        
    }


    
    return (
        <div
            className={`${styles.add_new_message_cont} ${ arrMessages.length >= 1 ?  styles.abajo : styles.medio }`}
            onMouseLeave={() => setHoverNewSign(false)}
            // className={arrMessages.length >= 1 ?  styles.abajo : styles.medio }
        >

        <div onMouseEnter={() => setHoverNewSign(true)}>
            <img src='/close.svg' />

            {arrMessages.length > 0 ?
            <AnimatePresence>
            {hoverNewSign &&
                <div className={styles.addMensajeMenu}>
                    <motion.div className={styles.blue_options}
                        initial={{opacity: 0, y: 0, x : '-15%'}}
                        exit={{opacity: 0, y: 0, x : '-15%'}}
                        animate={{ opacity: hoverNewSign ? 1 : 0, x: hoverNewSign ? 0 : '-15%' , y : 0}}
                        >
                        <div onClick={ ()=>{addMessage('','blue','texto'); setHoverNewSign(false);} }>
                            <span>Mensaje</span>
                        </div>
                        <div>
                            <span>Archivo Adjunto</span>
                        </div>
                        <div className={`${styles.followup} ${lastMessageType != "texto" && styles.doNotAdd}`} onClick={ ()=>{addMessage({message:''},'blue','followup'); setHoverNewSign(false) } } >
                            <span>Mensaje Follow-up</span>
                        </div>
                    </motion.div>
                    <motion.div className={styles.red_options}
                            initial={{opacity: 0, y: 0, x : '15%'}}
                            exit={{opacity: 0, y: 0, x : '15%'}}
                            animate={{ opacity: hoverNewSign ? 1 : 0, x: hoverNewSign ? 0 : '15%' , y : 0}}
                            >
                        <div onClick={ ()=>{
                            if (lastMessageType != "any") {
                                addMessage('Cualquier respuesta.','red','any'); setHoverNewSign(false)
                            } 
                            }}>
                            <p>Cualquier Respuesta.</p>
                        </div>
                        <div className={`${styles.exceptuar} ${lastMessageType == "any" && styles.doNotAdd}`} onClick={ ()=>{
                            if (lastMessageType != "any") {   
                                setSplitModal(newSplitModal('exclude'))
                                setHoverNewSign(false)
                            }
                        } }>
                            <p>Exceptuar</p>
                        </div>
                        <div className={`${styles.solamente}  ${lastMessageType == "any" && styles.doNotAdd}`} onClick={ ()=>{
                            if (lastMessageType != "any") {   
                                setSplitModal(newSplitModal('include'))
                                setHoverNewSign(false)
                            }
                            
                        } }>
                            <p>Solamente</p>
                        </div>
                    </motion.div>
                </div>
            }
            </AnimatePresence>
            :
            <div className={styles.noPrevChat}>
                <motion.span
                    onClick={ ()=>{addMessage('','blue', 'texto'); setHoverNewSign(false) } }
                    initial={{opacity: 0, y: '0%', x : '-50%'}}
                    animate={{ opacity: hoverNewSign ? 1 : 0, y: hoverNewSign ? '-50%' : 0 , x : '-50%'}}
                >Mensaje</motion.span>
                <motion.span
                    onClick={ ()=>{setHoverNewSign(false) } }
                    initial={{opacity: 0, y: '0%', x : '-50%'}}
                    animate={{ opacity: hoverNewSign ? 1 : 0, y: hoverNewSign ? '-50%' : '-100%', x : '-50%' }}>Archivo Adjunto</motion.span>

            </div>
            }
        </div>
    </div>
    );
}



export default AddChatBox;