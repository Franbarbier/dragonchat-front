import { useRef, useState } from 'react';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';
import { SplitInfo } from './DetailSecuence';

export interface IChatBox {
    message : IChat,
    setChat : (chat:IChat[])=> void,
    chat : IChat[],
    index : number,
    setSplitModal : (bool:boolean) => void,
    setSplitModalData : (infoSecuen:SplitInfo) => void,
    splitModalData : SplitInfo,
    chatIndex: number,
    setChatIndex: (i:number) => void
}
    
const ChatBox: React.FC<IChatBox> = ({ message, setChat, chat, index, setSplitModal, setSplitModalData, splitModalData, chatIndex, setChatIndex}) => {
    
    const [txtHeight, setTxtHeight] = useState()
    // const [stateMsg, setStateMesg] = useState( message ? message : [] )
    // const stateMsg = message ? message : [] 
    
    const textarea = useRef<HTMLTextAreaElement>(null);


    function checkHeight(e){
        if (textarea.current) {   
            textarea.current.style.height = 'auto';
            textarea.current.rows = 1;
            textarea.current.style.height = e.target.scrollHeight+'px'
        }
    }




    return (
        <>
        {message.type != "exclude" && message.type != "include" ?
        
        <div className={styles.message_cont} key={`chat${index}`}>
        <div className={`${styles.message}  ${message.color == "blue" ? `${styles.blue_message} ${styles.blue_type}` : `${styles.red_message}
                ${styles.red_type}` }`}>
            <div>
                {message.type == "texto" &&
                    <textarea
                    ref={textarea}
                    onInput={ (e)=>{ checkHeight(e); } }
                    onChange={(e)=>{
                        let copyChat = [...chat]
                        copyChat[index].message = e.target.value
                        setChat([...chat, ])
                        } 
                    }
                    rows={1}
                    placeholder='Escribir mensaje' 
                    >{message.message}</textarea>
                }

                {message.type == "any" &&
                    <p style={{padding : '8px 12px'}}><i>Cualquier respuesta.</i></p>
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

        :
            <div className={styles.splitMsgCont}
                onClick={()=>{
                    setSplitModal(true)
                    console.log(index)
                    setSplitModalData(message.message)
                    setChatIndex(index)
                }}
            >
                    <p>{message.message.name}</p>
            </div>

        }
        </>

    );
}



export default ChatBox;