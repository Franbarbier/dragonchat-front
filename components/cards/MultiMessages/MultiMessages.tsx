import { useEffect, useRef, useState } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { INotification } from '../../Notification/Notification';
import styles from './MultiMessages.module.css';

export interface IMultiMessages {
    messages : any;
    setMessages : (message: any) => void;
    notification : INotification;
    setNotification : (notification: INotification) => void;
}

const MultiMessages: React.FC<IMultiMessages> = ({ notification, setNotification, messages, setMessages }) => {
   

    const [testMsj, setTestMsj] = useState<any[]>(messages)

    useEffect(()=>{
        if (testMsj.length == 0) {
            setTestMsj([[""]])
        }
    },[messages])

    function addMsj() {
        setTestMsj([...testMsj, [""]])
    }

    useEffect(()=>{
        setMessages(testMsj)
    },[testMsj])

    const textareaRef = useRef(null);

    
    

    return (
            <div className={styles.MultiMessages_cont}>
                <div>
                    <div>
                        <ul>
                            <li>Escribiendo <strong>[name]</strong> se enviará dinámicamente el nombre del destinario</li>
                            <li> <img className={styles.forkIcon} src="./fork.png" />Permite escribir <strong>variaciones de mensajes</strong> que seran enviadas equitativamente a todos los destinatarios</li>
                        </ul>
                    </div>
                    <div className={styles.MultiMessages}>
                        <div>
                        {/* <div style={{"overflowY": testMsj.length == 0  ? "hidden" : "auto"}}> */}
                            {testMsj.map((message, index)=>{
                                    return (
                                        <div className={styles.messages_cont} >                                            
                                                <div>
                                                    {
                                                        message.length >= 0 && (
                                                        message.map((msj, j)=>{
                                                            return (
                                                                <div>
                                                                    <div className={styles.txtareaCont}>
                                                                        <img src="/var_linea.svg" alt="" className={styles.svgBranch}/>
                                                                        <textarea value={ msj } placeholder={`Mensaje #${index+1} - Variacion #${j + 1}`} onChange={ (e)=>{
                                                                            let newMessages = [...testMsj];
                                                                            const thisArr = newMessages[index]
                                                                            thisArr[j] = e.target.value;
                                                                            newMessages[index] = thisArr;
                                                                            setTestMsj(newMessages);
                                                                            
                                                                        } }
                                                                        rows={1}
                                                                        />
                                                                    </div>
                                                                        <img src="/close.svg" width={"12px"} onClick={()=>{

                                                                            let newMessages = [...testMsj];
                                                                            const thisArr = newMessages[index]
                                                                            thisArr.splice(j, 1);

                                                                            if (thisArr.length == 0) { newMessages.splice(index, 1); }
                                                                                    
                                                                            setTestMsj(newMessages);
                                                                        }} className={styles.deleteVariacion} />
                                                                </div>
                                                            )
                                                        } )
                                                        )
                                                    }
                                                    
                                                        <button className={styles.newVaracion} onClick={()=>{
                                                            const newArray = [...testMsj];
                                                            newArray[index] = [...message, ``];
                                                            setTestMsj(newArray);
                                                        }} title='Agregar variacion'>
                                                            <img src="./fork.png" />
                                                        </button>

                                                </div>
                                            

                                        </div>
                                    )
                                })
                            }
                            <div>
                                {/* <img src="/close.svg" /> */}
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