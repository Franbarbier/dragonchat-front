import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookie from 'js-cookie';
import { useState } from 'react';
import apiSenderWhatsappController from '../../../api/apiSenderWhatsappController';
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
    mensaje: string ;
    setContactos : (contactos: ContactInfo[]) => void;
    messagesLimitAchieved : boolean;
    setMessagesLimitAchieved : (bool:boolean)=> void;
}

const FreeCard3: React.FC<IFreeCard3> = ({ setActiveCard, activeCard, contactos=[], setContactos, mensaje, messagesLimitAchieved, setMessagesLimitAchieved }) => {

    let idCard = 3;

    const [sending, setSending] = useState<boolean>(false)
    const [isSent, setIsSent] = useState<boolean>(false)
    const [contactosStatus, setContactosStatus] = useState(contactos)

    async function startSending() {

        setSending(true)

        const userInfo = JSON.parse( Cookie.get('dragonchat_login') || "{}" );

        for (let index = 0; index < contactos.length; index++) {
            const destinatario = contactos[index];

            let newContacts = [...contactos]

            newContacts[index].estado = "pending";
            setContactos(newContacts)

            const onSuccess = () => {
                console.log(sentMessage)

                    if (sentMessage?.estado == 200) {
                        let newContacts = [...contactos]
                        newContacts[index].estado = "success";
                        setContactos(newContacts)
                    }else{
                        let newContacts = [...contactos]
                        newContacts[index].estado = "error";
                        setContactos(newContacts)
                        if (sentMessage == 401) {
                            setMessagesLimitAchieved(true)
                        }
                    }
                    


            }

            const sentMessage = await apiSenderWhatsappController.sendMessage(userInfo.user_id, destinatario.nombre, mensaje, destinatario.numero)
            onSuccess()
        }
        setSending(false)

    }


    return (
        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>setActiveCard(idCard)}>

            <div className={styles.card_container}>
            <div>
                <CardTitle text={!sending ? 'Enviar' : 'Enviando' } />
            </div>
            <div className={styles.card_table_cont}>

                <HeaderRow campos={["Nombre", "Número"]} key="header-row-sendFree"/>
             
                <div className={`${styles.table_rows} ${styles.enviando_table}`}>
                    {contactos.map((contact, index)=>(
                        // ${contact.estado == "pending" && styles.fireLoader}
                        
                            <div className={`${styles.row_card}  ${contact.estado == "success" && styles.success} ${contact.estado == 'error' && styles.error}`} key={contact.nombre+index} >
                               
                                {contact.estado == "pending" &&
                                    <aside className={styles.fuegoLoader}>
                                        <video autoPlay loop>
                                            <source src="/dc_fuego_min.mp4" type="video/mp4" />
                                        </video>
                                    </aside>
                                }   
                                <div className="column50">
                                    <div>
                                        <span>{contact.nombre}</span>
                                    </div>
                                </div>
                                <div className="column50">
                                    <div>
                                        <span>+{contact.numero}</span>
                                    </div>
                                </div>
                                    
                                <div className={styles.estado_envio}>
                                    {contact.estado == "success" && <img src="cierto.png" width="15px" /> }
                                    {contact.estado == "error" && <img src="incorrecto.png" width="15px" /> }
                                </div>
                            </div>
                        ))
                        }

                    
                </div>
                <div className={`${styles.options_cont} ${sending && styles.sending_anim_cont }`}>
                {!messagesLimitAchieved ?
                    <>
                    {!isSent ?
                        <OrangeBtn text={!sending ? 'Enviar' : 'Enviando' } onClick={ () => 
                            { if (!sending){ startSending() }}} />
                            :
                            <p>Listo! Podes resetear DragonChat para hacer un nuevo envío haciendo <a href="/">click acá</a></p>
                        }
                    </>
                    :
                    
                    // <OrangeBtn text="ass" onClick={()=>{}} disabled={true}/>
                    <> 
                    <div className={styles.limitedButton}>
                        <video autoPlay muted loop>
                            <source src="/fire-bkgr.mp4" type="video/mp4" />
                        </video>
                        <span><FontAwesomeIcon icon={faLock} /></span>
                        <p>Enviar</p>
                        <span><FontAwesomeIcon icon={faLock} /></span>

                    </div>
                        <p className={styles.limitedMsj}>Llegaste al limite de 40 mensajes diarios! Invita a un amigo para ampliar tu limite. <a>Ver más</a></p>
                    </>
                }
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default FreeCard3;