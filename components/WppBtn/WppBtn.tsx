import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "./WppBtn.module.css";

export interface IWppBtn {}

const WppBtn: React.FC<IWppBtn> = ({}) => {
  const [renderWppMsj, setRenderWppMsj] = useState<boolean>(false);

  function wppLink(number, message) {
    const encodedMessage = encodeURIComponent(message);

    const whatsappLink = `https://api.whatsapp.com/send?phone=${number}?text=${encodedMessage}`;

    return whatsappLink;
  }

  const whatsappLink = wppLink(
    573104707671,
    "Hola!! Paso por acá porque necesito ayuda con el DragonChat"
  );

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

export default WppBtn;