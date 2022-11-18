import { useState } from 'react';
import CardTitle from '../../CardTitle/CardTitle';
import OrangeBtn from '../../OrangeBtn/OrangeBtn';
import { ContactInfo } from '../CardsContFree';
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
  
    

   

    return (
        <div>

        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>setActiveCard(idCard)}>
            <div className={styles.card_container} >
                <div>
                    <CardTitle text={"Destinatarios"} />

                </div>
                <div className={styles.card_table_cont}>
                    
                    <HeaderRow campos={["Número", "Apodo"]} />

                    <div className={styles.table_rows}>

                        {contactos.map(contact=>(
                            <div className={styles.row_card}>
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
                            <input placeholder='Número' onChange={(e)=>{
                                setNewContact({...newContact, wpp :  e.target.value})
                                } } value={newContact.wpp}/>
                                
                            <input placeholder='Apodo' onChange={(e)=>{
                                setNewContact({...newContact, name :  e.target.value})
                                } } value={newContact.name}/>
                            <button onClick={ (e)=>{
                                e.preventDefault()
                                if (newContact.name != '' && newContact.wpp != '') {
                                    handleNewContact(newContact)
                                    setNewContact({
                                        name: '',
                                        wpp: ''
                                    })
                                }else{
                                    alert('Ingresar datos del contacto.')
                                }
                            } } ><span>+</span></button>

                        </form>
                        
                        {/* <button className={styles.importBtn}>Importar contactos</button> */}
                        <OrangeBtn text="Importar contacto" onClick={ ()=> {handleRenderModal(true)} }/>


                    </div>
                </div>

            </div>
        </div>
                
                
            </div>
        
    
    );
}

export default FreeCard1;