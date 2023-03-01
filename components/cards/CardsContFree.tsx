import { useEffect, useState } from 'react';
import BoxDialog from '../BoxDialog/BoxDialog';
import ModalContainer from '../ModalContainer/ModalContainer';
import ModalReferiAmigos from '../ModalReferiAmigos/ModalReferiAmigos';
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
    setModalRef : (arg:boolean)=> void;
    modalRef: boolean;
}

type IdCard = {
    id: number
}

export interface ContactInfo {
    nombre : string,
    numero : string,
    estado? : "success" | "error" | "pending",
    selected? : boolean
}



const CardsCont: React.FC<ICardsCont> = ({ sampleTextProp, setModalRef, modalRef }) => {

    
    // const [activeCard, setActiveCard] = useState<IdCard>(1)
    const [activeCard, setActiveCard] = useState<number>(1)
    const [contactos, setContactos] = useState<ContactInfo[]>([{nombre: '', numero: ''}])
    const [finalList, setFinalList] = useState<ContactInfo[]>([])
    const [mensaje, setMensaje] = useState<string>('')
    const [modalImport, setModalImport] = useState<boolean>(false)
    const [wppMessage, setWppMessage] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [messagesLimitAchieved, setMessagesLimitAchieved] = useState<boolean>(false)
    const [renderDialog, setRenderDialog] = useState<boolean>(true)
    const [dragonAnim, setDragonAnim] = useState<string>('')


    const wppLimitMessage = <span>Oh! Parece que llegaste a tu <strong>límite diario de 40 mensajes!</strong><br /><br />Invita a un amigo para ampliar tu límite diario gratuitamente</span>;
    


    useEffect(() => {


        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
        }, [])

        useEffect(()=>{
            if (activeCard == 3) {
                setDragonAnim('limitedAnim')
            }else{
                setDragonAnim('')
            }
        }, [activeCard])

    
    
    function handleNewContact(newContact:ContactInfo) {
        setContactos([...contactos, newContact])
    }

    function handleDeleteContact(contact:ContactInfo) {
        setContactos( contactos.filter(con => con !== contact) )
    }

    function handleRenderModal(render:boolean){
        setModalImport(render)
    }
    function handleRenderModalRef(render:boolean) {
        setModalRef(false)
    }
    function checkAllListFields() {
        for (let index = 0; index < finalList.length - 1; index++) {
            const element = finalList[index];
            if (element.nombre == "" || element.numero == "") {
                return false
            }
        }
        return true
    }

    

    useEffect(()=>{

        var filtered = [...contactos]
    
        filtered.map((item)=>{
            item.numero = item.numero?.replace(/[^0-9]/g, '');
        })
        const lastObject = contactos[contactos.length - 1];

        if (lastObject && lastObject.hasOwnProperty("nombre") && lastObject.nombre != "" || lastObject.hasOwnProperty("numero") && lastObject.numero != "" ) {
            filtered = [...filtered, {'nombre':'', 'numero':''}]
        }

        setFinalList(filtered)
        
    },[contactos])


    
    return (
        <div>
            <div className={styles.cards_cont}>
                    
                    <FreeCard3
                        {...mockFreeCard1Props.base}
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                        contactos={finalList}
                        setContactos={setContactos}
                        mensaje={mensaje}
                        messagesLimitAchieved={messagesLimitAchieved}
                        setMessagesLimitAchieved={setMessagesLimitAchieved}
                    />

                    <FreeCard1 
                        {...mockFreeCard1Props.base}
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
            <div className={`${styles.nextCard} ${finalList.length === 1 || activeCard === 3 || !checkAllListFields() ? styles.arrow_disabled : ""}`} onClick={ ()=>{  if(finalList.length > 1 && activeCard < 3 && checkAllListFields() ) setActiveCard(activeCard+1) } }>
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
                    <div className={styles.dragon1}>
                        <img src="/dragon_anim.gif" alt="dragon-chat"/>
                        {
                            messagesLimitAchieved &&
                            <>
                            { renderDialog &&
                                <div className={styles.wpp_limit_alert}>
                                    <BoxDialog message={wppLimitMessage} setRenderDialog={setRenderDialog}/>
                                </div>
                            }
                            </>
                        }
                    </div>
                    <img className={`${styles.dragon2} ${styles[dragonAnim]}`} src="/dragon_anim.gif" alt="dragon-chat"/>
                </div>
            }
            {/* <NavBottom /> */}
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
            {modalRef &&
                <div>
                    <div>
                        <ModalContainer closeModal={ handleRenderModalRef } addedClass="refAmis">
                            <ModalReferiAmigos />
                        </ModalContainer>
                    </div>
                </div>
            }

           
        </div>
    
    );
}

export default CardsCont;