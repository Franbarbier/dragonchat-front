import { useState } from 'react';
import { sendMessage } from '../../../actions/cardsFree';
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
    setContactos : (contactos: ContactInfo[]) => void
}

const FreeCard3: React.FC<IFreeCard3> = ({ setActiveCard, activeCard, contactos=[], setContactos, mensaje }) => {
    
    let idCard = 3;

    const [sending, setSending] = useState<boolean>(false)
    const [isSent, setIsSent] = useState<boolean>(false)
    const [contactosStatus, setContactosStatus] = useState(contactos)
 
    async function startSending() {
        
        setSending(true)

        const locStorage = JSON.parse( localStorage.getItem('dragonchat_login') || "{}" )

        for (let index = 0; index < contactos.length; index++) {
            const destinatario = contactos[index];

            let newContacts = [...contactos]

            newContacts[index].status = "pending";
            setContactos(newContacts)

            
            
            let bodyContent = JSON.stringify({
                // "user": "234t",
                "user": locStorage.user_id,
                "name": destinatario.name,
                "message": mensaje,
                "number": destinatario.wpp
            });
                        
            const onSuccess = () => {
                console.log(sentMessage)
                console.log("en teoria ya esta")
                        
                    if (sentMessage?.status == 200) {
                        let newContacts = [...contactos]
                        newContacts[index].status = "success";
                        setContactos(newContacts)
                    }else{
                        let newContacts = [...contactos]
                        newContacts[index].status = "error";
                        setContactos(newContacts)
                    }
            
                    
            }

            const sentMessage = await sendMessage(bodyContent)
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
                        // ${contact.status == "pending" && styles.fireLoader}
                            <div className={`${styles.row_card}  ${contact.status == "success" && styles.success}`} key={contact.name+index} >
                                {/* {console.log(contact.status)} */}

                                {contact.status == "pending" && 
                                    <aside className={styles.fuegoLoader}>
                                        <video autoPlay loop>
                                            <source src="/dc_fuego_min.mp4" type="video/mp4" />
                                        </video>
                                    </aside>
                                }  

                                <div className="column50">
                                    <div>
                                        <span>{contact.name}</span>
                                    </div>
                                </div>
                                <div className="column50">
                                    <div>
                                        <span>+{contact.wpp}</span>
                                    </div>
                                </div>
                                    
                                <div className={styles.estado_envio}>
                                    {contact.status == "success" && '✔️'}
                                    {contact.status == "error" && '❌'}
                                </div>
                            </div>
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