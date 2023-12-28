import styles from './MultiMessages.module.css';

export interface IMultiMessages {

}

const MultiMessages: React.FC<IMultiMessages> = ({ }) => {
   


    return (
            <div className={styles.MultiMessages_cont}>
                <div>
                    <div>
                        <ul>
                            <li>Puedes mandar hasta 3 mensajes en un solo envio.</li>
                            <li>Escribiendo <strong>[name]</strong> se va a enviar dinamicamente el nombre del destinatario.</li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}

export default MultiMessages;