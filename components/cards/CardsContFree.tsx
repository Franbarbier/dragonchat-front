import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { ANTIBLOCKER_TUTO, COPYPASTE_TUTO } from '../../constants/index';
import { EVENT_KEY, MESSAGE_TYPE, SENDING_STATE, STATUS } from '../../enums/index';
import useDeviceType from '../../utils/checkDevice';
import AntiBlockerTuto from '../AntiBlockerTuto/AntiBlockerTuto';
import BoxDialog from '../BoxDialog/BoxDialog';
import CopyPasteTuto from '../CopyPasteTuto/CopyPasteTuto';
import ModalContainer from '../ModalContainer/ModalContainer';
import NavBottom from '../NavBottom/NavBottom';
import Notification, { INotification } from '../Notification/Notification';
import WppBtn from '../WppBtn/WppBtn';
import FreeCard2 from './Card/MessageFree';
import FreeCard1 from './Card/RecipientsFree';
import FreeCard3 from './Card/SendFree';
import styles from './CardsCont.module.css';
import { IChat, ISecuence } from './ConversationPremium/ConversationPremium';
import ModalFinish from './ModalFinish/ModalFinish';
import ModalImportContacts from './ModalImportContacts/ModalImportContacts';
import ModalShieldOptions from './ModalShieldOptions/ModalShieldOptions';

export interface ICardsCont {
    isPaid: boolean;
    setGlobalData: ( val:{contactos: ContactInfo[], messages: string[][]} ) => void;
    globalData: {
        contactos: ContactInfo[];
        messages: string[][];
    };
}


export interface ContactInfo {
    nombre : string,
    numero : string,
    estado? : STATUS.SUCCESS | STATUS.ERROR | STATUS.PENDING,
    selected? : boolean,
    repeated? : 1 | 2 | 3
}



