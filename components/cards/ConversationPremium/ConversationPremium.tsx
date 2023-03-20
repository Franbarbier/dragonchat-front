import React, { useEffect, useRef, useState } from 'react';
import BlockedPreVisual from './BlockedPreVisual';
import styles from './ConversationPremium.module.css';
import DetailSecuence from './DetailSecuence';

export interface IConversationPremium {
    blocked : boolean;
}

export interface IChat {
    message : any,
    color : string,
    type : "texto" | "archivo" | "followup" | "any" | "exclude" | "include" | "split";
}
export interface ISecuence {
    nombre : string,
    icono : string,
    chat? : IChat[]
}

export interface ISecuencePremium {
    blocked : boolean
    setModalAddMessage : (color:string) => void,
    modalAddMessage : string,
    red_new_message : string,
    setRed_new_message : (e:string) => void,
    blue_new_message : string,
    setBlue_new_message : (e:string) => void,
    addMessage : (message:string, color:string, type:string) => void
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


    return (
        <div className={styles.message_cont} key={`chat${index}`}>
        <div className={`${styles.message}  ${message.color == "blue" ? `${styles.blue_message} ${styles.blue_type}` : `${styles.red_message}
                ${styles.red_type}` }`}>
            <div>
                <textarea
                    ref={textarea}
                    onInput={ (e)=>{ checkHeight(e)} }
                    rows={1}
                    placeholder='Escribir mensaje' 
                >{message.message}</textarea>
            </div>
            <img src="/delete_white.svg" onClick={()=>{ setChat( chat.filter( msg => msg != message  )) }}/>
        </div>
        </div>
    )
}



const ConversationPremium: React.FC<IConversationPremium> = ({ blocked }) => {
    
    const idCard = 2
 
    const [editSecuence, setEditSecuence] = useState([])
    const [selectedSecuence, setSelectedSecuence] = useState<ISecuence | null>(null)
    const [secuenciasCreadas, setSecuenciasCreadas] = useState<ISecuence[]>([])

    const [activeSecuence, setActiveSecuence] = useState<ISecuence | null>(null)

    const [chat, setChat] = useState<IChat[]>([])

    const [modalAddMessage, setModalAddMessage] = useState('')
    const [red_new_message, setRed_new_message] = useState('')
    const [blue_new_message, setBlue_new_message] = useState('')

    // animate states
    const [hoverNewSign, setHoverNewSign] = useState(false)

    // primer mensaje
    const [primerMensaje, setPrimerMensaje] = useState(true)

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
    function new_secuence() {
        console.log('crear y renderizar secuencia nueva')
        setSelectedSecuence({
            nombre : '',
            icono : ''
        })
    }

    useEffect(()=>{
        console.log(activeSecuence)
        
    },[activeSecuence])


    return (            
        <div className={` ${styles.SecuencePremiumCard}`} >
            {!blocked ?
            <>
                {!selectedSecuence ?
                    <div>
                        <div className={styles.gridSecuences}>
                            <div className={styles.addNewSecuence} onClick={()=>{new_secuence()}}>
                                <img src='/close.svg' />
                            </div>
                            {secuenciasCreadas.map((secuen, index)=>(
                                <div>
                                    <img />
                                </div>
                            ))

                            }
                           
                        </div>
                        
                    </div>
                :
                    <DetailSecuence blocked={blocked} setModalAddMessage={setModalAddMessage} modalAddMessage={modalAddMessage} red_new_message={red_new_message} setRed_new_message={setRed_new_message} blue_new_message={blue_new_message} setBlue_new_message={setBlue_new_message} addMessage={addMessage} chat={chat} setChat={setChat}  />
                }
            </>
            :
                <BlockedPreVisual blocked={blocked} setModalAddMessage={setModalAddMessage} modalAddMessage={modalAddMessage} red_new_message={red_new_message} setRed_new_message={setRed_new_message} blue_new_message={blue_new_message} setBlue_new_message={setBlue_new_message} addMessage={addMessage} chat={chat} setChat={setChat}   />
            }
        </div>
        
    );
    
}

export default ConversationPremium;