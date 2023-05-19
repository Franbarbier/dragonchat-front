import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import styles from './QrWaitingRoom.module.css';


export interface IReconnect {
}


const Reconnect: React.FC<IReconnect> = ({ }) => {



    return (
        <div className={styles.ReconnectCont}>
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
                <h5>Parece que tu tiempo de conexión ha terminado!</h5>
                <div style={{ width : "60%", margin : "5% auto 0" }}> 
                    <CustomColorBtn
                        type="submit"
                        text="Volver a la fila"
                        backgroundColorInit="#c21c3b"
                        backgroundColorEnd="#f9bd4f"
                        borderColor="#e17846"
                        onClick={ ()=>{ window.location.href = "/qr" } }
                    />

                </div>
            </div>
            
        </div>
        
        
    
    );
}

export default Reconnect;

