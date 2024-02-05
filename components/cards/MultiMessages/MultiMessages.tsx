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
   

    const [testMsj, setTestMsj] = useState<any[]>([[""]])

    useEffect(()=>{
        console.log(messages)
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
                            <li>Puedes mandar hasta 5 mensajes en un solo envio, recorda que cada mensaje puede tener variaciones y se enviaran aleatoriamente a cada destinatario.</li>
                            <li>Escribiendo <strong>[name]</strong> se va a enviar dinamicamente el nombre del destinatario.</li>
                        </ul>
                    </div>
                    <div className={styles.MultiMessages}>
                        <div style={{"overflowY": testMsj.length == 0  ? "hidden" : "auto"}}>
                            {testMsj.map((message, index)=>{
                                    return (
                                        <div className={styles.messages_cont} >
                                            <span>Mensaje Nro. {index + 1}</span>
                                            
                                                <div>
                                                    {
                                                        message.length >= 0 && (
                                                        message.map((msj, j)=>{
                                                            return (
                                                                <div>
                                                                    <div>
                                                                        <textarea value={ msj } placeholder={`Variacion Nro. ${j + 1}`} onChange={ (e)=>{
                                                                            let newMessages = [...testMsj];
                                                                            const thisArr = newMessages[index]
                                                                            thisArr[j] = e.target.value;
                                                                            newMessages[index] = thisArr;
                                                                            setTestMsj(newMessages);
                                                                            // console.log(newMessages)
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
                                                    

                                                </div>
                                                <button className={styles.newVaracion} onClick={()=>{
                                                    const newArray = [...testMsj];
                                                    newArray[index] = [...message, ``];
                                                    setTestMsj(newArray);
                                                }} title='Agregar variacion'>+</button>
                                            

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
                                backgroundColorInit="#13013780"
                                backgroundColorEnd="#13013780"
                                borderColor="var(--newViolet)"
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