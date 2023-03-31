import { useEffect, useRef, useState } from 'react';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';

export interface IChatBox {
    message : IChat,
    setChat : (chat:IChat[])=> void,
    chat : IChat[],
    index : number,
    setSplitModal : (modalData:IChat | null) => void,
    splitModal : IChat | null,
    setParentIndex : (i:number) => void
}
    
const ChatBox: React.FC<IChatBox> = ({ message, setChat, chat, index, setSplitModal, splitModal, setParentIndex}) => {
    
    const [txtHeight, setTxtHeight] = useState()
    const [previewSplit, setPreviewSplit] = useState<boolean>( false )
    const [timerInfo, setTimerInfo] = useState<boolean>(false)
    const [fupDelay, setFupDelay] = useState({
        hours: "00",
        mins: "00",
        secs: "00"
    })
    
    const textarea = useRef<HTMLTextAreaElement>(null);


    function checkHeight(e){
        if (textarea.current) {   
            textarea.current.style.height = 'auto';
            textarea.current.rows = 1;
            textarea.current.style.height = e.target.scrollHeight+'px'
        }
    }


    useEffect(()=>{
        if (message.type == "followup") {
            let copyChat = [...chat]
            copyChat[index].info.delay = fupDelay
            console.log(copyChat[index])
            setChat(copyChat)
        }
    }, [fupDelay])

    const delayTimer = useRef(null);
    useOutsideAlerter(delayTimer);

    function useOutsideAlerter(ref) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setTimerInfo(false)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }


    return (
        <div key={`mensajeChat${index}`}>
        {message.type != "exclude" && message.type != "include" ?
        
        <div className={styles.message_cont} key={`chat${index}`}>
        <div className={`${styles.message} ${message.color == "blue" ? `${styles.blue_message} ${styles.blue_type}` : `${styles.red_message}
                ${styles.red_type}` } `}>
            <div>
                {message.type == "texto" &&
                    <textarea
                    ref={textarea}
                    onInput={ (e)=>{ checkHeight(e); } }
                    onChange={(e)=>{
                        let copyChat = [...chat]
                        copyChat[index].info = e.target.value
                        setChat(copyChat)
                        } 
                    }
                    rows={1}
                    placeholder='Escribir mensaje' 
                    >{message.info}</textarea>
                }

                {message.type == "any" &&
                    <p style={{padding : '8px 12px'}}><i>Cualquier respuesta.</i></p>
                }

                {message.type == "followup" &&
                    <>
                        <textarea
                        ref={textarea}
                        onInput={ (e)=>{ checkHeight(e)} }
                        rows={1}
                        placeholder='Escribir mensaje'
                        onChange={(e)=>{
                            let copyChat = [...chat]
                            copyChat[index].info.message = e.target.value
                            setChat(copyChat)
                            }
                        }
                        >{message.info.message}</textarea>
                        <p className={styles.fup}
                            onClick={()=>{ setTimerInfo(true); } }
                            ref={delayTimer}
                        >
                            <img src="/timer.svg"
                                style={{ opacity: timerInfo ? 1 : 0.7 }}
                            />
                            {timerInfo && 
                                <div>
                                    {/* <span>5min</span> */}
                                    <input type="number" value={fupDelay.hours} onChange={
                                        (e)=>{if(e.target.value.length < 3 ) setFupDelay({...fupDelay, hours : e.target.value})}    
                                    }/>
                                    <span>:</span>
                                    <input type="number" value={fupDelay.mins} onChange={
                                        (e)=>{if(e.target.value.length < 3 ) setFupDelay({...fupDelay, mins : e.target.value})}    
                                    }/>
                                    <span>:</span>
                                    <input type="number" value={fupDelay.secs} onChange={
                                        (e)=>{if(e.target.value.length < 3 ) setFupDelay({...fupDelay, secs : e.target.value})}    
                                    }/>
                                </div>
                            }
                        </p>
                    </>
                }


            </div>
            <img src="/delete_white.svg" onClick={()=>{ setChat( chat.filter( msg => msg != message  )) }}/>
        </div>
        </div>

        :
        // En caso que sea split :
            <>
                <div className={styles.splitMsgCont}
                    onClick={()=>{
                        setPreviewSplit(!previewSplit)
                    }}
                    >
                    <p><b>SPLIT | </b>{message.info.name}</p>

                    <div className={styles.splitEditNDelete}>
                        <div>
                            <img src="/pencil1.svg" alt="edit split"
                                onClick={()=>{
                                    setSplitModal(message)
                                    setParentIndex(index)
                                }}
                            />
                        </div>
                        <div>
                            <img src="/delete_white.svg" alt="edit split"  onClick={()=>{
                                    if (confirm("Desea eliminar este split?")) {
                                        setChat( chat.filter( msg => msg != message  ))
                                    }   
                                }}/>
                        </div>
                    </div>

                    {previewSplit && 
                        <div className={styles.splitMsgPreview}>
                        <div className={styles.chatContPreview}>
                            <div className={styles.message_cont}>
                                <div className={`${styles.message} ${styles.red_message} ${styles.red_type} ${splitModal?.type == "include" ? styles.include_cont : styles.exclude_cont}`}>
                                    <div className={`${styles.keyWordChat}` } >  
                                        <div className={styles.keyWordList}>
                                            {message.info.key_words.map((keyWord) =>{
                                                return <div><span>{keyWord}</span></div>
                                            })}
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                            {message.info.split_chat.map((mesgPrev) =>{
                            return (
                                <div>
                                {mesgPrev.type != "exclude" && mesgPrev.type != "include" ?
                                
                                <div className={styles.message_cont}>
                                <div className={`${styles.message} ${mesgPrev.color == "blue" ? `${styles.blue_message} ${styles.blue_type}` : `${styles.red_message}
                                        ${styles.red_type}` } `}>
                                    <div>
                                        {mesgPrev.type == "texto" && <p>{mesgPrev.info}</p> }
                                        {mesgPrev.type == "any" && <p style={{padding : '8px 12px'}}><i>Cualquier respuesta.</i></p> }
                                        {mesgPrev.type == "followup" &&  <p>{mesgPrev.info.message}</p> }
                                    </div>
                                </div>
                                </div>
                                :
                                    <>
                                        <div className={styles.splitMsgCont} >
                                                <p><b>SPLIT | </b>{mesgPrev.info.name}</p>
                                        </div>
                                        <i className={styles.splitMessage}>Si <span>{mesgPrev.info.name}</span> 👆 no se cumple continuan estos mensajes: 👇</i>
                                    </>
                                }
                                </div>
                             )
                            } )}
                        </div>
                        </div>
                    }
                </div>
                <i className={styles.splitMessage}>Si <span>{message.info.name}</span> 👆 no se cumple continuan estos mensajes: 👇</i>
            </>

        }
        </div>

    );
}



export default ChatBox;