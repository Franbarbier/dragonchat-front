import LoaderAnim from './LoaderAnim';
import styles from './QrWaitingRoom.module.css';


export interface IQrWaitingRoom {
    
}


const QrWaitingRoom: React.FC<IQrWaitingRoom> = ({ }) => {



    return (
        <div className={styles.QrWaitingRoomCont}>
            <div>
                <div>
                    <div className={styles.dragon1}>
                        <img src="/dragon-animacion-unscreen.gif" alt="dragon1" />
                    </div>
                    <div className={styles.dragon2}>
                        <img src="/dragon-animacion-unscreen.gif" alt="dragon1" />
                    </div>
                </div>
            </div>
            <div className={styles.waitingMessage}>
                <h5>Esperando tu lugar en la fila para usar DragonChat</h5>
                <h6>¿Querés usar la plataforma sin esperar?</h6>
            </div>
            <LoaderAnim />
            <div className={styles.queuInfo}>
                <div>
                    <p>Quedan <span>10 personas</span> para que llegue tu turno.</p>
                    <span>(Máximo tiempo de espera: <span>110 minutos.</span>)</span>
                </div>
            </div>
        </div>
        
        
    
    );
}

export default QrWaitingRoom;

