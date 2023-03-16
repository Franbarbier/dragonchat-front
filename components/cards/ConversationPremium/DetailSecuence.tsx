import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';




export interface ISecuencePremium {
    blocked : boolean
    setModalAddMessage : (color:string) => void,
    modalAddMessage : string,
    red_new_message : string,
    setRed_new_message : (e:string) => void,
    blue_new_message : string,
    setBlue_new_message : (e:string) => void,
    addMessage : (message:string, color:string, type: string) => void
    chat : IChat[]
    setChat : (chat:IChat[])=> void
}



interface IChatBox {
    message : IChat,
    setChat : (chat:IChat[])=> void,
    chat : IChat[],
    index : number
}

const ChatBox: React.FC<IChatBox> = ({ message, setChat, chat, index }) => {

    const [txtHeight, setTxtHeight] = useState()

    const textarea = useRef<HTMLTextAreaElement>(null);



    function checkHeight(e){
        if (textarea.current) {   
            textarea.current.style.height = 'auto';
            textarea.current.rows = 1;
            textarea.current.style.height = e.target.scrollHeight+'px'
        }
    }

    // useEffect(()=>{
    //     setChat()
    // }, [excludes])

    return (
        <div className={styles.message_cont} key={`chat${index}`}>
        <div className={`${styles.message}  ${message.color == "blue" ? `${styles.blue_message} ${styles.blue_type}` : `${styles.red_message}
                ${styles.red_type}` }`}>
            <div>
                {message.type == "texto" &&
                    <textarea
                    ref={textarea}
                    onInput={ (e)=>{ checkHeight(e)} }
                    rows={1}
                    placeholder='Escribir mensaje' 
                    >{message.message}</textarea>
                }

                {message.type == "any" &&
                    <p style={{padding : '8px 12px'}}><i>Cualquier respuesta.</i></p>
                }

                {message.type == "exclude" &&
                    <div>
                        <span>Hola</span>
                    </div>
                }

                {message.type == "followup" &&
                    <textarea
                    ref={textarea}
                    onInput={ (e)=>{ checkHeight(e)} }
                    rows={1}
                    placeholder='Escribir mensaje' 
                    >{message.message}</textarea>
                }

            </div>
            <img src="/delete_white.svg" onClick={()=>{ setChat( chat.filter( msg => msg != message  )) }}/>
        </div>
        </div>
    )
}


const DetailSecuence: React.FC<ISecuencePremium> = ({  blocked, setModalAddMessage, modalAddMessage, red_new_message, setRed_new_message, blue_new_message, setBlue_new_message, addMessage, chat, setChat }) => {
    
        
    const idCard = 2


    // animate states
    const [hoverNewSign, setHoverNewSign] = useState(false)

    // primer mensaje
    const [primerMensaje, setPrimerMensaje] = useState(true)

    const [excludeModal, setExcludeModal] = useState<boolean>(false);


    useEffect(()=>{
        console.log(chat)
    }, [chat])

        return (
                        <div style={{'height':'100%'}}>
                            <div className={styles.edit_secuence_cont}>
                                <div className={styles.new_name_cont}>
                                    <div className={styles.icon_upload}>
                                        <img src='/upload.svg' />
                                    </div>
                                    <div className={styles.new_name}>
                                        <input placeholder='Nombre de la secuencia' />
                                    </div>
                                </div>
                                <div className={styles.chat_cont} >
                                    <div className={styles.chat_window}>
                                        <div className={styles.chat} >
                                            {chat.map((message, index)=>(
                                                <ChatBox index={index} message={message} setChat={setChat} chat={chat} />
                                            ))}
                                        </div>
                                    </div>
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
                                                            setExcludeModal(true)
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
                                </div>
                                <div>
                                    <CustomColorBtn
                                        type="submit"
                                        text="Crear secuencia"
                                        backgroundColorInit="#724cdf"
                                        backgroundColorEnd="#3a94fe"
                                        borderColor="#5573f0"
                                        onClick={()=>{console.log('as')}}
                                        disable={ true }
                                    />
                                </div>
                        </div>
                                {excludeModal &&
                                    <div className={styles.excludeModal}>
                                    <div>
                                        <div>
                                            <input />
                                        </div>
                                    </div>
                                </div>
                                }
                    </div>
       );
        
    }
    
    export default DetailSecuence;