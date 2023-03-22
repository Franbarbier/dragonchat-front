import React, { useEffect, useState } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import AddChatBox from './AddChatBox';
import ChatBox from './ChatBox';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';
import ModalSplit from './ModalSplit';




export interface ISecuencePremium {
    blocked : boolean
    setModalAddMessage : (color:string) => void,
    modalAddMessage : string,
    red_new_message : string,
    setRed_new_message : (e:string) => void,
    blue_new_message : string,
    setBlue_new_message : (e:string) => void,
    addMessage : (message:string, color:string, type: any) => void
    chat : IChat[]
    setChat : (chat:IChat[])=> void
}



interface IChatBox {
    message : IChat,
    setChat : (chat:IChat[])=> void,
    chat : IChat[],
    index : number
}

export interface SplitInfo{
    name : string,
    key_words: string[],
    split_chat: IChat[]
}



const DetailSecuence: React.FC<ISecuencePremium> = ({  blocked, setModalAddMessage, modalAddMessage, red_new_message, setRed_new_message, blue_new_message, setBlue_new_message, addMessage, chat, setChat }) => {
    
        
    const idCard = 2


    // primer mensaje
    const [primerMensaje, setPrimerMensaje] = useState(true)

    const [splitModal, setSplitModal] = useState<boolean>(false);
    const [splitModalData, setSplitModalData] = useState<SplitInfo>({
        name : '',
        key_words : [],
        split_chat : []
    });
    const [chatIndex, setChatIndex] = useState<number>(0)

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
                                                <ChatBox index={index} message={message} setChat={setChat} chat={chat} setSplitModal={setSplitModal} setSplitModalData={setSplitModalData} splitModalData={splitModalData} chatIndex={chatIndex} setChatIndex={setChatIndex}/>
                                            ))}
                                        </div>
                                    </div>
                                    <AddChatBox arrMessages={chat} setArrMessages={setChat} splitModal={splitModal} setSplitModal={setSplitModal} setSplitModalData={setSplitModalData}/>
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
                                disable={ chat.length < 2 }
                            />
                        </div>
                                
                                {splitModal &&
                                    <ModalSplit type={"exclude"} color={"red"} chat={chat} setChat={setChat} setSplitModal={setSplitModal} splitModal={splitModal} setSplitModalData={setSplitModalData} splitModalData={splitModalData} chatIndex={chatIndex} setChatIndex={setChatIndex}/>
                                }
                    </div>
       );
        
    }
    
    export default DetailSecuence;