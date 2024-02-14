import { useEffect, useRef } from 'react';
import { STATUS } from '../../../enums';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { INotification } from '../../Notification/Notification';
import styles from './BasicMessages.module.css';

export interface IBasicMessages {
    messages : Array<string[]>;
    setMessages : (message: Array<string[]>) => void;
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

    function  globalName() {
        const variations = [
            /\[name\]/gi,
            /\(name\)/gi,
            /\{name\}/gi,
            /\[nombre\]/gi,
            /\(nombre\)/gi,
            /\{nombre\}/gi,
            /\[user\]/gi,
            /\(user\)/gi,
            /\{user\}/gi,
            /\[usuario\]/gi,
            /\(usuario\)/gi,
            /\{usuario\}/gi,
            // Add more variations here if needed
          ];
    }

    

    // -------------------------------------- //



        const editableRef = useRef<HTMLDivElement>(null);
      
        // Function to set the cursor position at a specific index
        const setCursorPosition = (index: number) => {

        if (editableRef.current && editableRef.current.childNodes[0] && editableRef.current.childNodes[0].length > 0) {
            const selection = window.getSelection();
            const range = document.createRange();
            const node = editableRef.current.childNodes[0]; // Assuming only one child node
      
            range.setStart(node, index);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        };
      

        function handleInput(e, index) {

            let newMessage = messages[0]
            newMessage[index] = e.currentTarget.innerText;
            setMessages([newMessage])

            const selection = window.getSelection();
            if (selection) {
            const range = selection.getRangeAt(0);
            const offset = range.startOffset;
            // console.log('Cursor position:', offset);
            setTimeout(() => {
                setCursorPosition(offset);
            }, 10);
            }
        }


        useEffect(() => {
            console.log(messages)
        }, [messages]);

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
                                {/* <textarea value={message} placeholder={`Alternativa Nro. ${index + 1}`} onChange={(e)=>{
                                    let newMessage = messages[0]
                                    newMessage[index] = e.target.value;
                                    setMessages([newMessage])
                                }} /> */}
                                <p
                                    ref={editableRef}
                                    contentEditable
                                    style={{ color: message.length > 0 ? "white" : "#ddd" }}
                                    onInput={ (e) => { handleInput(e, index) } }
                                >
                                    {message.length > 0 ? message : `Alternativa Nro. ${index + 1}`}
                                </p>
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