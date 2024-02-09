import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styles from './WppBtn.module.css';


export interface IWppBtn {
    
}




const WppBtn: React.FC<IWppBtn> = ({  }) => {

    const [renderWppMsj, setRenderWppMsj] = useState<boolean>(false);

    return (
            <div id={styles.wpp_btn_cont}>
                <div>
                    <div>
                        <a href="https://wa.me/56946581170?text=Hola!%20Me%20contacto%20desde%20dragonchat%20por%20" target="_blank">
                            <img src="/whatsapp.png" />
                        </a>
                    </div>
                    <AnimatePresence>
                    {renderWppMsj &&
                            <motion.span
                                initial={{ opacity: 0, scale : 0.9, y : '-50%' }}
                                animate={{ opacity: 1, scale : 1, y : '-50%' }}
                                exit={{ opacity: 0, scale : 0.9, y : '-50%' }}
                            >Sacate cualquier duda de la plataforma! ❓😊</motion.span>
                    }
                    </AnimatePresence>
                </div>
            </div>
    
    );
}

export default WppBtn;

