import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "./WppBtn.module.css";

export interface IWppBtn {}

const WppBtn: React.FC<IWppBtn> = ({}) => {
  const [renderWppMsj, setRenderWppMsj] = useState<boolean>(false);

  function wppLink(number, message) {
    const encodedMessage = encodeURIComponent(message);

    const whatsappLink = `https://wa.me/${number}?text=${encodedMessage}`;

    return whatsappLink;
  }

  const whatsappLink = wppLink(
    573104719365,
    "Hola! Me contacto desde dragonchat por"
  );

<<<<<<< HEAD
    const [renderWppMsj, setRenderWppMsj] = useState<boolean>(false);


    function wppLink(number, message) {
        // Encode the message by replacing spaces with '%20'
        const encodedMessage = encodeURIComponent(message);
      
        // Construct the WhatsApp link with the encoded message
        const whatsappLink = `https://wa.me/${number}?text=${encodedMessage}`;
      
        return whatsappLink;
      }

    const whatsappLink = wppLink(56946581170, 'Hola! Me contacto desde dragonchat por')

    return (
            <div id={styles.wpp_btn_cont}>
                <div>
                    <div>
                        <a href={whatsappLink} target="_blank">
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
=======
  return (
    <div id={styles.wpp_btn_cont}>
      <div>
        <div>
          <a href={whatsappLink} target="_blank">
            <img src="/whatsapp.png" />
          </a>
        </div>
        <AnimatePresence>
          {renderWppMsj && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9, y: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, y: "-50%" }}
            >
              Sacate cualquier duda de la plataforma! ❓😊
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
>>>>>>> develop

export default WppBtn;