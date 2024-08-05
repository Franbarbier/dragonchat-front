import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { INotification } from '../../Notification/Notification';
import styles from './MultiMessages.module.css';


import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { Imessages } from '../CardsContFree';
import TextAreaCont from './TextAreaCont/TextArea';

export interface IMultiMessages {
    messages : string[][];
    setMessages : (message: string[][]) => void;
    notification : INotification;
    setNotification : (notification: INotification) => void;
    delayBetween : number;
    setDelayBetween : (val: number) => void;
    isPaid: boolean;
    setModalPro : (modalPro: boolean) => void;
    setFilesSelected : (val: File[]) => void;
    filesSelected: File[];
}


const MultiMessages: React.FC<IMultiMessages> = ({ notification, setNotification, messages, setMessages, delayBetween, setDelayBetween, isPaid, setModalPro, setFilesSelected, filesSelected }) => {
    const [testMsj, setTestMsj] = useState<Imessages>(messages)

    const [showPicker, setShowPicker] = useState<[number, number]>([99,99]);

    useEffect(()=>{
        if (testMsj.length === 0) {
            setTestMsj([[""]])
        }
    },[messages])


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
                                                                <div key={`mensaje${index}-var${j}`}  className={styles.varsCont}>
                                                                    {!(isPaid && index == 0 ) || isPaid?
                                                                    <>
                                                                    <TextAreaCont
                                                                        msj={msj}
                                                                        index={index}
                                                                        j={j}
                                                                        testMsj={testMsj}
                                                                        setTestMsj={setTestMsj}
                                                                        showPicker={showPicker}
                                                                        setShowPicker={setShowPicker}
                                                                        message={message}
                                                                        setNotification={setNotification}
                                                                        notification={notification}
                                                                        setFilesSelected={setFilesSelected}
                                                                        filesSelected={filesSelected}
                                                                        isPaid={isPaid}
                                                                        setModalPro={setModalPro}
                                                                    />
                                                                    
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