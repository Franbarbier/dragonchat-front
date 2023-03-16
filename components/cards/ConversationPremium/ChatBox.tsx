import { useRef, useState } from 'react';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';

export interface IChatBox {
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
    );
}



export default ChatBox;