import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { STATUS } from '../../enums';
import styles from './Notification.module.css';

export interface INotification {
    status : STATUS;
    render : boolean;
    message : string;
    modalReturn : (value:boolean) => void;
}


const Notification: React.FC<INotification> = ({ status, render, message, modalReturn }) => {


    const handleButtonClick = (value) => {
        modalReturn(value); // Close the modal and pass the button value as the result
    };

    useEffect(() => {
        if(render && status == STATUS.SUCCESS || status == STATUS.ERROR){
            setTimeout(() => {
                modalReturn(true);
            }, 3500);
        }
    }, [render]);

    return (
        <AnimatePresence>
            {render && (status == STATUS.SUCCESS || status == STATUS.ERROR ) && (

                <motion.div className={styles.notificationCont}
                initial={{ opacity: 0, x : 50 }}
                exit={{ opacity: 0, x : 50 }}
                animate={{ opacity: 1, x : 0 }}
                key="notificationSimple"
                >

                    <div>
                        {status == STATUS.SUCCESS && <img className={styles.checkNotif} src={`/check.svg`} alt="icon"/> }
                        {status == STATUS.ERROR && <img className={styles.errorNotif} src={`/close.svg`} alt="icon"/> }
                        {/* {status == 'alert' && <img className={styles.alertNotif} src={`/exclamation.svg`} alt="icon"/> } */}
                        
                        <span>{message}</span>
                    </div>
                    <div className={styles.notifBtns}>
                        
                        <button onClick={()=>{ handleButtonClick(true) }} className={styles.notifOk}>Entendido</button>

                    </div>
                </motion.div>
            )}
            {render && (status == STATUS.ALERT ) && (
                <motion.div className={styles.alertBckgr}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key="notificationSimple"
                onClick={()=>{ handleButtonClick(false) }}
                >

                    <motion.div className={styles.notificationCont}
                    initial={{ opacity: 0, x : 50 }}
                    exit={{ opacity: 0, x : 50 }}
                    animate={{ opacity: 1, x : 0 }}
                    key="notificationAlert"
                    onClick={(e)=>{ e.stopPropagation(); } }
                    >

                        <div>
                            <img className={styles.alertNotif} src={`/exclamation.svg`} alt="icon"/>
                            
                            <span>{message}</span>
                        </div>
                        <div className={styles.notifBtns}>
                            <button onClick={()=>{ handleButtonClick(false) }} className={styles.notifCancel} >Cancelar</button>
                            <button onClick={()=>{ handleButtonClick(true) }} className={styles.notifOk}>Confirmar</button>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    
    );
}

export default Notification;