const CardsCont: React.FC<ICardsCont> = ({ isPaid, setGlobalData, globalData }) => {

    const [activeCard, setActiveCard] = useState<number>(1)
    const [contactos, setContactos] = useState<ContactInfo[]>(globalData.contactos ? globalData.contactos : [{nombre: '', numero: ''}])
    const [finalList, setFinalList] = useState<ContactInfo[]>([])
    
    const [mensaje, setMensaje] = useState<string>('')
    const [messages, setMessages] = useState<string[][]>(globalData.messages ? globalData.messages : [['']])
    
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

    // sneding tracker
    const [listCounter, setListCounter] = useState<any>(0);

    // timers anti-blocker
    const [activeShield, setActiveShield] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(3);
    const [bloques, setBloques] = useState<number>(0);
    const [pausa, setPausa] = useState<number>(0);

    const [isInputFocused, setIsInputFocused] = useState(false);


    function handleRenderModal(render:boolean){
        setModalImport(render)
    }
    
    useEffect(()=>{
        var filtered = [...contactos]

        filtered = removeColors(filtered)

        if (filtered.length > 1) {
            filtered.map((item, index) => {
                if (item.nombre == "" && item.numero == "" && index != filtered.length - 1) {
                    filtered.splice(index, 1)
                }
                const isNombreEmpty = item.nombre === '';
                const isNumeroEmpty = item.numero === '';


                if ((isNombreEmpty && !isNumeroEmpty) || (!isNombreEmpty && isNumeroEmpty) && !isInputFocused) {
                    setNotification({
                        status : STATUS.ERROR,
                        render : true,
                        message : "No puede haber un campo vacío en la lista.",
                        modalReturn : () => {
                            setNotification({...notification, render : false},
                        )}
                    })
                
                }
            }
            )
        }

        setFinalList(filtered)
        
    },[contactos, isInputFocused])

    function removeColors(array) {
        
        let removedColors = [...array]
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

        setGlobalData({
            contactos : finalList,
            messages : messages
        })

        switch (activeCard) {
            case 1:
                const isValidArray = (arr) => {
                      if (arr.length < 2) {
                        return false;
                      }
                    
                      const nonEmptyNumeros = arr
                        .filter(item => item?.numero?.trim() !== '')
                        .map(item => item?.numero?.trim());
                    
                      if (nonEmptyNumeros.length !== new Set(nonEmptyNumeros).size) {
                        return false;
                      }
                    
                      for (let i = 0; i < arr.length - 1; i++) {
                        const item = arr[i];
                        if (item?.nombre?.trim() === '' || item?.numero?.trim() === '') {
                          return false;
                        }
                      }
                      return true;
                }


                if ( isValidArray(finalList) ) {
                    setNextCard(true)
                }else{
                    setNextCard(false)
                };

                setPrevCard(false)
                
                break;
            case 2:

                const emptyMess = messages.some(subarray => subarray.includes(""))

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
            if (event.key == EVENT_KEY.ENTER && activeCard == 1) {
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

    
    function nuevaDifusion() {
        setActiveCard(1)
        const newArray = contactos.map(obj => {
            // Destructure the object to remove the "estado" property
            const { estado, ...rest } = obj;
            return rest; // Return the object without the "estado" property
        });
        setContactos(newArray)
        setMessages([['']])
        setSendingState(SENDING_STATE.INIT)
        setModalFinish(false)
        setListCounter(0)
        setBlackList([])
    }



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
                        setModalShieldOptions={setModalShieldOptions}
                        modalShieldOptions={modalShieldOptions}
                        sendingState={sendingState}
                        setSendingState={setSendingState}
                        messages={messages}
                        setNotification={setNotification}
                        notification={notification}
                        setBlackList={setBlackList}
                        setModalFinish={setModalFinish}
                        modalFinish={modalFinish}
                        setRenderDialog={setRenderDialog}
                        setActiveShield={setActiveShield}
                        activeShield={activeShield}
                        timer={timer}
                        bloques={bloques}
                        pausa={pausa}
                        nuevaDifusion={nuevaDifusion}
                        listCounter={listCounter}
                        setListCounter={setListCounter}
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
                        isInputFocused={isInputFocused}
                        setIsInputFocused={setIsInputFocused}

                    />
                    <FreeCard2
                        activeCard={activeCard}
                        selectedSecuence={selectedSecuence}
                        setBreadcrumb={setBreadcrumb}
                        notification={notification}
                        setNotification={setNotification}      
                        tipoEnvio={tipoEnvio}
                        setTipoEnvio={setTipoEnvio}
                        messages={messages}
                        setMessages={setMessages}
                        isPaid={isPaid}
                        nextCard={nextCard}
                        setActiveCard={setActiveCard}
                    />

                    

            </div>
            
            {/* Si esta en ultima card y ya termino de enviar muestra el refresh */}
            {
                activeCard == 3 && sendingState == SENDING_STATE.FINISH ? 
                <div className={`${styles.nextCard} ${styles.resend}`} onClick={ ()=>{ nuevaDifusion() } }>
                    <button><img src="/resend.png" /></button>
                    <AnimatePresence>
                        <aside >Nuevo envío</aside>
                    </AnimatePresence>
                </div>
                :
                <div className={`${styles.nextCard} ${ ! nextCard ? styles.arrow_disabled : ""}`} onClick={ ()=>{ if ( nextCard ) setActiveCard(activeCard+1) } }>
                    <button><img src="/arrow-card.png" /></button>
                </div>
            }
            
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
                            <ModalShieldOptions 
                                setActiveShield={setActiveShield}
                                setModalShieldOptions={setModalShieldOptions}
                                timer={timer}
                                setTimer={setTimer}
                                bloques={bloques}
                                setBloques={setBloques}
                                pausa={pausa}
                                setPausa={setPausa}
                            />
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
            <ModalContainer closeModal={ ()=> {setModalFinish(false)} } addedClass={"no_enviados"} >
                <ModalFinish blackList={blackList} nuevaDifusion={nuevaDifusion} isPaid={isPaid}/>
            </ModalContainer>
            )}

        </div>
    
    );
}

export default CardsCont;