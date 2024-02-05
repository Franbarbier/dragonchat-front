import { AnimatePresence, motion } from 'framer-motion';
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

export interface ICardsCont {
    isPaid : boolean,
}


export interface ContactInfo {
    nombre : string,
    numero : string,
    estado? : STATUS.SUCCESS | STATUS.ERROR | STATUS.PENDING,
    selected? : boolean,
    repeated? : 1 | 2 | 3
}



const CardsCont: React.FC<ICardsCont> = ({ isPaid }) => {

    const [activeCard, setActiveCard] = useState<number>(1)
    const [contactos, setContactos] = useState<ContactInfo[]>([{nombre: '', numero: ''}])
    const [finalList, setFinalList] = useState<ContactInfo[]>([])
    
    const [mensaje, setMensaje] = useState<string>('')
    const [messages, setMessages] = useState<any>([['']])
    
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
    const [repeated, setRepeated] = useState<number[]>([])

    const [modalFinish, setModalFinish] = useState<boolean>(false)

    const [blackList, setBlackList] = useState<ContactInfo[]>([]);
    
    const [copyPasteTutorial, setCopyPasteTutorial] = useState<string | null>(null);
    const [antiBlockerTuto, setAntiBlockerTuto] = useState<string | null>(null);
    const [nextCard, setNextCard] = useState<boolean>(false)
    const [prevCard, setPrevCard] = useState<boolean>(false)


    function handleRenderModal(render:boolean){
        setModalImport(render)
    }
    
    useEffect(()=>{
        var filtered = [...contactos]

        filtered = removeColors(filtered)
        setFinalList(filtered)
        
    },[contactos])

    function removeColors(array) {
        
        let removedColors = [...array]
        // Create a map to store counts of each numero value
        const countMap = new Map();
        removedColors.forEach((item) => {
            const count = countMap.get(item.numero) || 0;
            countMap.set(item.numero, count + 1);
        });

        let aEliminar:any = []
        let newObjectsWithRepeats = removedColors.map((item, index) => {
            if (item.numero != "" && countMap.get(item.numero) > 1) {
                if (item.repeated >= 2) {
                    aEliminar.push(index)
                }
                return {...item}
            }else{
                return {
                    ...item,
                    repeated : undefined
                }
            }
        });

        setRepeated(aEliminar)
        return newObjectsWithRepeats
    }

    function deleteRepeat(ans) {
        if (ans) {
            let withoutRepeat = finalList.filter((_, index) => !repeated.includes(index));
            setContactos(withoutRepeat)
        }else{
            setRepeated([])
        }
    }

    useEffect(()=>{

        switch (activeCard) {
            case 1:
                const isValidArray = (arr) => {
                      if (arr.length < 2) {
                        // Array must have at least one element
                        return false;
                      }
                    
                      const nonEmptyNumeros = arr
                        .filter(item => item?.numero?.trim() !== '')
                        .map(item => item?.numero?.trim());
                    
                      if (nonEmptyNumeros.length !== new Set(nonEmptyNumeros).size) {
                        // Check for repeated values in "numero"
                        return false;
                      }
                    
                      // Check that none of the props are empty or blank spaces, excluding the last item
                      for (let i = 0; i < arr.length - 1; i++) {
                        const item = arr[i];
                        if (item?.nombre?.trim() === '' || item?.numero?.trim() === '') {
                          return false;
                        }
                      }
                      return true;
                }


                //   if there is NO repeated numbers. (o poner un setNextCard en el checkRepeated)
                if ( isValidArray(finalList) ) {
                    setNextCard(true)
                }else{
                    setNextCard(false)
                };

                setPrevCard(false)
                
                break;
            case 2:

                const emptyMess = messages.some((str) => str.trim() === '');

                if ( (tipoEnvio == MESSAGE_TYPE.DIFUSION && !emptyMess ) ) {
                    setNextCard(true)
                }else{ setNextCard(false) }
                setPrevCard(true)
                break;
            case 3:
                setNextCard(false)
                if (sendingState == SENDING_STATE.FINISH || sendingState == SENDING_STATE.SENDING) {
                    setPrevCard(false)                    
                }else{
                    setPrevCard(true)
                }

                break;
            default:
                break;
        }
    },[finalList, activeCard, messages])


    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key == "Enter" && activeCard == 1) {
                event.preventDefault()
                if ( nextCard ) setActiveCard(activeCard+1)
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
                        setBlackList={setBlackList}
                        setModalFinish={setModalFinish}
                        setRenderDialog={setRenderDialog}
                    />

                    <FreeCard1 
                        activeCard={activeCard}
                        setContactos={setContactos}
                        handleRenderModal={handleRenderModal}
                        finalList={finalList}
                        setDroppedCsv={setDroppedCsv}
                        notification={notification}
                        setNotification={setNotification}
                        isPaid={isPaid}

                    />
                    <FreeCard2
                        activeCard={activeCard}
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

            <div className={`${styles.nextCard} ${ ! nextCard ? styles.arrow_disabled : ""}`} onClick={ ()=>{ if ( nextCard ) setActiveCard(activeCard+1) } }>
                <button><img src="/arrow-card.png" /></button>
            </div>
            
            <div className={`${styles.prevCard} ${ ! prevCard ? styles.arrow_disabled : ""}`} onClick={ ()=>{ if ( prevCard ) setActiveCard(activeCard-1) } }>
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
                prevCard={prevCard}
                nextCard={nextCard}
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
           
           <AnimatePresence>
           {repeated.length > 0 && (
               <motion.div className={styles.notifDeleteRepeat}
                    initial={{ opacity: 0, x : 50 }}
                    exit={{ opacity: 0, x : 50 }}
                    animate={{ opacity: 1, x : 0 }}
                    key="notificationRepeat"
                >
                    <div>
                        <h4>Desea eliminar los numeros repetidos? <span> (Contactos resaltados en rojo)</span></h4>
                        <div className={styles.notifBtns}>
                            <button className={styles.btnOk} onClick={()=> deleteRepeat(true)}>Si</button>
                            <button className={styles.btnNo} onClick={()=> deleteRepeat(false)}>No</button>
                        </div>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
           
           
            {modalFinish && !messagesLimitAchieved && (
            <ModalContainer closeModal={ ()=> {setModalFinish(false)} } addedClass={"no_enviados"}>
                <ModalFinish blackList={blackList} />
            </ModalContainer>
            )}

        </div>
    
    );
}

export default CardsCont;