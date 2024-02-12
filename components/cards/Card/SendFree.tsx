import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiSenderWhatsappController from "../../../api/apiSenderWhatsappController";
import { HOST_URL } from "../../../constants/index";
import { ROUTES, SENDING_STATE, STATUS } from "../../../enums";
import CustomColorBtn from "../../CustomColorBtn/CustomColorBtn";
import { INotification } from "../../Notification/Notification";
import OrangeBtn from "../../OrangeBtn/OrangeBtn";
import CardTitle from "../CardTitle/CardTitle";
import { ContactInfo } from "../CardsContFree";
import HeaderRow from "../HeaderRow/HeaderRow";
import styles from "./FreeCard.module.css";

export interface IFreeCard3 {
  activeCard: number;
  contactos: ContactInfo[];
  setContactos: (contactos: ContactInfo[]) => void;
  setMessagesLimitAchieved: (limit: boolean) => void;
  messagesLimitAchieved: boolean;
  setModalShieldOptions: (limit: boolean) => void;

  setActiveCard: (id: number) => void;

  sendingState: SENDING_STATE;
  setSendingState: (state: SENDING_STATE) => void;
  messages: string[][];
  setBlackList: (contactos: ContactInfo[]) => void;

  notification : INotification;
  setNotification : (notification: INotification) => void;

  activeShield: boolean;
  setActiveShield: (active: boolean) => void;
  setModalFinish: (mod: boolean) => void;
  setRenderDialog : (render: boolean) => void;
  timer : number;
  bloques : number;
  pausa : number;

  modalFinish : boolean;
  nuevaDifusion : () => void;
  listCounter : number;
  setListCounter : (val:number) => void

}


