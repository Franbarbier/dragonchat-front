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
    messagesLimitAchieved : boolean;
    setMessagesLimitAchieved : (limit: boolean) => void
    mensaje: string ;
    setContactos : (contactos: ContactInfo[]) => void
}

const FreeCard3: React.FC<IFreeCard3> = ({ setActiveCard, activeCard, contactos=[], setContactos, mensaje }) => {

    let idCard = 3;

    const [sending, setSending] = useState<boolean>(false)
    const [isSent, setIsSent] = useState<boolean>(false)
    const [contactosStatus, setContactosStatus] = useState(contactos)

    const [sendList, setSendList] = useState( contactos )

    async function startSending() {

        setSending(true)

        const userInfo = JSON.parse( Cookie.get('dragonchat_login') || "{}" );

        for (let index = 0; index < contactos.length -1; index++) {
            const destinatario = contactos[index];

            let newContacts = [...contactos]

            newContacts[index].estado = "pending";
            setContactos(newContacts)

            const onSuccess = () => {
                console.log(sentMessage)
                console.log("en teoria ya esta")

                    if (sentMessage?.status == 200) {
                        let newContacts = [...contactos]
                        newContacts[index].estado = "success";
                        setContactos(newContacts)
                    }else{
                        let newContacts = [...contactos]
                        newContacts[index].estado = "error";
                        setContactos(newContacts)
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
                        <>
                        {contactos.length - 1 != index &&
                        
                        // ${contact.status == "pending" && styles.fireLoader}
                            <div className={`${styles.row_card}  ${contact.estado == "success" && styles.success}`} key={contact.nombre+index} >
                                {/* {console.log(contact.estado)} */}

                                {contact.estado == "pending" && 
                                    <aside className={styles.fuegoLoader}>
                                        <video autoPlay loop>
                                            <source src="/dc_fuego_min.mp4" type="video/mp4" />
                                        </video>
                                    </aside>
                                }  

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
                                    
                                <div className={styles.estado_envio}>
                                    {contact.estado == "success" && '✔️'}
                                    {contact.estado == "error" && '❌'}
                                </div>
                            </div>
                            }
                            </>
                        ))

                        }

                    
                </div>
                <div className={`${styles.options_cont} ${sending && styles.sending_anim_cont }`}>

                    {!isSent ?
                    <OrangeBtn text={!sending ? 'Enviar' : 'Enviando' } onClick={ () => 
                        { if (!sending){ startSending() }}} />
                    :
                    <p>Listo! Podes resetear DragonChat para hacer un nuevo envío haciendo <a href="/">click acá</a></p>
                    }
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default FreeCard3;