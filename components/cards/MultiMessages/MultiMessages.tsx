import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { STATUS } from '../../../enums';

import { INotification } from '../../Notification/Notification';
import styles from './MultiMessages.module.css';


import Picker from "emoji-picker-react";

export interface IMultiMessages {
    messages : string[][];
    setMessages : (message: string[][]) => void;
    notification : INotification;
    setNotification : (notification: INotification) => void;
    delayBetween : number;
    setDelayBetween : (val: number) => void;
    isPaid: boolean;
    setModalPro : (modalPro: boolean) => void;
}

const MultiMessages: React.FC<IMultiMessages> = ({ notification, setNotification, messages, setMessages, delayBetween, setDelayBetween, isPaid, setModalPro }) => {
   
    const [testMsj, setTestMsj] = useState<string[][]>(messages)


    useEffect(()=>{
        if (testMsj.length === 0) {
            setTestMsj([[""]])
        }
    },[messages])

    function addMsj() {
        if (isPaid) {
            setTestMsj([...testMsj, [""]])
        }else{
            setNotification({
                status : STATUS.ALERT,
                render : true,
                message : "Para poder agregar más mensajes debes tener una cuenta 2.0",
                modalReturn : (e) => {
                    setNotification({...notification, render : false})
                    if (e) {  setModalPro(true) }
                }
            })
        }
    }

    useEffect(()=>{
        setMessages(testMsj)
    },[testMsj])

    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

  

    return (
            <div className={styles.MultiMessages_cont}>
                <div>

                    <div>
                        <ul>
                             <li>Podes establecer un delay entre cada mensaje para una mejor experiencia: <input type='number' value={delayBetween} onChange={(e)=>{
                                if (e.target.value < '1') {
                                    e.target.value = '1';
                                    return false;
                                }
                                setDelayBetween(Number(e.target.value))
                            }}/> segundos</li>
                        </ul>
                    </div>

                    <div className={styles.MultiMessages}>
                        <div>
                            {testMsj.map((message, index)=>{
                                    return (
                                        <div key={`mensajesCopy${index}`}>
                                        <>
                                            <motion.div className={styles.messages_cont}
                                                initial={{ opacity: 0, y : 50 }}
                                                animate={{ opacity: 1, y : 0 }}
                                                
                                            >
                                                <div>
                                                    {
                                                        message.length >= 0 && (
                                                        message.map((msj, j)=>{
                                                            return (
                                                                <div key={`mensaje${index}-var${j}`}>
                                                                    <>
                                                                    <motion.div className={styles.txtareaCont}
                                                                            initial={{ opacity: 0, y : 50 }}
                                                                            animate={{ opacity: 1, y : 0 }}>
                                                                        <img src="/var_linea.svg" alt="" className={styles.svgBranch} />

                                                                        
                                                                        <textarea value={ msj } placeholder={`Mensaje #${index+1} - Variacion #${j + 1}`} onChange={ (e)=>{
                                                                            let newMessages = [...testMsj];
                                                                            const thisArr = newMessages[index]
                                                                            thisArr[j] = e.target.value;
                                                                            newMessages[index] = thisArr;
                                                                            setTestMsj(newMessages);
                                                                            
                                                                        } }
                                                                        rows={1}
                                                                        />
                                                                        
                                                                    </motion.div>
                                                                        <img src="/close.svg" width={"12px"} onClick={()=>{

                                                                            let newMessages = [...testMsj];
                                                                            const thisArr = newMessages[index]
                                                                            thisArr.splice(j, 1);

                                                                            if (thisArr.length == 0) { newMessages.splice(index, 1); }
                                                                                    
                                                                            setTestMsj(newMessages);
                                                                        }} className={styles.deleteVariacion} />

                                                                        <button className={styles.newVaracion} onClick={()=>{
                                                                            const newArray = [...testMsj];
                                                                            newArray[index] = [...message, ``];
                                                                            setTestMsj(newArray);
                                                                        }} title='Agregar variacion'>
                                                                            <img src="./fork.png" />
                                                                        </button>

                                                                        <input
                                                                            className="input-style"
                                                                            value={inputStr}
                                                                            onChange={(e) => setInputStr(e.target.value)}
                                                                            />
                                                                            <img
                                                                            className="emoji-icon"
                                                                            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                                                            onClick={() => setShowPicker((val) => !val)}
                                                                        />

                                                                        {showPicker && (
                                                                            <Picker onEmojiClick={onEmojiClick} />
                                                                        )}

                                                                        </>
                                                                </div>
                                                            )
                                                        } )
                                                        )
                                                    }

                                                    { testMsj[index][0] != "" && 

                                                        <button className={styles.newVaracion} onClick={()=>{
                                                            const newArray = [...testMsj];
                                                            newArray[index] = [...message, ``];
                                                            setTestMsj(newArray);
                                                        }} title='Agregar variacion'>
                                                            <img src="./fork.png" />
                                                        </button>
                                                    }


                                                </div>
                                            

                                                </motion.div>

                                               
                                        </>
                                        </div>
                                    )
                                })
                            }
                            <div>
                            </div>
                        </div>
                        <div className={`${styles.agregarMultiMensaje} ${messages.length > 4 && styles.noMoreMsjs}`} onClick={()=> {if (messages.length < 5) { setTestMsj([...testMsj, [""]]) } }}>
                            <img src="/close.svg" />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MultiMessages;
