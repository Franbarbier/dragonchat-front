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
   
    return (
            <div className={styles.basicMessages_cont}>
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
                            text="Agregar nuevo mensaje"
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