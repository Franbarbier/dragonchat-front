import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiSenderWhatsappController from "../../../api/apiSenderWhatsappController";
import { HOST_URL, LOGIN_COOKIE } from "../../../constants/index";
import { EVENT_KEY, ROUTES, SENDING_STATE, STATUS } from "../../../enums";
import CustomColorBtn from "../../CustomColorBtn/CustomColorBtn";
import Loader2 from "../../Loader/Loader2";
import { INotification } from "../../Notification/Notification";
import CardTitle from "../CardTitle/CardTitle";
import { ContactInfo } from "../CardsContFree";
import HeaderRow from "../HeaderRow/HeaderRow";
import CardStructure from "./CardStructure";
import styles from "./FreeCard.module.css";
import { globalName } from "./sendUtils";

export interface IFreeCard3 {
  activeCard: number;
  contactos: ContactInfo[];
  setContactos: (contactos: ContactInfo[]) => void;
  setMessagesLimitAchieved: (limit: boolean) => void;
  messagesLimitAchieved: boolean;
  setModalShieldOptions: (limit: boolean) => void;
  modalShieldOptions : boolean;

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
  setListCounter : (val:number) => void;
  isPaid : boolean;
  setModalPro: (modalPro: boolean) => void;

  delayBetween : number;

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
  setListCounter,
  modalShieldOptions,
  isPaid,
  setModalPro,
  delayBetween

}) => {
  let idCard = 3;
  let router = useRouter();

  const [sending, setSending] = useState<boolean>(false);
  const [dejarDeEnviar, setDejarDeEnviar] = useState<boolean>();

  const [errorCounter, setErrorCounter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false)

  const userInfo = JSON.parse(Cookie.get("dragonchat_login") || "{}");
  

  useEffect(() => {
      if (timer == 3 && bloques == 0 && pausa == 0) {
        setActiveShield(false)
      }
  },[modalShieldOptions])


  async function sendMove(cnt:number) {

    let count = cnt;

    try{

    const destinatario:ContactInfo = contactos[count];

    // controlar si el destinatario ya fue enviado, si es asi, se salta al siguiente
    if (destinatario.estado == STATUS.SUCCESS || destinatario.estado == STATUS.ERROR) {
      setListCounter(count + 1);
      return;
    }

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
        dio500(false)

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
          dio500(false)

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
          dio500(false)

        }else if(sentMessage?.response?.status == 500){
          dio500(true)
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
        setNotification({
          status: STATUS.SUCCESS,
          render: true,
          message: 'Envío realizado con éxito!',
          modalReturn: () => {
            setNotification({...notification, render : false})
          }
        });
        setLoading(true)

      }


      setTimeout(()=>{
        setListCounter(count + 1);
      }, delay * 1000)

    };
        
    // Check [name] variations
    let newCurrent = globalName(currentMessage)

    const sentMessage = await apiSenderWhatsappController.sendMessage(
      userInfo.user_id,
      destinatario.nombre,
      newCurrent,
      destinatario.numero,
      userInfo.access_token,
      delayBetween
    );

    onSuccess();
    

  }catch(error){
    setSendingState(SENDING_STATE.PAUSED)
    alert("Ocurrio un error inesperado en la plataforma. Por favor intenta mas tarde.")
  }


  }

  


  function dio500(val) {
    if (val) {
      setErrorCounter(errorCounter + 1);
    }else{
      setErrorCounter(0);
    }
  }

  useEffect(() => {
    if (errorCounter == 5){
          setSending(false);
          (async () => {
            setDejarDeEnviar(true);
            
            const authToken = JSON.parse(Cookie.get(LOGIN_COOKIE)).access_token;
            const response = await apiSenderWhatsappController.disconnect(authToken);

            if ((response as { status: number }).status == 200) {
              setNotification({
                status: STATUS.ERROR,
                render: true,
                message: 'Tu dispositivo no está vincualdo!',
                modalReturn: () => {
                  setNotification({...notification, render : false})
                }
              });
              setTimeout(() => { window.location.href = ROUTES.QR; }, 700);
            } else {
              setNotification({
                status: STATUS.ERROR,
                render: true,
                message: 'Ocurrió un error inesperado. Por favor desvincula tu dispositivo y vuelve a intentarlo.',
                modalReturn: () => {
                  setNotification({...notification, render : false})
                }
              });
            }
          })();
        }
  }, [errorCounter]);

  
  useEffect(() => {

    if (sendingState === SENDING_STATE.SENDING && listCounter < contactos.length - 1) {
        const contacti = [...contactos]

        // check if contacti[listCounter] has "estado" as a property
        if (!contacti[listCounter].hasOwnProperty("estado")) {
          contacti[listCounter].estado = STATUS.PENDING
        }
        setContactos(contacti) 
        sendMove(listCounter);
    }

    if( listCounter == contactos.length -1 ){
      setModalFinish(true);
      setLoading(false)
    }

  }, [sendingState, listCounter]);

  // setListCounter(0)
  const handleButtonClick = async () => {

    if (sendingState === SENDING_STATE.INIT || sendingState === SENDING_STATE.PAUSED) {
      setSendingState(SENDING_STATE.SENDING);
    } 
    if (sendingState === SENDING_STATE.SENDING) {
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

  // set trigger when enter is pressed, and disable it when the component is unmounted
  function handleEnter(event) {
    if (event.key == EVENT_KEY.ENTER ) {
      
      if (sendingState === SENDING_STATE.FINISH) {
        nuevaDifusion()
      }
      handleButtonClick()
      
    }
  }
  useEffect(() => {
    if (activeCard == idCard) { 
      document.addEventListener("keydown", handleEnter);
      return () => {
        document.removeEventListener("keydown", handleEnter);
      };
    }
  });

  return (
    <CardStructure id_card={idCard} activeCard={activeCard} isPaid={isPaid} setModalPro={setModalPro}>
    <>
    {activeCard == idCard &&
      <div className={styles.card_container}>
        <div>
          <CardTitle text={!sending ? "Enviar" : "Enviando"} />
        </div>
        <div className={styles.card_table_cont}>
          <HeaderRow campos={["Nombre", "Número"]} key="header-row-sendFree" />

          <div className={`${styles.table_rows} ${styles.enviando_table}`}>
            
            {contactos.map((contact, index) => (
              
              <div key={`contactoFinal${index}`}>
                {contactos.length - 1 != index && (
                  
                  <div
                  className={`${styles.row_card} ${
                    contact.estado == STATUS.ERROR && styles.error
                  } ${contact.estado == STATUS.SUCCESS && styles.success}`}
                  key={contact.nombre + index}
                  >
                    <AnimatePresence>

                      {((index == listCounter && contact.estado != STATUS.ERROR && contact.estado != STATUS.SUCCESS && sendingState == SENDING_STATE.SENDING ) || (contact.estado == STATUS.PENDING && sendingState == SENDING_STATE.PAUSED) ) && (
                      
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
                  {/* <aside><span>{delayTimer}</span></aside> */}
              </div>
            ))}
          </div>
        
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
                ) : 
                    <>
                  { sendingState === SENDING_STATE.SENDING ?
                      <button className={styles.pausarEnvio}  onClick={() => { handleButtonClick() }}>
                        <img src="./pausa.png" />
                        <span>PAUSAR ENVIO</span>
                      </button>
                      :
                      <>
                      <CustomColorBtn
                        type="submit"
                        text={ "Enviar" }
                        backgroundColorInit={ "#c21c3b" }
                        backgroundColorEnd={ "#f9bd4f" }
                        borderColor={ "#e17846"}
                        onClick={() => {
                          handleButtonClick()
                        }}
                        disable={ contactos[listCounter].estado == STATUS.PENDING }
                      />
                      </>
                  }
                  </>
                }
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
    }
      <Loader2 loading={loading} />

    </>
    </CardStructure>
  );
};

export default FreeCard3;