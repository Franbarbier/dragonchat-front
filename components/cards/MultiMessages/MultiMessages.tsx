import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { STATUS } from '../../../enums';

import { INotification } from '../../Notification/Notification';
import styles from './MultiMessages.module.css';


import TextAreaCont from './TextAreaCont/TextArea';

export interface IMultiMessages {
    messages : any;
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
   
    const [testMsj, setTestMsj] = useState<any>(messages)

    const [showPicker, setShowPicker] = useState<[number, number]>([99,99]);

    useEffect(()=>{
        if (testMsj.length === 0) {
            setTestMsj([[""]])
        }
    },[messages])


    useEffect(()=>{
        console.log(testMsj)
        setMessages(testMsj)
    },[testMsj])


  
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
                                                                <div key={`mensaje${index}-var${j}`} className={styles.varsCont}>
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
                                                                    />
                                                                   
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
                                if (isPaid) {
                                    if (messages.length < 5) { setTestMsj([...testMsj, [""]]) }
                                }else{
                                    setNotification({
                                        status: STATUS.ALERT,
                                        render: true,
                                        message: 'Para agregar más mensajes debes tener una cuenta premium. Leer mas?',
                                        modalReturn: (val) => {
                                            if (val) { setModalPro(true)  }
                                            setNotification({...notification, render : false})
                                        }
                                    })
                                }
                        }}>
                            <img src="/close.svg" />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MultiMessages;
