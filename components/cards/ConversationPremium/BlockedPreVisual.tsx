import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import estilo from '../Card/FreeCard.module.css';
import styles from './ConversationPremium.module.css';


const BlockedPreVisual: React.FC = () => {
    
    const dummycontent = [
                {info: '¡Manuel! Como va eso?', color: 'blue', type: 'texto'},
                {info: 'Hola, todo bien, vos?', color: 'red', type: 'texto'},
                {info: 'Excelente, ya te paso la guía!', color: 'blue', type: 'texto'},
                {info: 'la-respuesta-a-las-10-objeciones.pdf', color: 'blue', type: 'texto'},
                {info: 'Te va a ser muy útil :)', color: 'blue', type: 'texto'},
                {info: 'Muchas gracias!', color: 'red', type: 'texto'},
                {info: 'Quedamos en contacto', color: 'blue', type: 'texto'}
            ]



    return (
        <div className={` ${styles.SecuencePremiumCard} ${styles['blocked']}`} style={{'height':'100%'}}>
            <div className={estilo.card_container}>
                <div className={styles.chat_window}>
                    <div>
                        <div>
                            {dummycontent.map((message, index) => (
                                <div className={styles.message_cont} key={`mensajeBloqueado${index}`}>
                                <div className={`${styles.message}  ${message.color == "blue" ? `${styles.blue_message} ${styles.blue_type}` : `${styles.red_message}
                                        ${styles.red_type}` }`}>
                                    <div>
                                        <p>{message.info}</p>
                                    </div>
                                    <img src="/delete_white.svg"/>
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