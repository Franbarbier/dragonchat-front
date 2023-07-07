import { useRef } from 'react';
import { STATUS } from '../../../enums';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { INotification } from '../../Notification/Notification';
import styles from './BasicMessages.module.css';

export interface IBasicMessages {
    messages : string[];
    setMessages : (message: string[]) => void;
    notification : INotification;
    setNotification : (notification: INotification) => void;

}

const BasicMessages: React.FC<IBasicMessages> = ({ messages, setMessages, notification, setNotification }) => {
   

    const copy = useRef<HTMLTextAreaElement>(null);

    const textToCopy = '[name]';

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
          .then(() => {
            console.log('Text copied to clipboard:', text);
            // Set a state variable to indicate the success message
          })
          .catch((error) => {
            console.error('Error copying text to clipboard:', error);
            // Set a state variable to indicate the error message
          });
      };
      
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
                    {messages.map((message, index)=>{
                        return (
                            <div className={styles.messages_cont}>
                                <textarea value={message} placeholder={`Alternativa Nro. ${index + 1}`} onChange={(e)=>{
                                    let newMessages = [...messages];
                                    newMessages[index] = e.target.value;
                                    setMessages(newMessages);
                                }} />
                                <img src="/close.svg" onClick={ 
                                    ()=>{
                                        if(messages.length > 1){

                                            let newMessages = [...messages];
                                            newMessages.splice(index, 1);
                                            setMessages(newMessages);
                                        }else{
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
                            onClick={ ()=> setMessages( [...messages, '' ]) }
                            disable={ false }
                        />
                    </div>
               </div>
            </div>
    )
}

export default BasicMessages;