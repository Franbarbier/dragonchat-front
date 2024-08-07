import { useEffect, useState } from 'react';
import BoxDialog from '../BoxDialog/BoxDialog';
import ModalContainer from '../ModalContainer/ModalContainer';
import NavBottom from '../NavBottom/NavBottom';
import Notification, { INotification } from '../Notification/Notification';
import WppBtn from '../WppBtn/WppBtn';
import FreeCard2 from './Card/MessageFree';
import FreeCard1 from './Card/RecipientsFree';
import FreeCard3 from './Card/SendFree';
import styles from './CardsCont.module.css';
import { IChat, ISecuence } from './ConversationPremium/ConversationPremium';
import ModalImportContacts from './ModalImportContacts/ModalImportContacts';
import ModalShieldOptions from './ModalShieldOptions/ModalShieldOptions';
const dragon2 = require("../../public/dragonchat_dragon.svg") as string;

export interface ICardsCont {
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



const CardsCont: React.FC<ICardsCont> = ({ }) => {

    
    // const [activeCard, setActiveCard] = useState<IdCard>(1)
    const [activeCard, setActiveCard] = useState<number>(1)
    const [contactos, setContactos] = useState<ContactInfo[]>([{nombre: '', numero: ''}])
    const [finalList, setFinalList] = useState<ContactInfo[]>([])
    
    const [mensaje, setMensaje] = useState<string>('')
    const [selectedSecuence, setSelectedSecuence] = useState<ISecuence | null>(null)
    const [readMessage, setReadyMessage] = useState<boolean>(false)

    const [droppedCsv, setDroppedCsv] = useState<File | null>(null)

    const [modalImport, setModalImport] = useState<boolean>(false)
    const [modalShieldOptions, setModalShieldOptions] = useState<boolean>(false)
    const [breadcrumb, setBreadcrumb] = useState<IChat[]>([])
    const [shieldOptions, setShieldOptions] = useState<{
        timer: number,
        pausa : number,
        bloques: number
    }>({
        timer: 0,
        pausa : 0,
        bloques: 0
    })


    const [wppMessage, setWppMessage] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [messagesLimitAchieved, setMessagesLimitAchieved] = useState<boolean>(false)
    const [renderDialog, setRenderDialog] = useState<boolean>(true)
    const [dragonAnim, setDragonAnim] = useState<string>('')

    const [notification, setNotification] = useState<INotification>({
        status : "success",
        render : false,
        message : "",
        modalReturn : ()=>{}
    })


    function handleReturnModal(value:boolean) {
        setNotification({...notification, render : false})
    }

    const wppLimitMessage = <span>Oh! Parece que llegaste a tu <strong>límite diario de 40 mensajes!</strong><br /><br />Invita a un amigo para ampliar tu límite diario gratuitamente</span>;
    


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
    function checkAllListFields() {
        for (let index = 0; index < finalList.length - 1; index++) {
            const element = finalList[index];
            if (element.nombre == "" || element.numero == "") {
                return false
            }
        }
        return true
    }

    function checkNextCard() {
    
        switch (activeCard) {
            case 1:
                if (finalList.length > 1 && checkAllListFields()) setActiveCard(activeCard+1)
                break;
            case 2:
                if (readMessage) setActiveCard(activeCard+1)
                break;
            case 3:
                 return false
        
            default:
                break;
        }
    }
    
    function checkPrevCard() {
        switch (activeCard) {
            case 1:
                return false
            case 2:
                setActiveCard(activeCard-1)
                break;
            case 3:
                setActiveCard(activeCard-1)
                break;
        
            default:
                break;
        }
    }
    
    useEffect(()=>{
        var filtered = [...contactos]
    
        filtered.map((item)=>{
            item.numero = item.numero?.replace(/[^0-9]/g, '');
        })
        const lastObject = contactos[contactos.length - 1];

        // if (lastObject != undefined) {   
            if (lastObject.hasOwnProperty("nombre") && lastObject.nombre != "" || lastObject.hasOwnProperty("numero") && lastObject.numero != "" ) {
                filtered = [...filtered, {'nombre':'', 'numero':''}]
            }
        // }

        setFinalList(filtered)
        
    },[contactos])


    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key == "Enter" && activeCard == 1) {
                event.preventDefault()
                checkNextCard()
            }
        }
        document.addEventListener("keydown", handleKeyPress);
        return () => {
          document.removeEventListener("keydown", handleKeyPress);
        };
      })

  
      useEffect(() => {
          console.log("dammmn bro",breadcrumb)
      }, [breadcrumb])

    

    return (
        <div>
            <div className={styles.cards_cont}>
                    
                    <FreeCard3
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                        contactos={finalList}
                        setContactos={setContactos}
                        mensaje={mensaje}
                        messagesLimitAchieved={messagesLimitAchieved}
                        setMessagesLimitAchieved={setMessagesLimitAchieved}
                        modalShieldOptions={modalShieldOptions}
                        setModalShieldOptions={setModalShieldOptions}
                        shieldOptions={shieldOptions}
                    />

                    <FreeCard1 
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                        contactos={contactos}
                        setContactos={setContactos}
                        handleNewContact={handleNewContact}
                        handleDeleteContact={handleDeleteContact}
                        handleRenderModal={handleRenderModal}
                        finalList={finalList}
                        setDroppedCsv={setDroppedCsv}
                        notification={notification}
                        setNotification={setNotification}
                    />
                    <FreeCard2
                        setReadyMessage={setReadyMessage}
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                        mensaje={mensaje}
                        setMensaje={setMensaje}
                        selectedSecuence={selectedSecuence}
                        setSelectedSecuence={setSelectedSecuence}
                        setBreadcrumb={setBreadcrumb}
                        notification={notification}
                        setNotification={setNotification}         
                    />

                    

            </div>
            <div className={`${styles.nextCard} ${finalList.length === 1 || activeCard === 3 || !checkAllListFields() ? styles.arrow_disabled : ""}`} onClick={ ()=>{ checkNextCard() } }>
                <button><img src="/arrow-card.png" /></button>
            </div>
            <div className={`${styles.prevCard} ${activeCard == 1 && styles.arrow_disabled}`} onClick={ ()=>{  checkPrevCard()} }>
                <button><img src="/arrow-card.png" /></button>
            </div>

            

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
                    <img className={`${styles.dragon2} ${messagesLimitAchieved && styles.limitedAnim}`} src="/dragon_anim.gif" alt="dragon-chat"/>
                </div>
            }
            <NavBottom
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                checkPrevCard={checkPrevCard}
                checkNextCard={checkNextCard}
            />
            <WppBtn />
            
            {modalImport &&
                <div className={styles.modal_position_card1}>
                    <div>
                        <ModalContainer closeModal={ handleRenderModal } >
                            <ModalImportContacts setModalImport={setModalImport} uploadContacts={setContactos} inheritFile={droppedCsv}/>
                        </ModalContainer>
                    </div>
                </div>
            }
            {modalShieldOptions &&
                <div className={styles.modal_shield_option}>
                    <div>
                        <ModalContainer closeModal={ ()=>{ setModalShieldOptions(false) } } addedClass={"modal_shield_option"}>
                            <ModalShieldOptions setShieldOptions={setShieldOptions} setModalShieldOptions={setModalShieldOptions} />
                        </ModalContainer>
                    </div>
                </div>
            }
            
            {notification.render && <Notification status={notification.status} message={notification.message} modalReturn={notification.modalReturn} render={notification.render} /> }


        </div>
    
    );
}

export default CardsCont;