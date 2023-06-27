import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import apiSenderWhatsappController from '../../../api/apiSenderWhatsappController';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import OrangeBtn from '../../OrangeBtn/OrangeBtn';
import { ContactInfo } from '../CardsContFree';
import CardTitle from '../CardTitle/CardTitle';
import HeaderRow from '../HeaderRow/HeaderRow';
import styles from './FreeCard.module.css';



export interface IFreeCard3 {
    setActiveCard: (id: number) => void;
    activeCard : number;
    contactos : ContactInfo[];
    messagesLimitAchieved : boolean;
    setMessagesLimitAchieved : (limit: boolean) => void;
    mensaje: string ;
    setContactos : (contactos: ContactInfo[]) => void;
    modalShieldOptions : boolean;
    setModalShieldOptions : (limit: boolean) => void;
    shieldOptions : {
        timer: number,
        pausa : number,
        bloques: number
    };
    finishSending : boolean;
    setFinishSending : (finish: boolean) => void;
    
}

const FreeCard3: React.FC<IFreeCard3> = ({ setActiveCard, activeCard, contactos=[], setContactos, mensaje, setMessagesLimitAchieved, messagesLimitAchieved, modalShieldOptions, setModalShieldOptions, shieldOptions, finishSending, setFinishSending }) => {

    let idCard = 3;
    let router= useRouter()

    const [sending, setSending] = useState<boolean>(false)
    const [dejarDeEnviar, setDejarDeEnviar] = useState<boolean>()

    const [activeShield, setActiveShield] = useState<boolean>(false)

    async function sendMove(userInfo, count) {
            const destinatario = contactos[count];
            let newContacts = [...contactos];
            newContacts[count].estado = "pending";
            setContactos(newContacts)
            const onSuccess = () => {
                    if (sentMessage?.status == 200) {
                        let newContacts = [...contactos]
                        newContacts[count].estado = "success";
                        setContactos(newContacts)
                    } else{   
                        let newContacts = [...contactos]
                        newContacts[count].estado = "error";
                        setContactos(newContacts)
                        if(sentMessage.response?.data?.error?.type == "EXCEEDED_LIMIT"){
                            setMessagesLimitAchieved(true)
                            setSending(false)
                            setDejarDeEnviar(true)
                        }
                    }
                }
            const authToken = JSON.parse(Cookie.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).access_token;
            const sentMessage = await apiSenderWhatsappController.sendMessage(
                userInfo.user_id, destinatario.nombre, mensaje, destinatario.numero, authToken
            )
            onSuccess()
    }


    const [isLooping, setIsLooping] = useState(false);
    const [counter, setCounter] = useState(0);
    
    const [timer, setTimer] = useState(1000);
    const [bloques, setBloques] = useState<number>(0);
    const [pausa, setPausa] = useState<number>(0);
    

    useEffect(() => {

        let intervalId: NodeJS.Timeout;

        if (isLooping && counter < contactos.length - 1) {
        intervalId = setInterval(() => {
            const userInfo = JSON.parse( Cookie.get('dragonchat_login') || "{}" );
            
            sendMove(userInfo, counter)

            // Movida para pausar el loop cada X mensajes
            if ((counter+1) % bloques === 0 && counter !== 0) {
                clearInterval(intervalId); // Pause the loop
                setTimeout(() => {
                  // Resume the loop after X seconds
                  intervalId = setInterval(() => {
                    const userInfo = JSON.parse(Cookie.get("dragonchat_login") || "{}");
                    sendMove(userInfo, counter);
                    setCounter((c) => c + 1);
                  }, timer);
                }, pausa);
              } else {
                setCounter((c) => c + 1);
              }


            // setCounter(counter + 1);
        }, timer);
        }

        return () => {
        clearInterval(intervalId);
        };

    }, [isLooping, counter]);


    const handleButtonClick = () => {
        setIsLooping(!isLooping);
    };

    useEffect(() => {
        setActiveShield(true)
        setTimer( shieldOptions.timer * 1000 )
        setBloques( shieldOptions.bloques )
        setPausa( shieldOptions.pausa * 1000 )
    }, [shieldOptions])


    useEffect(() => {
        if (dejarDeEnviar || counter == contactos.length -1) {
            setIsLooping(false)
            setFinishSending(true)
        }
    }, [dejarDeEnviar, counter])



    return (
        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`}>
            
            <div className={styles.card_container}>
            <div>
                <CardTitle text={!sending ? 'Enviar' : 'Enviando' } />
            </div>
            <div className={styles.card_table_cont}>

                <HeaderRow campos={["Nombre", "Número"]} key="header-row-sendFree"/>
             
                <div className={`${styles.table_rows} ${styles.enviando_table}`}>
                    {contactos.map((contact, index)=>(
                        <>
                        {contactos.length - 1 != index &&
                        
                            <div className={`${styles.row_card} ${contact.estado == "error" && styles.error} ${contact.estado == "success" && styles.success}`} key={contact.nombre+index} >

                                <AnimatePresence>

                                {contact.estado == "pending" && 
                                    <motion.aside className={styles.fuegoLoader}
                                        initial={{ opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <video autoPlay loop>
                                            <source src="/dc_fuego_min.mp4" type="video/mp4" />
                                        </video>
                                    </motion.aside>
                                }
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
                                    
                                    {contact.estado == "success" && <img className={styles.estado_envio} src="/check.svg" />}
                                    {contact.estado == "error" && <img className={styles.estado_envio} src="/close.svg" />}
                            </div>
                            }
                            </>
                        ))

                        }

                    
                </div>

                <div className={`${styles.options_cont} ${sending && styles.sending_anim_cont }`}>
                    {!messagesLimitAchieved ?
                        <div className={styles.footerBtns}>
                            <aside className={ activeShield ? styles.shieldOn : styles.shieldOff }  >
                                <div onClick={()=>{ setActiveShield(!activeShield) }}>
                                    <img src="/shield-clock.svg"/>
                                    <div className={styles.shieldFilter} ></div>
                                </div>
                               <aside onClick={(e)=>{ e.preventDefault(); setModalShieldOptions(true) }}>
                                    <img src="/icon_config.svg"/>
                                </aside> 
                            </aside>
                            {!finishSending ?
                                <OrangeBtn text={!isLooping ? 'Enviar' : 'Pausar' } onClick={handleButtonClick} />
                                :
                                <CustomColorBtn
                                type="submit"
                                text="Crear nueva difusion"
                                backgroundColorInit="#724cdf"
                                backgroundColorEnd="#3a94fe"
                                borderColor="#5573f0"
                                onClick={()=>{ router.reload() }}
                                disable={ false}
                                />
                            }
                               
                        </div>
                    :
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
                    }
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default FreeCard3;