const FreeCard3: React.FC<IFreeCard3> = ({
  activeCard,
  contactos = [],
  setContactos,
  setMessagesLimitAchieved,
  messagesLimitAchieved,
  setModalShieldOptions,
  sendingState,
  setSendingState,
  messages,
  notification,
  setNotification,
  setBlackList,
  setModalFinish,
  setRenderDialog,
  setActiveShield,
  activeShield,
  timer,
  bloques,
  pausa,
  modalFinish,
  nuevaDifusion,
  listCounter,
  setListCounter

}) => {
  let idCard = 3;
  let router = useRouter();

  const [sending, setSending] = useState<boolean>(false);
  const [dejarDeEnviar, setDejarDeEnviar] = useState<boolean>();


  const userInfo = JSON.parse(Cookie.get("dragonchat_login") || "{}");
  

  async function sendMove(cnt:number) {

    let count = cnt;

    try{

    const destinatario:ContactInfo = contactos[count];

    let currentMessage:string[] = []

    for(let i = 0; i < messages.length; i++){
      const stringIndex = count % messages[i].length;   
      currentMessage.push(messages[i][stringIndex])
    }

    let newContacts = [...contactos];

    // Send currentString to the recipient
    const onSuccess = () => {

      if (sentMessage?.status == 200 || sentMessage?.status == 201) {
        newContacts[count].estado = STATUS.SUCCESS;
      } else {
        let newContacts = [...contactos];
        newContacts[count].estado = STATUS.ERROR;
        
        // @ts-ignore
        setBlackList((prevBlackList: ContactInfo[]) => [...prevBlackList, destinatario]);
        
        if (sentMessage?.response?.status == 429) {

          setNotification({
            status: STATUS.ERROR,
            render: true,
            message: 'Alcanzaste el limite maximo de mensajes diarios para la version gratuita.',
            modalReturn: () => {
              setNotification({...notification, render : false})
            }
          });
          setMessagesLimitAchieved(true);
          setRenderDialog(true)
          setSending(false);
          setDejarDeEnviar(true);
        }else if (sentMessage?.response?.status == 410) {
          setSending(false);
          setDejarDeEnviar(true);
          setNotification({
            status: STATUS.ERROR,
            render: true,
            message: 'Tu dispositivo no está vincualdo.',
            modalReturn: () => {
              setNotification({...notification, render : false})
            }
          });
          setTimeout(() => { window.location.href = ROUTES.QR; }, 1000);
        }
      }

      setContactos(newContacts);
      


      // Sistema de delays, que chequea si el escudo esta activo y si es asi, aplica los delays correspondientes
      let delay = 3 //min
      if (activeShield){
        delay = timer
        
        if (listCounter % bloques == bloques-1 && listCounter != 0) {
          delay = delay + (pausa * 60)
        }
      }

      if (listCounter == contactos.length - 2) {
        setTimeout(() => {
          setModalFinish(true);
        }, 500);
      }

      setTimeout(()=>{
        setListCounter(count + 1);
      }, delay * 1000)

    };
        
    const sentMessage = await apiSenderWhatsappController.sendMessage(
      userInfo.user_id,
      destinatario.nombre,
      currentMessage,
      destinatario.numero,
      userInfo.access_token
    );

    onSuccess();
    

  }catch(error){
    alert("Ocurrio un error inesperado en la plataforma. Por favor intenta mas tarde.")
  }


  }



  
  useEffect(() => {
    if (sendingState === SENDING_STATE.SENDING && listCounter < contactos.length - 1) {
        sendMove(listCounter);
    }
  }, [sendingState, listCounter]);



  

  const handleButtonClick = async () => {

    if (sendingState === SENDING_STATE.INIT || sendingState === SENDING_STATE.PAUSED) {
      setSendingState(SENDING_STATE.SENDING);
    } 
    if (sendingState === SENDING_STATE.SENDING) {
      let newContacts = [...contactos];
      newContacts[listCounter].estado = STATUS.PENDING;
      setContactos(newContacts)
      setSendingState(SENDING_STATE.PAUSED);
    }
  };


  useEffect(() => {
    if (dejarDeEnviar) {
      setSendingState(SENDING_STATE.FINISH);
    }
  }, [dejarDeEnviar]);



  useEffect(() => {

    if (modalFinish) {
      setSendingState(SENDING_STATE.FINISH);
    }

  }, [modalFinish])

  return (

    
    <div
    className={`${styles.card} ${styles["numberCard" + activeCard]} ${
      activeCard == idCard && styles.active
    }`}
    id={`${styles["card" + idCard]}`}
    key={`card${idCard}`}
    >      
    {activeCard == idCard &&
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
                  // ${contact.status == STATUS.PENDING && styles.fireLoader}
                  <div
                    className={`${styles.row_card} ${
                      contact.estado == STATUS.ERROR && styles.error
                    } ${contact.estado == STATUS.SUCCESS && styles.success}`}
                    key={contact.nombre + index}
                  >
                    <AnimatePresence>
                      {((index == listCounter && sendingState == SENDING_STATE.SENDING && contact.estado != STATUS.ERROR && contact.estado != STATUS.SUCCESS) || contact.estado == STATUS.PENDING ) && (

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

                    {contact.estado == STATUS.SUCCESS && (
                      <img className={styles.estado_envio} src="/check.svg" />
                    )}
                    {contact.estado == STATUS.ERROR && (
                      <img className={styles.estado_envio} src="/close.svg" />
                    )}
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
                >
                  <div onClick={() => {
                    setActiveShield(!activeShield);
                  }}>
                    <img src="/shield-clock.svg" />
                    <div className={styles.shieldFilter}></div>
                  </div>
                  <aside
                    onClick={(e) => {
                      e.preventDefault();
                      if ( sendingState == SENDING_STATE.FINISH ) {
                        return false;
                        
                      }
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
                      nuevaDifusion()
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
                <div className={styles.limitMsjCTA}
                  onClick={() => {
                    window.location.href = `${HOST_URL}${ROUTES.CHECKOUT}`;
                  }}
                >
                  <div>
                    <span>
                      Llegaste a tu límite diario de 50 mensajes!
                    </span>
                    <br/>
                    <span>
                      Para seguir enviando mensajes pasate al <u><b>plan premium</b></u>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    }
    </div>
  );
};

export default FreeCard3;