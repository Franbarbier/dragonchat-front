import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { INotification } from '../../Notification/Notification';
import styles from './MultiMessages.module.css';

export interface IMultiMessages {
    messages : string[][];
    setMessages : (message: string[][]) => void;
    notification : INotification;
    setNotification : (notification: INotification) => void;
    delayBetween : number;
    setDelayBetween : (val: number) => void;
}

const MultiMessages: React.FC<IMultiMessages> = ({ notification, setNotification, messages, setMessages, delayBetween, setDelayBetween }) => {
   

    const [testMsj, setTestMsj] = useState<string[][]>(messages)

    useEffect(()=>{
        if (testMsj.length === 0) {
            setTestMsj([[""]])
        }
    },[messages])

    function addMsj() {
        setTestMsj([...testMsj, [""]])
    }

    useEffect(()=>{
        setMessages(testMsj)
    },[testMsj])


    return (
            <div className={styles.MultiMessages_cont}>
                <div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
                    <div>
                        <ul>
                            <li>Escribiendo <strong>[name]</strong> se enviará dinámicamente el nombre del destinario</li>
                            <li> <img className={styles.forkIcon} src="./fork.png" />Permite escribir <strong>variaciones de mensajes</strong> que seran enviadas equitativamente a todos los destinatarios</li>
                            <li>Podes establecer un delay entre cada mensaje para una mejor experiencia: <input type='number' value={delayBetween} onChange={(e)=>{
                                if (e.target.value < '1') {
                                    e.target.value = '1';
                                    return false;
                                }
                                setDelayBetween(Number(e.target.value))
                            }}/> segundos</li>
                        </ul>
                    </div>
>>>>>>> develop
=======

>>>>>>> 7237c4978af75af9062112517da73155b3e01248
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
                        <div className={styles.agregarMultiMensaje}>
                            <CustomColorBtn
                                type="submit"
                                text="AGREGAR MENSAJE"
                                backgroundColorInit="#724cdf"
                                backgroundColorEnd="#3a94fe"
                                borderColor="#5573f0"
                                onClick={ ()=> { addMsj() }  }
                                disable={ testMsj.length >= 5 }
                            />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MultiMessages;