import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import estilo from '../Card/FreeCard.module.css';
import { ISecuencePremium } from './ConversationPremium';
import styles from './ConversationPremium.module.css';


const BlockedPreVisual: React.FC<ISecuencePremium> = ({ blocked, setModalAddMessage, modalAddMessage, red_new_message, setRed_new_message, blue_new_message, setBlue_new_message, addMessage, chat, setChat }) => {
    
    useEffect(()=>{
        setChat([
                    {message: '¡Manuel! Como va eso?', color: 'blue', type: 'texto'},
                    {message: 'Hola, todo bien, vos?', color: 'red', type: 'texto'},
                    {message: 'Excelente, ya te paso la guía!', color: 'blue', type: 'texto'},
                    {message: 'la-respuesta-a-las-10-objeciones.pdf', color: 'blue', type: 'texto'},
                    {message: 'Te va a ser muy útil :)', color: 'blue', type: 'texto'},
                    {message: 'Muchas gracias!', color: 'red', type: 'texto'},
                    {message: 'Quedamos en contacto', color: 'blue', type: 'texto'}
                ])
        }, [])

    return (
        <div className={` ${styles.SecuencePremiumCard} ${styles['blocked']}`} style={{'height':'100%'}}>

            <div className={estilo.card_container}>
               
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
                                        addMessage(red_new_message, "red", "mensaje") } }>Enviar</button>
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
                                        addMessage(blue_new_message, "blue", "mensaje") } }>Enviar</button>
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
                        <div className={styles.lock_overlay}>
                            <div>
                                <FontAwesomeIcon icon={faLock} />
                                <p>Desbloqueá esta funcionalidad</p>
                            </div>
                        </div>
                </div>
                
            </div>
        </div>
    
    );
}



export default BlockedPreVisual;