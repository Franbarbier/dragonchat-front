import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styles from '../Card/FreeCard.module.css';

export interface IConversationPremium {
    blocked : boolean;
}

export interface IChat {
    message? : string,
    color?: string
}

const ConversationPremium: React.FC<IConversationPremium> = ({ blocked }) => {

    const [chat, setChat] = useState<IChat[]>([])

    const [modalAddMessage, setModalAddMessage] = useState('')
    const [red_new_message, setRed_new_message] = useState('')
    const [blue_new_message, setBlue_new_message] = useState('')

    const idCard = 2

    function addMessage(message:string, color:string){
        setChat( [...chat, {message, color}] )
    }

    useEffect(()=>{
        if (blocked) {
            setChat([
                {message: '¡Manuel! Como va eso?', color: 'blue'},
                {message: 'Hola, todo bien, vos?', color: 'red'},
                {message: 'Excelente, ya te paso la guía !', color: 'blue'},
                {message: 'la-respuesta-a-las-10-objeciones.pdf', color: 'blue'},
                {message: 'Te va a ser muy útil :)', color: 'blue'},
                {message: 'Muchas gracias!', color: 'red'},
                {message: 'Quedamos en contacto', color: 'blue'}
            ])
        }
    }, [])


    return (
        <div className={` ${styles.SecuencePremiumCard}`} >

            <div className={styles.card_container}>
               
                <div className={styles.chat_window}>
                    <div>
                        <div className={styles.add_messages}>
                            <div className={`${styles.add_red_message} ${styles.red_type}`} onClick={(e)=>{
                                e.stopPropagation()
                                setModalAddMessage('red') }
                                }>
                                <p>+</p>
                                {modalAddMessage == "red" &&
                                <form className={styles.red_type}>
                                    <textarea value={red_new_message} onChange={ (e)=>{ setRed_new_message(e.target.value) } }/>
                                    <button onClick={ (e)=>{ 
                                        e.preventDefault()
                                        setRed_new_message('')
                                        addMessage(red_new_message, "red") } }>Enviar</button>
                                </form>
                                }
                            </div>
                            <div className={`${styles.add_blue_message} ${styles.blue_type}`} onClick={(e)=>{
                                e.stopPropagation()
                                setModalAddMessage('blue') }
                                }>
                                <p>+</p>
                                {modalAddMessage == "blue" &&
                                <form className={styles.blue_type}>
                                    <textarea value={blue_new_message} onChange={ (e)=>{ setBlue_new_message(e.target.value) } }/>
                                    <button onClick={ (e)=>{ 
                                        e.preventDefault()
                                        setBlue_new_message('')
                                        addMessage(blue_new_message, "blue") } }>Enviar</button>
                                </form>
                                }
                            </div>
                        </div>
                        <div>
                            {chat.map(message => (

                                <div className={styles.message_cont}>
                                <div className={`${styles.message}  ${message.color == "blue" ? `${styles.blue_message} ${styles.blue_type}` : `${styles.red_message}
                                        ${styles.red_type}` }`}>
                                    <div>
                                        <p>{message.message}</p>
                                    </div>
                                    <img src="/delete_white.svg" onClick={()=>{ setChat( chat.filter( msg => msg != message  )) }}/>
                                </div>
                                </div>

                            ))}
                        </div>
                    </div>
                    {blocked &&
                        <div className={styles.lock_overlay}>
                            <div>
                                <FontAwesomeIcon icon={faLock} />
                                <p>Desbloqueá esta funcionalidad</p>
                            </div>
                        </div>
                    }
                </div>
                
            </div>
        </div>
    
    );
}

export default ConversationPremium;