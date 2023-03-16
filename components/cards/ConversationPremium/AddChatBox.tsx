import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';

export interface IAddChatBox {
    setChat : (chat:IChat[])=> void,
    chat : IChat[],
    setSplitModal : (boolean)=> void,
    splitModal : boolean
}
    
const AddChatBox: React.FC<IAddChatBox> = ({ chat, setChat, setSplitModal, splitModal }) => {
    
    // animate states
    const [hoverNewSign, setHoverNewSign] = useState(false)

    function addMessage(message:string, color:string, type:string){

        switch (type) {
            case "texto":
                setChat( [...chat, {message, color, type: "texto"}] )
                break;
            case "any":
                setChat( [...chat, {message, color, type: "any"}] )
                break;
            case "exclude":
                setChat( [...chat, {message, color, type: "exclude"}] )
                break;
        
            default:
                break;
        }
    }

    // useEffect(()=>{
    //     setChat()
    // }, [excludes])

    return (
        <div
        className={styles.add_new_message_cont}
        onMouseLeave={() => setHoverNewSign(false)}
        // className={chat.length >= 1 ?  styles.abajo : styles.medio }
        style={{ bottom : chat.length >= 1 ?  '5%' : '50%' }}
        >

        <div onMouseEnter={() => setHoverNewSign(true)}>
            <img src='/close.svg' />

            {chat.length > 0 ?
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
                        <div onClick={ ()=>{addMessage('','red','any'); setHoverNewSign(false) } }>
                            <p>Cualquier Respuesta</p>
                        </div>
                        <div className={styles.exceptuar} onClick={ ()=>{
                            // addMessage('','red','exclude');
                            setSplitModal(true)
                            setHoverNewSign(false)
                        } }>
                            <p>Exceptuar</p>
                        </div>
                        <div className={styles.solamente} onClick={ ()=>{addMessage('','red','include'); setHoverNewSign(false) } }>
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