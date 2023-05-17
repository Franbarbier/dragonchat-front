import { AnimatePresence, motion } from 'framer-motion';
import styles from './Loader.module.css';

export interface Loader {
    loading : boolean;
}


const Loader: React.FC<Loader> = ({ loading }) => {


    return (
        <AnimatePresence >
        {loading &&
            <motion.div className={styles.loadingCont}
                initial={{ width: 0 }}
                exit={{ width: 0 }}
                animate={{ width: "100%" }}
            >
                <div>
                </div>
            </motion.div>
        }
        </AnimatePresence>
    
    );
}

export default Loader;
