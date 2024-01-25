import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { ANTIBLOCKER_TUTO, COPYPASTE_TUTO } from '../../constants/index';
import { MESSAGE_TYPE, SENDING_STATE, STATUS } from '../../enums/index';
import useDeviceType from '../../utils/checkDevice';
import AntiBlockerTuto from '../AntiBlockerTuto/AntiBlockerTuto';
import BoxDialog from '../BoxDialog/BoxDialog';
import CopyPasteTuto from '../CopyPasteTuto/CopyPasteTuto';
import ModalContainer from '../ModalContainer/ModalContainer';
import ModalFinish from '../ModalFinish/ModalFinish';
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
    isPaid : boolean,
}

type IdCard = {
    id: number
}

export interface ContactInfo {
    nombre : string,
    numero : string,
    estado? : STATUS.SUCCESS | STATUS.ERROR | STATUS.PENDING,
    selected? : boolean
}



const CardsCont: React.FC<ICardsCont> = ({ isPaid }) => {

    const [activeCard, setActiveCard] = useState<number>(1)
    const [contactos, setContactos] = useState<ContactInfo[]>([{nombre: '', numero: ''}])
    const [finalList, setFinalList] = useState<ContactInfo[]>([])
    
    const [mensaje, setMensaje] = useState<string>('')
    const [messages, setMessages] = useState<string[]>([''])
    
    const [tipoEnvio, setTipoEnvio] = useState<MESSAGE_TYPE.DIFUSION | MESSAGE_TYPE.CONVERSACION>(MESSAGE_TYPE.DIFUSION)

    const [selectedSecuence, setSelectedSecuence] = useState<ISecuence | null>(null)

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


    const [messagesLimitAchieved, setMessagesLimitAchieved] = useState<boolean>(false)
    const [renderDialog, setRenderDialog] = useState<boolean>(false)

    const [tamanoBloque, setTamanoBloque] = useState<number>(0);
    const [pausaBloque, setPausaBloque] = useState<number>(0);
    const [pausaMensaje, setPausaMensaje] = useState<number>(0);

    const [notification, setNotification] = useState<INotification>({
        status : STATUS.SUCCESS,
        render : false,
        message : "",
        modalReturn : ()=>{}
    })

    const [sendingState, setSendingState] = useState<SENDING_STATE>(SENDING_STATE.INIT);
    const [activeSecuence, setActiveSecuence] = useState<number | null>(null)
    const [isNumberRepeated, setIsNumberRepeated] = useState<boolean>(false)

    const [modalFinish, setModalFinish] = useState<boolean>(false)

    const [modalNoEnviados, setModalNoEnviados] = useState<boolean>(false);
    const [blackList, setBlackList] = useState<ContactInfo[]>([]);
    
    const [copyPasteTutorial, setCopyPasteTutorial] = useState<string | null>(null);
    const [antiBlockerTuto, setAntiBlockerTuto] = useState<string | null>(null);



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
        var values = new Set();
        for (let index = 0; index < finalList.length - 1; index++) {
            const element = finalList[index];
            if (element.nombre == "" || element.numero == "") {
                return false
            }
            
            
            if (values.has(element.numero)) {
                return false
            }
            values.add(element.numero)            
        }
        return true
    }


    function definedMessage() {

        function hasEmptyString() { return messages.some((str) => str === ''); }

        return !(tipoEnvio == MESSAGE_TYPE.DIFUSION && !hasEmptyString() || tipoEnvio == MESSAGE_TYPE.CONVERSACION && activeSecuence != null && activeCard == 2)

    }

    function checkNextCard() {
    
        switch (activeCard) {
            case 1:
                if (finalList.length > 1 && checkAllListFields()) return true;
                // falta agregar que no se repitan los numeros
            case 2:
                if ( !definedMessage() ) return true; 
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
                if (sendingState != SENDING_STATE.INIT) {
                    return false
                }
            case 3:
                if (sendingState == SENDING_STATE.FINISH || sendingState == SENDING_STATE.SENDING) {   
                    return false
                }
                return true
        
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

            if (lastObject.hasOwnProperty("nombre") && lastObject.nombre != "" || lastObject.hasOwnProperty("numero") && lastObject.numero != "" ) {
                filtered = [...filtered, {'nombre':'', 'numero':''}]
            }

        setFinalList(filtered)
        
    },[contactos])

    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key == "Enter" && activeCard == 1) {
                event.preventDefault()
                if ( checkNextCard() ) setActiveCard(activeCard+1)
            }
        }
        document.addEventListener("keydown", handleKeyPress);
        return () => {
          document.removeEventListener("keydown", handleKeyPress);
        };
      })


    const isMobile = useDeviceType();
    


    // Sistema de de cookies para saber si mostras o no los tutoriales
    useEffect(() => {
        if (copyPasteTutorial == "nunca") {
            Cookies.set(COPYPASTE_TUTO, "nunca", { expires: 200 })
        }
        if (copyPasteTutorial == "desp" || copyPasteTutorial == "nunca") {
            setCopyPasteTutorial(null)
        }
    }, [copyPasteTutorial])
    
    useEffect(() => {
        if (Cookies.get(COPYPASTE_TUTO) != "nunca") setCopyPasteTutorial("")
    }, [])

    useEffect(() => {
        if (antiBlockerTuto == "nunca") {
            Cookies.set(ANTIBLOCKER_TUTO, "nunca", { expires: 200 })
        }
        if (antiBlockerTuto == "desp" || antiBlockerTuto == "nunca") {
            setAntiBlockerTuto(null)
        }
    }, [antiBlockerTuto])

    useEffect(() => {
        if (activeCard == 3) {
            if (Cookies.get(ANTIBLOCKER_TUTO) != "nunca") setAntiBlockerTuto("")
        }
    }, [activeCard])



    return (
        <div>
            <div className={styles.cards_cont}>
                    
                    <FreeCard3
                        setActiveCard={(val:number)=>setActiveCard(val)}
                        activeCard={activeCard}
                        contactos={finalList}
                        setContactos={setContactos}
                        mensaje={mensaje}
                        messagesLimitAchieved={messagesLimitAchieved}
                        setMessagesLimitAchieved={setMessagesLimitAchieved}
                        modalShieldOptions={modalShieldOptions}
                        setModalShieldOptions={setModalShieldOptions}
                        shieldOptions={shieldOptions}
                        sendingState={sendingState}
                        setSendingState={setSendingState}
                        messages={messages}
                        setNotification={setNotification}
                        notification={notification}
                        blackList={blackList}
                        setBlackList={setBlackList}
                        // setModalNoEnviados={setModalNoEnviados}
                        setModalFinish={setModalFinish}
                        setRenderDialog={setRenderDialog}
                    />

                    <FreeCard1 
                        setActiveCard={(val:number)=>setActiveCard(val)}
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
                        isPaid={isPaid}
                    />
                    <FreeCard2
                        setActiveCard={(val:number)=>setActiveCard(val)}
                        activeCard={activeCard}
                        mensaje={mensaje}
                        setMensaje={setMensaje}
                        selectedSecuence={selectedSecuence}
                        setSelectedSecuence={setSelectedSecuence}
                        setBreadcrumb={setBreadcrumb}
                        notification={notification}
                        setNotification={setNotification}      
                        tipoEnvio={tipoEnvio}
                        setTipoEnvio={setTipoEnvio}
                        activeSecuence={activeSecuence}
                        setActiveSecuence={setActiveSecuence}
                        messages={messages}
                        setMessages={setMessages}
                    />

                    

            </div>

            <div className={`${styles.nextCard} ${ !checkNextCard() ? styles.arrow_disabled : ""}`} onClick={ ()=>{ if ( checkNextCard() ) setActiveCard(activeCard+1) } }>
                <button><img src="/arrow-card.png" /></button>
            </div>
            
            <div className={`${styles.prevCard} ${ !checkPrevCard() ? styles.arrow_disabled : ""}`} onClick={ ()=>{ if ( checkPrevCard() ) setActiveCard(activeCard-1) } }>
                <button><img src="/arrow-card.png" /></button>
            </div>

            {
                !isMobile &&
                <div>
                    <div className={styles.dragon1}>

                        { renderDialog && messagesLimitAchieved ?
                            <>
                                <div style={{
                                    position: "fixed",
                                    top: "0",
                                    left: "0",
                                    width: "100vw",
                                    height: "100vh",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    zIndex: 100
                                }}></div>

                                <img src="/dragon_anim2.gif" alt="dragon-chat"/>

                                <div className={styles.wpp_limit_alert}>
                                    <BoxDialog setRenderDialog={setRenderDialog}/>
                                </div>
                            </>
                        :
                            <img src="/dragon_anim.gif" alt="dragon-chat"/>
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
                            <ModalImportContacts setModalImport={setModalImport} uploadContacts={setContactos} inheritFile={droppedCsv} notification={notification} setNotification={setNotification} />
                        </ModalContainer>
                    </div>
                </div>
            }
            {modalShieldOptions &&
                <div className={styles.modal_shield_option}>
                    <div>
                        <ModalContainer closeModal={ ()=>{ setModalShieldOptions(false) } } addedClass={"modal_shield_option"}>
                            <ModalShieldOptions setShieldOptions={setShieldOptions} setModalShieldOptions={setModalShieldOptions}
                            tamanoBloque={tamanoBloque}
                            setTamanoBloque={setTamanoBloque}
                            pausaBloque={pausaBloque}
                            setPausaBloque={setPausaBloque}
                            pausaMensaje={pausaMensaje}
                            setPausaMensaje={setPausaMensaje} />
                        </ModalContainer>
                    </div>
                </div>
            }

            {copyPasteTutorial != null && <CopyPasteTuto setTuto={setCopyPasteTutorial} /> }
            {antiBlockerTuto != null && <AntiBlockerTuto setTuto={setAntiBlockerTuto } /> }
            
           <Notification status={notification.status} message={notification.message} modalReturn={notification.modalReturn} render={notification.render} />
           
            {modalFinish && !messagesLimitAchieved && (
            <ModalContainer closeModal={ ()=> {setModalFinish(false)} } addedClass={"no_enviados"}>
                <ModalFinish blackList={blackList} />
            </ModalContainer>
            )}

        </div>
    
    );
}

export default CardsCont;