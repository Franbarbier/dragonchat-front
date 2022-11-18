import { useState } from 'react';
import CardTitle from '../../CardTitle/CardTitle';
import OrangeBtn from '../../OrangeBtn/OrangeBtn';
import { ContactInfo } from '../CardsContFree';
import HeaderRow from '../HeaderRow/HeaderRow';
import styles from './FreeCard.module.css';

export interface IFreeCard3 {
    sampleTextProp : string;
    setActiveCard: (id: number) => void;
    activeCard : number;
    contactos : [ContactInfo];
    setContactos : (contactos: ContactInfo[]) => void
}

const FreeCard3: React.FC<IFreeCard3> = ({ setActiveCard, activeCard, contactos, setContactos }) => {
    
    let idCard = 3;

    const [sending, setSending] = useState<boolean>(false)
    const [isSent, setIsSent] = useState<boolean>(false)


  
    async function startSending() {
        
        setSending(true)

        // funcion auxiliar para emular el envio de mensajes
        var i = 0;

        function myLoop() {

        var newContacts = [...contactos]
        newContacts[i].status = "pending"
        setContactos(newContacts)

        setTimeout(function() {
            var newContacts = [...contactos]
            newContacts[i].status = "success"
            setContactos(newContacts)
            

            i++;                    
            if (i < contactos.length) {
                myLoop();
            }else{
                setSending(false)
                setIsSent (true)
                alert('Mensajes enviados!')
                
            }
        }, 5000)
}

myLoop();                   


    }


    return (
        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>setActiveCard(idCard)}>

            <div className={styles.card_container}>
            <div>
                <CardTitle text={!sending ? 'Enviar' : 'Enviando' } />
            </div>
            <div className={styles.card_table_cont}>

                <HeaderRow campos={["Número", "Apodo"]} />
                
                <div className={`${styles.table_rows} ${styles.enviando_table}`}>

                    {contactos.map((contact, index)=>(
                            <div className={`${styles.row_card} ${contact.status == "pending" && styles.fireLoader} ${contact.status == "success" && styles.sent}`} key={contact.name+index}>

                                {contact.status == "pending" && 
                                    <aside className={styles.fuegoLoader}>
                                        <video autoPlay loop>
                                            <source src="/dc_fuego_min.mp4" type="video/mp4" />
                                        </video>
                                    </aside>
                                }  

                                <div className="column50">
                                    <div>
                                        <span>+{contact.wpp}</span>
                                    </div>
                                </div>
                                <div className="column50">
                                    <div>
                                        <span>{contact.name}</span>
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