import { useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import { mockFreeCard1Props } from './Card/FreeCard3.mocks';
import FreeCard2 from './Card/MessageFree';
import FreeCard1 from './Card/RecipientsFree';
import FreeCard3 from './Card/SendFree';
import styles from './CardsCont.module.css';
import ModalImportContacts from './ModalImportContacts/ModalImportContacts';


export interface ICardsCont {
    sampleTextProp : string;
}

type IdCard = {
    id: number
}

export interface ContactInfo {
    name : string,
    wpp : string,
    status? : "success" | "error" | "pending",
}

// interface contactosArr extends Array<ContactInfo>{}

const CardsCont: React.FC<ICardsCont> = ({ sampleTextProp }) => {

    
    // const [activeCard, setActiveCard] = useState<IdCard>(1)
    const [activeCard, setActiveCard] = useState<number>(1)
    const [contactos, setContactos] = useState<ContactInfo[]>([])
    const [mensaje, setMensaje] = useState<string>('')
    const [modalImport, setModalImport] = useState<boolean>(false)
    
    function handleNewContact(newContact:ContactInfo) {
        setContactos([...contactos, newContact])
    }

    function handleDeleteContact(contact:ContactInfo) {
        setContactos( contactos.filter(con => con !== contact) )
    }

    function handleRenderModal(render:boolean){
        console.log(render)
        setModalImport(render)
    }

    useEffect(()=>{
        console.log(contactos)
    },[contactos])

    return (
        <div>
            <div className={styles.cards_cont}>

                    <FreeCard3
                        {...mockFreeCard1Props.base}
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                        contactos={contactos}
                        setContactos={setContactos}
                    />
                    <FreeCard1 
                        {...mockFreeCard1Props.base}
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                        contactos={contactos}
                        handleNewContact={handleNewContact}
                        handleDeleteContact={handleDeleteContact}
                        handleRenderModal={handleRenderModal}
                    />
                    <FreeCard2
                        {...mockFreeCard1Props.base}
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                        mensaje={mensaje}
                        setMensaje={setMensaje}
                    />

                    <div className={styles. ruleta}>

                    </div>

            </div>
            <div className={`${styles.nextCard} ${activeCard == 3 && styles.arrow_disabled}`} onClick={ ()=>{  if(activeCard < 3) setActiveCard(activeCard+1) } }>
                <button>{'>'}</button>
            </div>
            <div className={`${styles.prevCard} ${activeCard == 1 && styles.arrow_disabled}`} onClick={ ()=>{  if(activeCard > 1) setActiveCard(activeCard-1) } }>
                <button>{'<'}</button>
            </div>

            {modalImport &&
                <div className={styles.modal_position_card1}>
                    <div>
                        <ModalContainer closeModal={ handleRenderModal } >
                            <ModalImportContacts setModalImport={setModalImport} uploadContacts={setContactos} />
                        </ModalContainer>
                    </div>
                </div>
            }

           
        </div>
    
    );
}

export default CardsCont;