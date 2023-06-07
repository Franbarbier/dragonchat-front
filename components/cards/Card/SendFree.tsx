import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookie } from "cookies-next";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import apiSenderWhatsappController from '../../../api/apiSenderWhatsappController';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import OrangeBtn from '../../OrangeBtn/OrangeBtn';
import CardTitle from '../CardTitle/CardTitle';
import { ContactInfo } from '../CardsContFree';
import HeaderRow from '../HeaderRow/HeaderRow';
import styles from './FreeCard.module.css';



export interface IFreeCard3 {
    //sampleTextProp: string;
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
        timer: number,
        pausa: number,
        bloques: number
    };

}

const FreeCard3: React.FC<IFreeCard3> = ({ setActiveCard, activeCard, contactos = [], setContactos, mensaje, setMessagesLimitAchieved, messagesLimitAchieved, modalShieldOptions, setModalShieldOptions, shieldOptions }) => {

    let idCard = 3;
    let router = useRouter()

    const [sending, setSending] = useState<boolean>(false)
    const [exito, setExito] = useState<boolean>(false)
    const [dejarDeEnviar, setDejarDeEnviar] = useState<boolean>()

    const [activeShield, setActiveShield] = useState<boolean>(false)

    async function sendMove(userInfo, count) {
        const destinatario = contactos[count];
        const newContacts = [...contactos];
        newContacts[count].estado = "pending";
        setContactos(newContacts)
        const sentMessage = await apiSenderWhatsappController.sendMessage(
            userInfo.user_id, 
            destinatario.nombre, 
            mensaje, 
            destinatario.numero,
            getCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || '')
        );
        if (sentMessage?.status == 200) {
            let newContacts = [...contactos]
            newContacts[count].estado = "success";
            setContactos(newContacts)
        } else {
            let newContacts = [...contactos]
            newContacts[count].estado = "error";
            setContactos(newContacts)
            if (sentMessage.response?.data?.error?.type == "EXCEEDED_LIMIT") {
                setMessagesLimitAchieved(true)
                setSending(false)
                setDejarDeEnviar(true)
            }
        }
    }


    const [isLooping, setIsLooping] = useState(false);
    const [counter, setCounter] = useState(0);

    const [timer, setTimer] = useState(200);
    const [bloques, setBloques] = useState<number>(0);
    const [pausa, setPausa] = useState<number>(0);

    useEffect(() => {
        console.log(timer, bloques, pausa);
    }, [timer, bloques, pausa]);

    useEffect(() => {

        let intervalId: NodeJS.Timeout;

        if (isLooping && counter < contactos.length - 1) {
            intervalId = setInterval(() => {
                console.log("Looping...", counter);
                const userInfo = JSON.parse(String(getCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || '')) || "{}");
                sendMove(userInfo, counter)

                // Movida para pausar el loop cada X mensajes
                if ((counter + 1) % bloques === 0 && counter !== 0) {
                    clearInterval(intervalId); // Pause the loop
                    setTimeout(() => {
                        // Resume the loop after X seconds
                        intervalId = setInterval(() => {
                            const userInfo = JSON.parse(String(getCookie(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME || '')) || "{}");
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
        setTimer(shieldOptions.timer * 1000)
        setBloques(shieldOptions.bloques)
        setPausa(shieldOptions.pausa * 1000)
    }, [shieldOptions])

    return (
        <div className={`${styles.card} ${styles['numberCard' + activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card' + idCard]}`}>

            <div className={styles.card_container}>
                <div>
                    <CardTitle text={!sending ? 'Enviar' : 'Enviando'} />
                </div>
                <div className={styles.card_table_cont}>

                    <HeaderRow campos={["Nombre", "Número"]} key="header-row-sendFree" />

                    <div className={`${styles.table_rows} ${styles.enviando_table}`}>
                        {contactos.map((contact, index) => (
                            <>
                                {contactos.length - 1 != index &&

                                    // ${contact.status == "pending" && styles.fireLoader}
                                    <div className={`${styles.row_card} ${contact.estado == "error" && styles.error} ${contact.estado == "success" && styles.success}`} key={contact.nombre + index} >

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

                    <div className={`${styles.options_cont} ${sending && styles.sending_anim_cont}`}>
                        {!messagesLimitAchieved ?
                            <div className={styles.footerBtns}>
                                <aside className={activeShield ? styles.activeShield : styles.activeShieldOff} onClick={() => { setActiveShield(!activeShield) }} >
                                    <div>
                                        <img src="/shield-clock.svg" />
                                        <div className={styles.shieldFilter} ></div>
                                    </div>
                                    <aside onClick={() => { setModalShieldOptions(true) }}>
                                        <img src="/icon_config.svg" />
                                    </aside>
                                </aside>
                                {!exito ?
                                    <OrangeBtn text={!isLooping ? 'Enviar' : 'Pausar'} onClick={handleButtonClick} />
                                    :
                                    <CustomColorBtn
                                        type="submit"
                                        text="Crear nueva difusion"
                                        backgroundColorInit="#724cdf"
                                        backgroundColorEnd="#3a94fe"
                                        borderColor="#5573f0"
                                        onClick={() => { router.reload() }}
                                        disable={false}
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