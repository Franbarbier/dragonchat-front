import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


import { INotification } from '../../Notification/Notification';
import styles from './MultiMessages.module.css';



export interface IMultiMessages {
    messages : string[][];
    setMessages : (message: string[][]) => void;
    notification : INotification;
    setNotification : (notification: INotification) => void;
    delayBetween : number;
    setDelayBetween : (val: number) => void;
    isPaid: boolean;
}

const MultiMessages: React.FC<IMultiMessages> = ({ notification, setNotification, messages, setMessages, delayBetween, setDelayBetween, isPaid }) => {
   
    const [testMsj, setTestMsj] = useState<string[][]>(messages)

    useEffect(()=>{
        if (testMsj.length === 0) {
            setTestMsj([[""]])
        }
    },[messages])

    useEffect(()=>{
        setMessages(testMsj)
    },[testMsj])


    return (
            <div className={styles.MultiMessages_cont}>
                <div>
                    {isPaid &&
                        <div className={styles.delayBetCont}>
                            <p>Podes establecer un delay entre cada mensaje para una mejor experiencia:</p>
                            <input type='number' value={delayBetween} onChange={(e)=>{
                                if (e.target.value < '1') {
                                    e.target.value = '1';
                                    return false;
                                }
                                setDelayBetween(Number(e.target.value))
                            }
                            }/> <span>(segundos)</span>
                        </div>
                    
                    }
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
                                                                            animate={{ opacity: 1, y : 0 }}
                                                                            transition={{duration : 0.5 }}>
                                                                        
                                                                        
                                                                        <motion.img src="/var_linea.svg" alt="" className={styles.svgBranch}
                                                                            initial={{ opacity: 0, y : 8 }}
                                                                            animate={{ opacity: 1, y : 0 }}
                                                                            transition={{ duration: 0.5, delay : 0.5 }}
                                                                        />
                                                                        
                                                                    
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


                                                                        </>
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
                        <div className={`${styles.agregarMultiMensaje} ${messages.length > 4 && styles.noMoreMsjs}`} onClick={()=> {if (messages.length < 5) { setTestMsj([...testMsj, [""]]) } }}>
                            <img src="/close.svg" />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MultiMessages;
