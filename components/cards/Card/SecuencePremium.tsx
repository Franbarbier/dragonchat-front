import { useState } from 'react';
import CardTitle from '../../CardTitle/CardTitle';
import styles from './FreeCard.module.css';

export interface ISecuenceMessage {
    setActiveCard: (id: number) => void,
    activeCard : number;
    
}

const SecuenceMessage: React.FC<ISecuenceMessage> = ({ setActiveCard, activeCard }) => {

    const [chat, setChat] = useState<object[]>([])

    const [modalAddMessage, setModalAddMessage] = useState('')
    const [red_new_message, setRed_new_message] = useState('')
    const [blue_new_message, setBlue_new_message] = useState('')

    const idCard = 1

    function addMessage(message:string, color:string){
        setChat( [...chat, {message, color}] )
    }

    console.log(chat)


    return (
        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} 
        onClick={()=>{
            setModalAddMessage('')
        }}
        >

            <div className={styles.card_container}>
                <div>
                    <CardTitle text={"Mensaje"} />
                </div>
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
                                <div className={`${message.color == "blue" ? `${styles.blue_message} ${styles.blue_type}` : `${styles.red_message} ${styles.red_type}` } ${styles.message}`} >
                                    {console.log(message.color)}
                                    <div>
                                        <p>{message.message}</p>
                                    </div>
                                    <img src="/delete_white.svg" onClick={()=>{ setChat( chat.filter( msg => msg != message  )) }}/>
                                </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.btns_cont}>
                    
                    
                </div>
            </div>
        </div>
    
    );
}

export default SecuenceMessage;