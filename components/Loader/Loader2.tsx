import { AnimatePresence, motion } from 'framer-motion';
import styles from './Loader.module.css';

export interface Loader2 {
    loading : boolean;
}


const Loader2: React.FC<Loader2> = ({ loading }) => {


    return (
        <AnimatePresence>
                {loading &&
                    <motion.div className={styles.loadingBckgr}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                    <motion.div className={styles.loadingCont2}>
                        <div className={styles.preloader}>
                            <div className={styles.loader}></div>
                        </div>
                    </motion.div>
                    </motion.div>
                }
                </AnimatePresence>
    
    );
}

export default Loader2;
