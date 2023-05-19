import { AnimatePresence, motion } from 'framer-motion';
import styles from './Notification.module.css';

export interface INotification {
    status : "success" | "error" | "alert";
    render : boolean;
    message : string;
    modalReturn : (value:boolean) => void;
}


const Notification: React.FC<INotification> = ({ status, render, message, modalReturn }) => {


    const handleButtonClick = (value) => {
        modalReturn(value); // Close the modal and pass the button value as the result
    };

    return (
        <AnimatePresence >
        {render &&
            <motion.div className={styles.notificationCont}
                initial={{ opacity: 0, y : -50, x: '-50%' }}
                exit={{ opacity: 0, y : -50, x: '-50%' }}
                animate={{ opacity: 1, y : 0, x: '-50%' }}
            >
                <div>
                    {status == 'success' && <img className={styles.checkNotif} src={`/check.svg`} alt="icon"/> }
                    {status == 'error' && <img className={styles.errorNotif} src={`/close.svg`} alt="icon"/> }
                    {status == 'alert' && <img className={styles.alertNotif} src={`/exclamation.svg`} alt="icon"/> }
                    
                    <span>{message}</span>
                </div>
                <div className={styles.notifBtns    }>
                    {status == 'alert' &&
                        <button onClick={()=>{ handleButtonClick(false) }} className={styles.notifCancel} >Cancelar</button>
                    }
                    <button onClick={()=>{ handleButtonClick(true) }} className={styles.notifOk}> {status == 'alert' ? "Confirmar" : "Entendido" }</button>

                </div>
            </motion.div>
        }
        </AnimatePresence>
    
    );
}

export default Notification;
