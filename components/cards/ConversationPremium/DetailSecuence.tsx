import React, { useEffect, useState } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { INotification } from '../../Notification/Notification';
import Breadcrumb from './Breadcrumb';
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
    secuence : ISecuence,
    setActiveSecuence: (secuence: ISecuence | null) => void,
    secuenciasCreadas: ISecuence[],
    setSecuenciasCreadas: (secuences: ISecuence[]) => void,
    isNew : number;
    notification: INotification;
    setNotification: (notification: INotification) => void;
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


const DetailSecunce: React.FC<ISecuencePremium> = ({ secuence, setSecuenciasCreadas, secuenciasCreadas, setActiveSecuence, isNew, notification, setNotification }) => {
    
    const [secuenceInfo, setSecuenceInfo] = useState(secuence)
    const [secuenceInfoChat, setSecuenceInfoChat] = useState<IChat[]>(secuence ? secuence.chat : [])
    
    const [icono, setIcono] = useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setIcono(selectedFile);
      }
    };

    useEffect(()=>{
        if (icono?.name) {
            setSecuenceInfo({...secuenceInfo, icon: icono.name})
        }
    },[icono])
    
    useEffect(()=>{
        setSecuenceInfo({...secuenceInfo, chat: secuenceInfoChat})
    }, [secuenceInfoChat])
    
    function validacionCrearSecuencia() {

        if (secuenceInfo.name == "" ) {
            setNotification({
                status : "error",
                render : true,
                message : "Debes asignarle un nombre a la secuencia",
                modalReturn : () => {
                    setNotification({...notification, render : false})
                }})
            return false;
        }
        if (secuenceInfo.chat.length == 0) {
            setNotification({
                status : "error",
                render : true,
                message : "Debes agregar al menos un mensaje a la secuencia",
                modalReturn : () => {
                    setNotification({...notification, render : false})
                }})
            return false;
        }
        if (secuenceInfo.chat[0].info == "") {
            setNotification({
                status : "error",
                render : true,
                message : "No puedes enviar un mensaje vacío",
                modalReturn : () => {
                    setNotification({...notification, render : false})
                }})
            return false;
        }
        
        if(isNew  == -1 ){
            setSecuenciasCreadas([...secuenciasCreadas, secuenceInfo])
        }else{
            let secuences = [...secuenciasCreadas]
            secuences[isNew] = secuenceInfo
            setSecuenciasCreadas(secuences)
        }
        setActiveSecuence(null)
    
    }
    

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
                                    <input placeholder='Nombre de la secuencia' value={secuenceInfo.name} onChange={(e)=>{ setSecuenceInfo({...secuenceInfo, name: e.target.value}) } }/>
                                </div>
                            </div>
                            <div>
                                <ChatWindow chatData={secuenceInfoChat} setChatData={setSecuenceInfoChat} notification={notification} setNotification={setNotification} />
                            </div>
                        </div>
                        <div style={{'display': 'flex', 'justifyContent':'space-between'}}>
                            <div style={{ 'width' : '48%'}}>
                                <CustomColorBtn
                                    type="submit"
                                    text="Resgresar"
                                    backgroundColorInit="rgb(58 148 254 / 36%)"
                                    backgroundColorEnd="rgb(114 76 223 / 0%)"
                                    borderColor="#5573f0"
                                    onClick={()=>{
                                        if(secuenceInfoChat.length > 0){
                                            setNotification({
                                                status : "alert",
                                                render : true,
                                                message : "¿Estas seguro que quieres salir sin guardar los cambios?",
                                                modalReturn : (booleanReturn)=>{
                                                    setNotification({...notification, render : false })
                                                    if ( booleanReturn ) {
                                                        setActiveSecuence(null)
                                                    }
                                                }
                                            })
                                        }else{
                                            setActiveSecuence(null)
                                        }
                                    }}
                                    disable={ false }
                                />
                            </div>
                            <div style={{ 'width' : '48%'}}>
                                <CustomColorBtn
                                    type="submit"
                                    text="Guardar secuencia"
                                    backgroundColorInit="#724cdf"
                                    backgroundColorEnd="#3a94fe"
                                    borderColor="#5573f0"
                                    onClick={()=>{ validacionCrearSecuencia() }}
                                    disable={ false }
                                />
                            </div>
                        </div>
                        

                        <div className={styles.breadcrumbCont}>
                            <Breadcrumb chat={secuenceInfoChat}/>
                        </div>
                                
                    </div>
       );
        
    }
    
    export default DetailSecunce;