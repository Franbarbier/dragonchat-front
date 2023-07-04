import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiSenderWhatsappController from "../../../api/apiSenderWhatsappController";
import { SENDING_STATE } from "../../../enums";
import CustomColorBtn from "../../CustomColorBtn/CustomColorBtn";
import OrangeBtn from "../../OrangeBtn/OrangeBtn";
import CardTitle from "../CardTitle/CardTitle";
import { ContactInfo } from "../CardsContFree";
import HeaderRow from "../HeaderRow/HeaderRow";
import styles from "./FreeCard.module.css";

export interface IFreeCard3 {
  setActiveCard: (id: number) => void;
  activeCard: number;
  contactos: ContactInfo[];
  messagesLimitAchieved: boolean;
  setMessagesLimitAchieved: (limit: boolean) => void;
  mensaje: string;
  setContactos: (contactos: ContactInfo[]) => void;
  modalShieldOptions: boolean;
  setModalShieldOptions: (limit: boolean) => void;
  shieldOptions: {
    timer: number;
    pausa: number;
    bloques: number;
  };
  finishSending: boolean;
  setFinishSending: (finish: boolean) => void;
}

const FreeCard3: React.FC<IFreeCard3> = ({
  setActiveCard,
  activeCard,
  contactos = [],
  setContactos,
  mensaje,
  setMessagesLimitAchieved,
  messagesLimitAchieved,
  modalShieldOptions,
  setModalShieldOptions,
  shieldOptions,
  finishSending,
  setFinishSending,
}) => {
  let idCard = 3;
  let router = useRouter();

  const [sending, setSending] = useState<boolean>(false);
  const [timers, setTimers] = useState<Array<NodeJS.Timeout>>([]);
  const [dejarDeEnviar, setDejarDeEnviar] = useState<boolean>();
  const [sendingState, setSendingState] = useState<SENDING_STATE>(SENDING_STATE.INIT);

  const [activeShield, setActiveShield] = useState<boolean>(false);

  const [timer, setTimer] = useState(200);
  const [bloques, setBloques] = useState<number>(0);
  const [pausa, setPausa] = useState<number>(0);

  async function sendMove(userInfo, count) {
    const destinatario = contactos[count];
    let newContacts = [...contactos];
    newContacts[count].estado = "pending";
    setContactos(newContacts);
    const onSuccess = () => {
      if (sentMessage?.status == 200) {
        let newContacts = [...contactos];
        newContacts[count].estado = "success";
        setContactos(newContacts);
      } else {
        let newContacts = [...contactos];
        newContacts[count].estado = "error";
        setContactos(newContacts);
        if (sentMessage.response?.data?.error?.type == "EXCEEDED_LIMIT") {
          setMessagesLimitAchieved(true);
          setSending(false);
          setDejarDeEnviar(true);
        }
      }
    };
    const authToken = JSON.parse(
      Cookie.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)
    ).access_token;
    const sentMessage = await apiSenderWhatsappController.sendMessage(
      userInfo.user_id,
      destinatario.nombre,
      mensaje,
      destinatario.numero,
      authToken
    );
    onSuccess();
  }

  

  useEffect(() => {

    if (sendingState === SENDING_STATE.SENDING) {
      const arrayOfBlocks: Array<Array<ContactInfo>> = contactos.reduce(
        (accumulator, actualValue) => {
          if (
            actualValue.nombre.trim() === "" ||
            actualValue.numero.trim() === ""
          ) {
            return accumulator;
          }
          if (
            actualValue.estado === "success" || actualValue.estado === "error"
          ) {
            return accumulator;
          }
          if (accumulator.length === 0) {
            return [[actualValue]];
          }
          const lastIndex = accumulator.length - 1;
          const previus = accumulator[lastIndex];
          if (previus.length < bloques) {
            previus.push(actualValue);
            return accumulator;
          } else {
            return [...accumulator, [actualValue]];
          }
        },
        new Array<Array<ContactInfo>>()
      );

      const contacts = contactos.filter(
        (c) => c.numero.trim() !== '' && c.nombre.trim() !== ''
      );
      const userInfo = JSON.parse(Cookie.get("dragonchat_login") || "{}");

      let localTimers: Array<NodeJS.Timeout> = [];
      let messagesCount = 0;
      arrayOfBlocks.forEach((block, blockIndex) => {
        block.forEach((contact) => {
          const blockTime = (blockIndex * pausa);          
          const contactTime = (messagesCount * timer);
          const ms = blockTime + contactTime;
          messagesCount ++;
          const timerId = setTimeout(() => {
            const index = contacts.findIndex(
              (c) => c.numero === contact.numero
            );
            sendMove(userInfo, index);
            if (index === contacts.length -1 ) {
              setSendingState(SENDING_STATE.FINISH);
            }
          }, ms);
          localTimers.push(timerId);
        })        
      });
      setTimers(localTimers);
    }

  }, [sendingState])

  const handleButtonClick = async () => {
    if (sendingState === SENDING_STATE.INIT || sendingState === SENDING_STATE.PAUSED) {
      setSendingState(SENDING_STATE.SENDING);
    } 
    if (sendingState === SENDING_STATE.SENDING) {
      setSendingState(SENDING_STATE.PAUSED);
      timers.forEach((timerId) => {
        clearTimeout(timerId);
      })
    }
  };

  useEffect(() => {
    setActiveShield(true);
    setTimer(shieldOptions.timer > 0 ? shieldOptions.timer * 1000 : 200);
    setBloques(shieldOptions.bloques);
    setPausa(shieldOptions.pausa * 1000);
  }, [shieldOptions]);

  useEffect(() => {
    if (dejarDeEnviar) {
      setSendingState(SENDING_STATE.FINISH);
      setFinishSending(true);
    }
  }, [dejarDeEnviar]);

  return (
    <div
      className={`${styles.card} ${styles["numberCard" + activeCard]} ${
        activeCard == idCard && styles.active
      }`}
      id={`${styles["card" + idCard]}`}
    >
      <div className={styles.card_container}>
        <div>
          <CardTitle text={!sending ? "Enviar" : "Enviando"} />
        </div>
        <div className={styles.card_table_cont}>
          <HeaderRow campos={["Nombre", "Número"]} key="header-row-sendFree" />

          <div className={`${styles.table_rows} ${styles.enviando_table}`}>
            {contactos.map((contact, index) => (
              <>
                {contactos.length - 1 != index && (
                  // ${contact.status == "pending" && styles.fireLoader}
                  <div
                    className={`${styles.row_card} ${
                      contact.estado == "error" && styles.error
                    } ${contact.estado == "success" && styles.success}`}
                    key={contact.nombre + index}
                  >
                    <AnimatePresence>
                      {contact.estado == "pending" && (
                        <motion.aside
                          className={styles.fuegoLoader}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <video autoPlay loop>
                            <source src="/dc_fuego_min.mp4" type="video/mp4" />
                          </video>
                        </motion.aside>
                      )}
                    </AnimatePresence>

                    <div className="column50">
                      <div>
                        <>
                          <span>{contact.nombre}</span>
                        </>
                      </div>
                    </div>
                    <div className="column50">
                      <div>
                        <span>+{contact.numero}</span>
                      </div>
                    </div>

                    {/* <div className={styles.estado_envio}> */}
                    {contact.estado == "success" && (
                      <img className={styles.estado_envio} src="/check.svg" />
                    )}
                    {contact.estado == "error" && (
                      <img className={styles.estado_envio} src="/close.svg" />
                    )}
                    {/* </div> */}
                  </div>
                )}
              </>
            ))}
          </div>

          <div
            className={`${styles.options_cont} ${
              sending && styles.sending_anim_cont
            }`}
          >
            {!messagesLimitAchieved ? (
              <div className={styles.footerBtns}>
                <aside
                  className={activeShield ? styles.shieldOn : styles.shieldOff}
                  onClick={() => {
                    setActiveShield(!activeShield);
                  }}
                >
                  <div>
                    <img src="/shield-clock.svg" />
                    <div className={styles.shieldFilter}></div>
                  </div>
                  <aside
                    onClick={(e) => {
                      e.preventDefault();
                      setModalShieldOptions(true);
                    }}
                  >
                    <img src="/icon_config.svg" />
                  </aside>
                </aside>
                {sendingState === SENDING_STATE.FINISH ? (
                  <CustomColorBtn
                    type="submit"
                    text="Crear nueva difusion"
                    backgroundColorInit="#724cdf"
                    backgroundColorEnd="#3a94fe"
                    borderColor="#5573f0"
                    onClick={() => {
                      router.reload();
                    }}
                    disable={false}
                  />                  
                ) : (
                  <OrangeBtn
                    text={sendingState === SENDING_STATE.SENDING ? "Pausar" : "Enviar"}
                    onClick={handleButtonClick}
                  />
                )}
              </div>
            ) : (
              <>
                <button className={styles.limitedButton}>
                  <video autoPlay controls={false} loop>
                    <source src="/fire-bkgr.mp4" type="video/mp4" />
                  </video>
                  <FontAwesomeIcon icon={faLock} />
                  <p>ENVIAR</p>
                  <FontAwesomeIcon icon={faLock} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeCard3;
