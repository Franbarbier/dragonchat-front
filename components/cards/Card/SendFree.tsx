import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import apiSenderWhatsappController from '../../../api/apiSenderWhatsappController';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import OrangeBtn from '../../OrangeBtn/OrangeBtn';
import CardTitle from '../CardTitle/CardTitle';
import { ContactInfo } from '../CardsContFree';
import HeaderRow from '../HeaderRow/HeaderRow';
import styles from './FreeCard.module.css';

export interface IFreeCard3 {
    sampleTextProp: string;
    setActiveCard: (id: number) => void;
    activeCard: number;
    contactos: ContactInfo[];
    messagesLimitAchieved: boolean;
    setMessagesLimitAchieved: (limit: boolean) => void;
    mensaje: string;
    setContactos: (contactos: ContactInfo[]) => void
}

const FreeCard3: React.FC<IFreeCard3> = ({ setActiveCard, activeCard, contactos = [], setContactos, mensaje, setMessagesLimitAchieved, messagesLimitAchieved }) => {
    let idCard = 3;
    let router = useRouter()

    const [sending, setSending] = useState<boolean>(false)
    const [isSent, setIsSent] = useState<boolean>(false)
    const [contactosStatus, setContactosStatus] = useState(contactos)
    const [exito, setExito] = useState<boolean>(false)

    const [sendList, setSendList] = useState(contactos)

    async function startSending() {

        setSending(true)

        const userInfo = JSON.parse(Cookie.get('dragonchat_login') || "{}");

        var dejarDeEnviar = false;

        for (let index = 0; index < contactos.length - 1; index++) {

            if (dejarDeEnviar) break

            const destinatario = contactos[index];

            let newContacts = [...contactos];
            newContacts[index].estado = "pending";
            setContactos(newContacts)


            const onSuccess = () => {
                console.log(sentMessage)

                if (sentMessage?.status == 200) {
                    let newContacts = [...contactos]
                    newContacts[index].estado = "success";
                    setContactos(newContacts)
                } else {
                    let newContacts = [...contactos]
                    newContacts[index].estado = "error";
                    setContactos(newContacts)

                    if (sentMessage.response.data.error.type == "EXCEEDED_LIMIT") {
                        setMessagesLimitAchieved(true)
                        setSending(false)
                        dejarDeEnviar = true;

                    }
                }

            }


            const sentMessage = await apiSenderWhatsappController.sendMessage(userInfo.user_id, destinatario.nombre, mensaje, destinatario.numero)
            onSuccess()
        }
        setSending(false)
        setExito(true)

    }


    return (
        <div
            className={`${styles.card} ${styles['numberCard' + activeCard]} ${activeCard == idCard && styles.active}`}
            id={`${styles['card' + idCard]}`}
        >
            <div className={styles.card_container}>
                <div>
                    <CardTitle text={!sending ? 'Enviar' : 'Enviando'} />
                </div>
                <div className={styles.card_table_cont}>

                    <HeaderRow campos={["Nombre", "Número"]} key="header-row-sendFree" />

                    <div className={`${styles.table_rows} ${styles.enviando_table}`}>
                        <>
                            {contactos.map((contact, index) => (
                                < div
                                    className={`${styles.row_card} ${contact.estado == "error" && styles.error} ${contact.estado == "success" && styles.success}`}
                                    key={contact.numero}
                                >
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
                                            <span>{`+${contact.numero}`}</span>
                                        </div>
                                    </div>

                                    {contact.estado == "success" && <img className={styles.estado_envio} src="/cierto.png" />}
                                    {contact.estado == "error" && <img className={styles.estado_envio} src="/close.svg" />}
                                </div>
                            ))}
                        </>
                    </div>

                    {/* <video width="320" height="240" autoPlay controls={false} loop>
                                <source src="/fire-bkgr.mp4" type="video/mp4" />
                            </video> */}

                    <div className={`${styles.options_cont} ${sending && styles.sending_anim_cont}`}>
                        {!messagesLimitAchieved ?
                            <>
                                {!exito ?
                                    <OrangeBtn text={!sending ? 'Enviar' : 'Enviando'} onClick={() => { if (!sending) { startSending() } }} />
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
                            </>
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
        </div >
    );
}

export default FreeCard3;