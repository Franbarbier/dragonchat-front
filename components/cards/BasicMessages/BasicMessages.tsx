import { useRef } from 'react';
import { STATUS } from '../../../enums';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { INotification } from '../../Notification/Notification';
import styles from './BasicMessages.module.css';

export interface IBasicMessages {
    messages : Array<any[]>;
    setMessages : (message: Array<any[]>) => void;
    notification : INotification;
    setNotification : (notification: INotification) => void;

}

const BasicMessages: React.FC<IBasicMessages> = ({ messages, setMessages, notification, setNotification }) => {

    const copy = useRef<HTMLTextAreaElement>(null);      
    const handleCopy = () => {
        navigator.clipboard.writeText(copy.current!.innerHTML)
        .then(() => {
            // add class to ref
            copy.current!.classList.add(styles.copied);
            setTimeout(()=>{
                copy.current!.classList.remove(styles.copied);
            }
            , 2000)
        })
    };
  
    return (
            <div className={styles.basicMessages_cont}>
                <ul>
                    <li>Escribiendo <strong ref={copy} onClick={ handleCopy }>[name]</strong> se va a enviar dinamicamente el nombre del destinatario.</li>
                    <li>Puedes agregar alternativas del mensaje que se enviará, se alternaran equitativamente entre todos los destinatarios.</li>
                </ul>
               <div>
                    {messages[0].map((message, index)=>{
                        return (
                            <div className={styles.messages_cont}>
                                <textarea value={message} placeholder={`Alternativa Nro. ${index + 1}`} onChange={(e)=>{
                                    let newMessage = messages[0]
                                    newMessage[index] = e.target.value;
                                    setMessages([newMessage])
                                }} />
                                <img src="/close.svg" onClick={ 
                                    ()=>{
                                        if(messages[0].length > 1){

                                            let newMessage = messages[0]
                                            newMessage.splice(index, 1)
                                            setMessages([newMessage])

                                        } else{
                                            setNotification({
                                                modalReturn: () => {
                                                    setNotification({...notification, render : false})
                                                },
                                                status: STATUS.ERROR,
                                                render: true,
                                                message: 'Debe haber al menos un mensaje'
                                            })
                                        }
                                    }
                                 } />
                            </div>
                        )
                    })}
                    <div>
                        <CustomColorBtn
                            type="submit"
                            text="Agregar alternativa de mensaje"
                            backgroundColorInit="#13013780"
                            backgroundColorEnd="#13013780"
                            borderColor="var(--newViolet)"
                            onClick={ ()=> {
                                let newMessages = [...messages];
                                newMessages[0].push('');
                                setMessages(newMessages);
                            }}
                            disable={ false }
                        />
                    </div>
               </div>
            </div>
    )
}

export default BasicMessages;