import { useEffect, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import WppBtn from '../WppBtn/WppBtn';
import { mockFreeCard1Props } from './Card/FreeCard3.mocks';
import FreeCard2 from './Card/MessageFree';
import FreeCard1 from './Card/RecipientsFree';
import FreeCard3 from './Card/SendFree';
import styles from './CardsCont.module.css';
import ModalImportContacts from './ModalImportContacts/ModalImportContacts';
const dragon2 = require("../../public/dragonchat_dragon.svg") as string;

export interface ICardsCont {
    sampleTextProp : string;
}

type IdCard = {
    id: number
}

export interface ContactInfo {
    nombre : string,
    numero : string,
    estado? : "success" | "error" | "pending",
}



const CardsCont: React.FC<ICardsCont> = ({ sampleTextProp }) => {

    
    // const [activeCard, setActiveCard] = useState<IdCard>(1)
    const [activeCard, setActiveCard] = useState<number>(1)
    const [contactos, setContactos] = useState<ContactInfo[]>([{nombre: '', numero: ''}])
    const [finalList, setFinalList] = useState<ContactInfo[]>([])
    const [mensaje, setMensaje] = useState<string>('')
    const [modalImport, setModalImport] = useState<boolean>(false)


    const [wppMessage, setWppMessage] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    

    useEffect(() => {


        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
          };
          checkIsMobile();
          window.addEventListener('resize', checkIsMobile);
          return () => window.removeEventListener('resize', checkIsMobile);
    }, [])
    
    
    function handleNewContact(newContact:ContactInfo) {
        setContactos([...contactos, newContact])
    }

    function handleDeleteContact(contact:ContactInfo) {
        setContactos( contactos.filter(con => con !== contact) )
    }

    function handleRenderModal(render:boolean){
        setModalImport(render)
    }
    

    useEffect(()=>{

        var filtered = [...contactos]
    
        filtered.map((item)=>{
            item.numero = item.numero.replace(/[^0-9]/g, '');
        })
        const lastObject = contactos[contactos.length - 1];
        if (lastObject && lastObject.hasOwnProperty("nombre") && lastObject.nombre != "" || lastObject.hasOwnProperty("numero") && lastObject.numero != "" ) {
            filtered = [...filtered, {'nombre':'', 'numero':''}]
        }

        setFinalList(filtered)
    },[contactos])

    useEffect(()=>{
        console.log(finalList)
    },[finalList])

    
    return (
        <div>
            <div className={styles.cards_cont}>

                    <FreeCard3
                        {...mockFreeCard1Props.base}
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                        contactos={contactos}
                        setContactos={setContactos}
                        mensaje={mensaje}
                    />

                    <FreeCard1 
                        {...mockFreeCard1Props.base}
                        setModalImport={setModalImport}
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                        contactos={contactos}
                        setContactos={setContactos}
                        handleNewContact={handleNewContact}
                        handleDeleteContact={handleDeleteContact}
                        handleRenderModal={handleRenderModal}
                        finalList={finalList}
                    />

                    <FreeCard2
                        {...mockFreeCard1Props.base}
                        
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                        mensaje={mensaje}
                        setMensaje={setMensaje}
                    />

                    

            </div>
        
            <div className={`${styles.nextCard} ${finalList.length === 1 || activeCard == 3 ? styles.arrow_disabled : ""}`} onClick={ ()=>{  if(finalList.length > 1 || activeCard > 3 ) setActiveCard(activeCard+1) } }>
                <button><img src="/arrow-card.png" /></button>
            </div>
            <div className={`${styles.prevCard} ${activeCard == 1 && styles.arrow_disabled}`} onClick={ ()=>{  if(activeCard > 1 ) setActiveCard(activeCard-1) } }>
                <button><img src="/arrow-card.png" /></button>
            </div>

            {/* <div className={styles.ruleta_cont}>
                <div>
                    <div>
                        <div>
                            <p>Uno</p>
                        </div>
                        <div>
                            <p>Dos</p>
                        </div>
                        <div>
                            <p>Tres</p>
                        </div>
                    </div>
                </div>
            </div> */}

            {
                !isMobile &&
                <div>
                    <img className={styles.dragon1} src="/dragon_anim.gif" alt="dragon-chat"/>
                    <img className={styles.dragon2} src="/dragon_anim.gif" alt="dragon-chat"/>
                </div>
            }

            <WppBtn />
            
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