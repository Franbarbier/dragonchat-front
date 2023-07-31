import React, { useEffect, useRef, useState } from 'react';
import { INotification } from '../../Notification/Notification';
import AddChatBox from './AddChatBox';
import ChatBox from './ChatBox';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';
import ModalSplit from './ModalSplit';


// types of info:
// 1. texto : string
// 2. followup : {message : string, delay: {hours: string, mins: string, secs: string}}
// 3. include/exclude:  {name: string, key_words: [], split_chat : IChat[]}
// 4. archivo : {url: string, name: string}
// 5. any: string


export interface IChatWindow {
   chatData? : IChat[],
   setChatData : (chat:IChat[]) => void,
   index?: number,
   notification: INotification,
   setNotification: (notification: INotification) => void
}

export interface ISplitModal {
    name : string,
    key_words: string[],
    split_chat: IChat[]
 }
 


const ChatWindow: React.FC<IChatWindow> = ({ chatData, setChatData, index, notification, setNotification }) => {

    const [chat, setChat] = useState( chatData ? chatData : [] )

    const [splitModal, setSplitModal] = useState<IChat | null>(null)

    const [keyPressed, setKeyPressed] = useState<boolean>(false)
    const [ parentIndex , setParentIndex] = useState<number>(0)

    const [lastMessageType, setLastMessageType] = useState('')

    useEffect(() => {
        setLastMessageType(chat[chat.length - 1]?.type)
<<<<<<< HEAD
    }, [chat])

=======
        setChatData(chat)
    }, [chat])



    const chatWindowRef = useRef<HTMLDivElement>(null)    
    
    function scrollToBottom() {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }

    }
        
>>>>>>> develop
    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
          // check if event target is not an input or a textarea
            if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)){
                if (event.key == "m" || event.key == "M") {
<<<<<<< HEAD
                    setChat( [...chat, {info: "", color: "blue", type: "texto"}] )
                    // Auto focus en el ultimo campo creado
                    setKeyPressed(!keyPressed)
=======
                    setTimeout(() => {
                        setChat( [...chat, {info: "", color: "blue", type: "texto"}] )

                        // Movida para que se focusee el ultimo input
                        focusLastMessage()

                    }, 50);
                    // Auto focus en el ultimo campo creado
                    setKeyPressed(!keyPressed)
                    
>>>>>>> develop
                }
                if(event.key == "c" || event.key == "C"){
                    if (lastMessageType == "any" ) { return false; }
                    setChat( [...chat, {info: "Cualquier respuesta.", color: "red", type: "any"}] )

                }
                if(event.key == "k" || event.key == "K"){

                }
                setTimeout(() => {
                    scrollToBottom()
                }, 100);
            }
        }
    
        document.addEventListener("keydown", handleKeyPress);
        
        if (splitModal != null) {
            document.removeEventListener("keydown", handleKeyPress);
        }

        return () => {
          document.removeEventListener("keydown", handleKeyPress);
        };
    });

    const parentRef = useRef<HTMLDivElement>(null);

    function focusLastMessage() {
        setTimeout(() => {
            const parentElement = parentRef.current;
            const lastChild = parentElement?.lastElementChild;

<<<<<<< HEAD
    const [inputRefs, setInputRefs] = useState([]);
    
    useEffect(()=>{
        // get last item from chat and if it is a "texto" type, focus on it
        // if (chat.length > 0 && chat[chat.length-1].type == "texto") {
        //     let lastChat = document.getElementById("chat"+(chat.length-1))
        //     if (lastChat) {
        //         lastChat.focus()
        //     }
        // }

        console.log(chat[chat.length-1])

    },[keyPressed])
    


    const chatWindowRef = useRef<HTMLDivElement>(null)


    function scrollToBottom() {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
          }
=======
            if (lastChild && lastChild.tagName === 'DIV') {
                const inputElement = lastChild.querySelector('textarea');
                if (inputElement) {
                    setTimeout(() => {
                        inputElement.focus();
                    }, 200);
                }
            }
        }, 0);
>>>>>>> develop
    }


//   useEffect(() => { focusLastMessage(); }, [keyPressed]);


    return (
            <div className={styles.ChatWindow}>
                <div>
                    <div className={styles.chat_cont} >
                        <div className={styles.chat_window} ref={chatWindowRef}>
                            <div className={styles.chat} ref={parentRef} >
                                {chat.map((message, index)=>(
                                    <ChatBox index={index} message={message} setChat={setChat} chat={chat} splitModal={splitModal} setSplitModal={setSplitModal} setParentIndex={setParentIndex} notification={notification} setNotification={setNotification} />
                                ))}
                            </div>
                        </div>
                        <AddChatBox arrMessages={chat} setArrMessages={setChat} splitModal={splitModal} setSplitModal={setSplitModal} scrollToBottom={scrollToBottom} focusLastMessage={focusLastMessage}/>
                    </div>
                    {splitModal != null &&
                        <ModalSplit splitModal={splitModal} setSplitModal={setSplitModal} chat={chat} setChat={setChat} parentIndex={parentIndex} setParentIndex={setParentIndex} scrollToBottom={scrollToBottom} notification={notification} setNotification={setNotification}/>
                    }
                </div>
            </div>
    );
        
}
    
export default ChatWindow;