import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';
import { SplitInfo } from './DetailSecuence';

export interface IAddChatBox {
    setArrMessages : (arrMessages:IChat[])=> void,
    arrMessages : IChat[],
    setSplitModal : (boolean)=> void,
    splitModal : boolean,
    setSplitModalData : (split:SplitInfo) => void
}
type PossibleType = "texto" | "archivo" | "followup" | "any" | "exclude" | "include" | "split";


const AddChatBox: React.FC<IAddChatBox> = ({ arrMessages, setArrMessages, setSplitModal, splitModal, setSplitModalData }) => {
    
    // animate states
    const [hoverNewSign, setHoverNewSign] = useState(false)

    function addMessage(message:any, color:string, type:PossibleType){

        setArrMessages( [...arrMessages, {message, color, type: type}] )

        // switch (type) {
        //     case "texto":
        //         setArrMessages( [...arrMessages, {message, color, type: "texto"}] )
        //         break;
        //     case "any":
        //         setArrMessages( [...arrMessages, {message, color, type: "any"}] )
        //         break;
        //     case "exclude":
        //         setArrMessages( [...arrMessages, {message, color, type: "exclude"}] )
        //         break;
        //     case "include":
        //         setArrMessages( [...arrMessages, {message, color, type: "include"}] )
        //         break;
        
        
        //     default:
        //         break;
        // }

    }

    // console.log(arrMessages)
 
    return (
        <div
        className={styles.add_new_message_cont}
        onMouseLeave={() => setHoverNewSign(false)}
        // className={arrMessages.length >= 1 ?  styles.abajo : styles.medio }
        style={{ bottom : arrMessages.length >= 1 ?  '5%' : '50%' }}
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
                        <div onClick={ ()=>{addMessage('','blue','texto'); setHoverNewSign(false) } }>
                            <span>Mensaje</span>
                        </div>
                        <div>
                            <span>Archivo Adjunto</span>
                        </div>
                        <div className={styles.followup} onClick={ ()=>{addMessage('','blue','followup'); setHoverNewSign(false) } } >
                            <span>Mensaje Follow-up</span>
                        </div>
                    </motion.div>
                    <motion.div className={styles.red_options}
                            initial={{opacity: 0, y: 0, x : '15%'}}
                            exit={{opacity: 0, y: 0, x : '15%'}}
                            animate={{ opacity: hoverNewSign ? 1 : 0, x: hoverNewSign ? 0 : '15%' , y : 0}}
                            >
                        <div onClick={ ()=>{addMessage('Cualquier respuesta.','red','any'); setHoverNewSign(false) } }>
                            <p>Cualquier Respuesta.</p>
                        </div>
                        <div className={styles.exceptuar} onClick={ ()=>{
                            addMessage({},'red','exclude');
                            setSplitModal(true)
                            setHoverNewSign(false)
                        } }>
                            <p>Exceptuar</p>
                        </div>
                        <div className={styles.solamente} onClick={ ()=>{
                            addMessage({},'red','include');
                            setSplitModal(true)
                            setHoverNewSign(false)
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