import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';


import { INotification } from '../../Notification/Notification';
import styles from './MultiMessages.module.css';


import Picker from "emoji-picker-react";
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';

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

    console.log(messages)


    const emojiCont = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiCont.current && !(emojiCont.current as Element).contains(event.target as Node)) {
                setShowPicker([99,99]);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [emojiCont]);

    useEffect(()=>{
        setMessages(testMsj)
    },[testMsj])

    const [showPicker, setShowPicker] = useState<[number, number]>([99,99]);

    const onEmojiClick = (event) => {
        
        let newMessages = [...testMsj];
        const thisArr = newMessages[showPicker[0]]
        thisArr[showPicker[1]] = thisArr[showPicker[1]] + event.emoji;
        newMessages[showPicker[0]] = thisArr;
        setTestMsj(newMessages);

        setShowPicker([99,99]);
    };

  
    return (
            <div className={styles.MultiMessages_cont}>
                <div>
                    <ul>

                    {isPaid &&
                        <li className={styles.delayBetCont}>
                            <div>Podes establecer un delay entre cada mensaje para una mejor experiencia:</div>
                            <div>
                                <input type='number' value={delayBetween} onChange={(e)=>{
                                            if (e.target.value < '1') {
                                                e.target.value = '1';
                                                return false;
                                            }
                                            setDelayBetween(Number(e.target.value))
                                        }
                                    }/>
                                <span>(segundos)</span>
                            </div>
                        </li>
                    
                    }
                        <li>Escribiendo <strong>[name]</strong> se va a enviar dinamicamente el nombre del destinatario.</li>
                    </ul>

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
                                                                    {!isPaid && index == 0 ?
                                                                    <>
                                                                    <motion.div className={styles.txtareaCont}
                                                                            initial={{ opacity: 0, y : 50 }}
                                                                            animate={{ opacity: 1, y : 0 }}>
                                                                        <img src="/var_linea.svg" alt="" className={styles.svgBranch} />

                                                                        <textarea value={ msj }
                                                                        placeholder={`Mensaje #${index+1} - Variacion #${j + 1}`}
                                                                        onChange={ (e)=>{
                                                                            let newMessages = [...testMsj];
                                                                            const thisArr = newMessages[index]
                                                                            thisArr[j] = e.target.value;
                                                                            newMessages[index] = thisArr;
                                                                            setTestMsj(newMessages);
                                                                            
                                                                        } }
                                                                        rows={1} />
                                                                
                                                                        
                                                                    </motion.div>
                                                                        <img src="/close.svg" width={"12px"} onClick={()=>{

                                                                            let newMessages = [...testMsj];
                                                                            const thisArr = newMessages[index]
                                                                            thisArr.splice(j, 1);

                                                                            if (thisArr.length == 0) { newMessages.splice(index, 1); }
                                                                                    
                                                                            setTestMsj(newMessages);
                                                                        }} className={styles.deleteVariacion} />


                                                                        
                                                                        <img
                                                                            className={styles.emojiIcon}
                                                                            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                                                            onClick={() => setShowPicker([index, j])}
                                                                        />
                                                                        {(j == showPicker[1] && index == showPicker[0])  && (
                                                                            <div className={styles.pickerCont} ref={emojiCont}>
                                                                                <Picker onEmojiClick={onEmojiClick} />

                                                                            </div>
                                                                        )}
                                                                        { testMsj[index][0] != "" && 
                                                                            <img className={styles.newVaracion} onClick={()=>{
                                                                                const newArray = [...testMsj];
                                                                                newArray[index] = [...message, ``];
                                                                                setTestMsj(newArray);
                                                                            }} title='Agregar variacion'
                                                                            src="./fork.png"   />                                                                        
                                                                        }

                                                                        </>
                                                                        :
                                                                        <>
                                                                            <div>
                                                                                <div className={`${styles.txtareaCont} ${styles.blockMulti}`}>
                                                                                    <textarea />
                                                                                    <div>
                                                                                        <img src="/bloqueo-alternativo.png" width={'24px'}/>
                                                                                        <p>Pasate a 2.0 para desbloquear los multi mensajes</p>
                                                                                        <div>

                                                                                            <CustomColorBtn
                                                                                                text="Pasar a 2.0"
                                                                                                backgroundColorInit={ "#c21c3b" }
                                                                                                backgroundColorEnd={ "#f9bd4f" }
                                                                                                borderColor={ "#e17846"}
                                                                                                // backgroundColorInit="#724cdf"
                                                                                                // backgroundColorEnd="#3a94fe"
                                                                                                // borderColor="#5573f0"
                                                                                                onClick={()=>{ setModalPro(true) }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        }
                                                                </div>
                                                            )
                                                        } )
                                                        )
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
                        <div className={`${styles.agregarMultiMensaje} ${messages.length > 4 && styles.noMoreMsjs}`} onClick={()=> {
                            if (messages.length < 5) { setTestMsj([...testMsj, [""]]) }
                        }}>
                            <img src="/close.svg" />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MultiMessages;
