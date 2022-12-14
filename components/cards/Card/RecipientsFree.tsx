import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ContactInfo } from '../CardsContFree';
import CardTitle from '../CardTitle/CardTitle';
import HeaderRow from '../HeaderRow/HeaderRow';
import styles from './FreeCard.module.css';

interface IModalImport {
    modalImport : boolean;
}

export interface IFreeCard1 {
    sampleTextProp : string;
    setActiveCard: (id: number) => void;
    activeCard : number;
    contactos : ContactInfo[];
    handleNewContact: (newContact: ContactInfo) => void;
    handleDeleteContact : (contact: ContactInfo) => void;
    handleRenderModal : (render: boolean) => void
}

// type setPropsType = {

const allowedExtensions = ["csv"];


const FreeCard1: React.FC<IFreeCard1> = ({ setActiveCard, activeCard, contactos, handleNewContact, handleDeleteContact, handleRenderModal }) => {


    let idCard = 1;

    const [newContact, setNewContact] = useState<ContactInfo>({
        name: '',
        wpp : ''
    })
  
    const regex = new RegExp(/[^\d]/g);
    
    function handleAddContact(e){
        e.preventDefault()

        console.log(newContact.name)
        if (newContact.name != '' && newContact.wpp != '') {
            handleNewContact(newContact)
            setNewContact({
                name: '',
                wpp: ''
            })
        }else{
            alert('Ingresar datos del contacto.')
        }
    }
   

    return (
        <div>

        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>setActiveCard(idCard)}>
            <div className={styles.card_container} >
                <div>
                    <CardTitle text={"Destinatarios"} />

                </div>
                <div className={styles.card_table_cont}>
                    
                    <HeaderRow campos={["Nombre", "Número"]} />

                    <div className={styles.table_rows}>
                        {
                            contactos.length == 0 &&
                            <div className={styles.row_card}>
                                <div className="column50">
                                    <div>
                                        <span className={styles.contact_example}>Pepe</span>
                                    </div>
                                </div>
                                <div className="column50">
                                    <div>
                                        <span className={styles.contact_example}>+5491148763379</span>
                                    </div>
                                </div>
                            </div>
                        }
                        {contactos.map(contact=>(
                            <div className={styles.row_card}>
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
                                <div className={styles.delete_contact}
                                    onClick={()=>{
                                        handleDeleteContact(contact)
                                    }}
                                >❌</div>
                            </div>
                        ))
                        }
                        
                    </div>
                    <div className={styles.options_cont}>
                        <form className={styles.new_contact}>
                            <input placeholder='Nombre' onChange={(e)=>{
                                setNewContact({...newContact, name :  e.target.value})
                                } } value={newContact.name}/>
                            <input placeholder='Número' onChange={(e)=>{
                                
                                setNewContact({...newContact, wpp :  e.target.value.replace(regex, '') })
                                } } value={newContact.wpp}/>
                            <button onClick={ (e)=>{ handleAddContact(e) } } ><span className={styles.web_span}>+</span><span className={styles.mobile_span}>AGREGAR DESTINATARIO</span></button>
                            
                        </form>
                            
                        <button className={styles.importBtn} onClick={ ()=> {handleRenderModal(true)} }><FontAwesomeIcon icon={faFileCsv} /></button>

                    </div>
                </div>

            </div>
        </div>
                
                
            </div>
        
    
    );
}

export default FreeCard1;