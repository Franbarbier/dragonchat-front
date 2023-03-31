import React, { useEffect, useState } from 'react';
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
   index?: number
}

export interface ISplitModal {
    name : string,
    key_words: string[],
    split_chat: IChat[]
 }
 


const ChatWindow: React.FC<IChatWindow> = ({ chatData, setChatData, index }) => {

    const [chat, setChat] = useState( chatData ? chatData : [] )

    const [splitModal, setSplitModal] = useState<IChat | null>(null)

    const [ parentIndex , setParentIndex] = useState<number>(0)

    useEffect(()=>{
        setChatData(chat)
    },[chat])

    return (
            <div className={styles.ChatWindow}>
                <div>
                    <div className={styles.chat_cont} >
                        <div className={styles.chat_window}>
                            <div className={styles.chat} >
                                {chat.map((message, index)=>(
                                    <ChatBox index={index} message={message} setChat={setChat} chat={chat} splitModal={splitModal} setSplitModal={setSplitModal} setParentIndex={setParentIndex}/>
                                ))}
                            </div>
                        </div>
                        <AddChatBox arrMessages={chat} setArrMessages={setChat} splitModal={splitModal} setSplitModal={setSplitModal} />
                    </div>
                    {splitModal != null &&
                        <ModalSplit splitModal={splitModal} setSplitModal={setSplitModal} chat={chat} setChat={setChat} parentIndex={parentIndex} setParentIndex={setParentIndex}/>
                    }
                </div>
            </div>
    );
        
}
    
export default ChatWindow;