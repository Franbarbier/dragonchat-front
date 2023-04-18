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
    sampleTextProp : string;
    setActiveCard: (id: number) => void;
    activeCard : number;
    contactos : ContactInfo[];
    messagesLimitAchieved : boolean;
    setMessagesLimitAchieved : (limit: boolean) => void;
    mensaje: string ;
    setContactos : (contactos: ContactInfo[]) => void
}

const FreeCard3: React.FC<IFreeCard3> = ({ setActiveCard, activeCard, contactos=[], setContactos, mensaje, setMessagesLimitAchieved, messagesLimitAchieved }) => {

    let idCard = 3;
    let router= useRouter()

    const [sending, setSending] = useState<boolean>(false)
    const [isSent, setIsSent] = useState<boolean>(false)
    const [contactosStatus, setContactosStatus] = useState(contactos)
    const [exito, setExito] = useState<boolean>(false)
    const [hoverTimer, setHoverTimer] = useState<boolean>(false)

    const [dejarDeEnviar, setDejarDeEnviar] = useState<boolean>()



    async function sendMove(userInfo, count) {
        console.log(mensaje)
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
            const sentMessage = await apiSenderWhatsappController.sendMessage(userInfo.user_id, destinatario.nombre, mensaje, destinatario.numero)
            onSuccess()
    }


    const [isLooping, setIsLooping] = useState(false);
    const [counter, setCounter] = useState(0);
    const [timer, setTimer] = useState(1000);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isLooping && counter < contactos.length -1) {
        intervalId = setInterval(() => {
            console.log("Looping...", counter);
            const userInfo = JSON.parse( Cookie.get('dragonchat_login') || "{}" );
            sendMove(userInfo, counter)
            setCounter(counter + 1);
        }, timer);
        }

        return () => {
        clearInterval(intervalId);
        };
    }, [isLooping, counter]);

    const handleButtonClick = () => {
        setIsLooping(!isLooping);
    };
  

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
                        
                        // ${contact.status == "pending" && styles.fireLoader}
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
                                    
                                {/* <div className={styles.estado_envio}> */}
                                    {contact.estado == "success" && <img className={styles.estado_envio} src="/cierto.png" />}
                                    {contact.estado == "error" && <img className={styles.estado_envio} src="/close.svg" />}
                                {/* </div> */}
                            </div>
                            }
                            </>
                        ))

                        }

                    
                </div>

                <div className={`${styles.options_cont} ${sending && styles.sending_anim_cont }`}>
                    {!messagesLimitAchieved ?
                        <div className={styles.footerBtns}>
                            {!exito ?
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
                            <div className={styles.sendDelayCont} onMouseEnter={ ()=>{ setHoverTimer(true) } } onMouseLeave={ ()=>{ setHoverTimer(false) } }>
                                <div>
                                    <img src="/timer.svg" />
                                </div>
                                <div>
                                    <input type="number" value={timer/1000} onChange={ (e)=>{setTimer( parseInt(e.target.value)*1000 )} } />
                                    <span>segs.</span>
                                </div>
                                <AnimatePresence>
                                {hoverTimer &&
                                        <motion.p
                                            initial={{opacity: 0, x: '-50%', y : 0}}
                                            exit={{opacity: 0, x: '-50%', y : 0}}
                                            animate={{ opacity: hoverTimer ? 1 : 0, y: hoverTimer ? -15 : 0 , x : "-50%"}}
                                            >
                                            Delay entre cada mensaje saliente.
                                        </motion.p>

                                }
                                </AnimatePresence>
                            </div>    
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