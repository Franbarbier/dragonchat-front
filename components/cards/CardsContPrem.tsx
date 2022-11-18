import { useEffect, useState } from 'react';
import SecuenceMessage from './Card/SecuencePremium';
import styles from './CardsCont.module.css';


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
    const [contactos, setContactos] = useState<[ContactInfo]>([])
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

                    <SecuenceMessage
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                    />
                    

                    <div className={styles.ruleta}>

                    </div>

            </div>
            <div className={`${styles.nextCard} ${activeCard == 1 && styles.arrow_disabled}`} onClick={ ()=>{  if(activeCard < 1) setActiveCard(activeCard+1) } }>
                <button>{'>'}</button>
            </div>
            <div className={`${styles.prevCard} ${activeCard == 1 && styles.arrow_disabled}`} onClick={ ()=>{  if(activeCard > 1) setActiveCard(activeCard-1) } }>
                <button>{'<'}</button>
            </div>

                   
        </div>
    
    );
}

export default CardsCont;