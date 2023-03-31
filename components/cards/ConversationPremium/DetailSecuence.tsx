import React, { useEffect, useState } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import ChatWindow from './ChatWindow';
import { IChat, ISecuence } from './ConversationPremium';
import styles from './ConversationPremium.module.css';



// types of info:
// 1. texto : string
// 2. followup : {message : string, delay: {hours: string, mins: string, secs: string}}
// 3. include/exclude:  {name: string, key_words: [], split_chat : IChat[]}
// 4. archivo : {url: string, name: string}
// 5. any: string

export interface ISecuencePremium {
    secuence : ISecuence
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



const DetailSecunce: React.FC<ISecuencePremium> = ({ secuence }) => {
    
    const [secuenceInfo, setSecuenceInfo] = useState(secuence)
    const [secuenceInfoChat, setSecuenceInfoChat] = useState<IChat[]>(secuence ? secuence.chat : [])
    
    useEffect(()=>{
        console.log(secuenceInfoChat)
    },[secuenceInfoChat])
    
    const [icono, setIcono] = useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setIcono(selectedFile);
      }
    };

    useEffect(()=>{
        console.log(icono)
    },[icono])
    
        return (
                <div style={{'height':'100%'}}>
                        <div className={styles.edit_secuence_cont}>
                            <div className={styles.new_name_cont}>
                                <div className={styles.icon_upload}>
                                    <input type="file" id="file" onChange={handleFileChange} />
                                    {!icono ?
                                        <img src='/upload.svg' />
                                    :
                                        <div>
                                            <img src={URL.createObjectURL(icono)} alt={icono.name} />
                                        </div>
                                    }
                                    <label htmlFor="file"/>
                                </div>

                                <div className={styles.new_name}>
                                    <input placeholder='Nombre de la secuencia' />
                                </div>
                            </div>
                            <div>
                                <ChatWindow chatData={secuenceInfoChat} setChatData={setSecuenceInfoChat} />
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
                                disable={ false }
                            />
                        </div>
                                
                                
                    </div>
       );
        
    }
    
    export default DetailSecunce;