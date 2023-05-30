import { useEffect, useState } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { INotification } from '../../Notification/Notification';
import CardTitle from '../CardTitle/CardTitle';
import ChatWindow, { ISplitModal } from './ChatWindow';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';

export interface IModalSplit {
    chat : IChat[],
    setChat : (chat:IChat[]) => void,
    setSplitModal : (splitData:IChat | null) => void,
    splitModal : IChat | null,
    parentIndex: number,
    setParentIndex : (i:number) => void;
    scrollToBottom : ()=> void,
    notification: INotification,
    setNotification: (notification: INotification) => void
    
}

const InfoModal: React.FC<{ setInfoModal: (i:boolean) => void, type: any } > = ({ setInfoModal, type }) => {

    return (
        <div className={styles.infoModal}>
            <img src="/trama-car.svg" className={`${styles.tramaInfoSplitBottom} ${styles.tramaInfoSplit}`} />
            <img src="/trama-car.svg" className={`${styles.tramaInfoSplitTop} ${styles.tramaInfoSplit}`} />
            <div>
                <img className={styles.closeInfoSplit} src="/close.svg" onClick={ ()=>{setInfoModal(false)}} />
                <CardTitle text='AYUDA' />

                {type == "exclude" &&  <h3 className={styles.verde}>Exceptuar respuesta</h3> } 
                {type == "include" &&  <h3 className={styles.rojo}>Solamente Si respuesta</h3> } 

                <p>Se activará el proximo elemento de la secuencia ante cualquier respuesta que {type == "exclude" &&  "NO" } {type == "include" && "SI" } contenga las palabras establecidas.</p>
                <div className={styles.ejemplosSplit}>
                    <h6>EJEMPLOS DE FORMATO</h6>
                    <div>
                        <div>
                            <span>si</span>
                        </div>
                        <p>"Hola, <span className={styles.verde}>si</span>" | "<span className={styles.verde}>si</span>ii dale" | "<span className={styles.verde}>si</span>empre"</p>
                    </div>
                    <div>
                        <div>
                            <span>_si_</span>
                        </div>
                        <p>"Hola, <span className={styles.verde}>si</span>" | "<span className={styles.rojo}>siii dale</span></p>
                    </div>
                    <div>
                        <div>
                            <span>_si_</span>
                        </div>
                        <p>"Hola, <span className={styles.verde}>si</span>" | "<span className={styles.rojo}>siii dale</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ModalSplit: React.FC<IModalSplit> = ({ setSplitModal, splitModal, chat, setChat, parentIndex, setParentIndex, scrollToBottom, notification, setNotification }) => {
    
    const [keyWords, setKeyWords] = useState<string[]>(splitModal ? splitModal.info.key_words : []);
    const [splitSecuence, setSplitSecuence] = useState(splitModal ? splitModal.info.split_chat : []);
    const [splitData, setSplitData] = useState<ISplitModal>(splitModal ? splitModal.info : {})

    const [infoModal, setInfoModal] = useState<boolean>(false)

    const [oldSecuence, setOldSecuence] = useState<IChat[]>([]);
   
    function comaSeparator(e){
        const inputText = e.target.value;
        if (e.which == 13 && e.target.value != "") { // if the input ends with a comma, create a new tag
            if (inputText.includes(',')) {
                
                var words = inputText.split(',');
                words = words.map(str => str.trim());

                setKeyWords([...keyWords, ...words]); // add the new tag to the tags array
                
            }else{
                setKeyWords([...keyWords, inputText]); // add the new tag to the tags array
            }
        e.target.value = ''; // clear the input for the next tag
        
        }
    }

    useEffect(()=>{
        console.log(keyWords)
        setSplitData({...splitData, key_words : keyWords})
    }, [keyWords])

    
    function saveModalSplit() {
        if (keyWords.length >= 1 && splitSecuence.length >= 1 && splitData.name != "" && splitSecuence[0].info != "") {
                        
            console.log(splitData)

            let subObj = {
                name: splitData.name,
                key_words: keyWords,
                split_chat : splitSecuence
            }

            console.log({
                        type: splitModal?.type,
                        color: 'red',
                        info: subObj
                    })

            if (parentIndex == 0) {
                setChat([...chat, {
                    type: splitModal!.type,
                    color: 'red',
                    info: subObj
                }])
            }else{
                let copyChat = [...chat]
                copyChat[parentIndex] = {
                    type: splitModal!.type,
                    color: 'red',
                    info: subObj
                }
                setChat(copyChat)
            }
            setSplitSecuence([]);
            setSplitModal(null)
            setSplitData({
                name : '',
                key_words : [],
                split_chat : []
            })
            setParentIndex(0)
            setTimeout(() => {
                scrollToBottom()   
            }, 100);
        }
        if (keyWords.length == 0) {
            setNotification({
                status : "error",
                render : true,
                message : `Agrega al menos una palabra para ${ splitModal?.type == 'exclude' ? "excluir" : "incluir"}`,
                modalReturn : () => {
                    setNotification({...notification, render : false})
                }})
        }
        if (splitSecuence.length == 0) {
            setNotification({
                status : "error",
                render : true,
                message :'Agrega al menos una respuesta a la secuencia',
                modalReturn : () => {
                    setNotification({...notification, render : false})
                }})
        }
        if (splitData.name == "") {
            setNotification({
                status : "error",
                render : true,
                message :'Debes asignarle un nombre al split',
                modalReturn : () => {
                    setNotification({...notification, render : false})
                }})
        }
        if ( splitSecuence[0].info == "") {
            setNotification({
                status : "error",
                render : true,
                message :'Completa al menos un mensaje',
                modalReturn : () => {
                    setNotification({...notification, render : false})
                }})
        }
    }


    function cancelChanges() {
        console.log(oldSecuence);
        setSplitSecuence([]);
        setSplitModal(null);
        setParentIndex(0)
    }
   



    return (
        <div className={styles.splitModal}>
            <img src="/trama-car.svg" className={`${styles.tramaBottom} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaLeft} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaRight} ${styles.tramas}`} />
            <div className={styles.splitNameCont}>
                <span>SPLIT</span>
                <input placeholder='Nombre del split' value={splitData.name} onChange={ (e)=>{setSplitData({ ...splitData, name: e.target.value })} }/>
            </div>
            <div style={{ height:'80%', marginTop: '5%' }}>

            <div>
            <div className={styles.message_cont}>
                <div className={`${styles.message} ${styles.keyWordsCont} ${styles.red_message} ${styles.red_type} ${splitModal?.type == "include" ? styles.include_cont : styles.exclude_cont}`}>
                    <div className={`${styles.keyWordChat}` } >  
                        <div className={styles.keyWordList}>
                            {keyWords.map((keyWord) =>(
                                <div>
                                    <span>{keyWord}</span>
                                    <img src="/close.svg" onClick={ ()=>{ setKeyWords( keyWords.filter(word => word != keyWord) ) } }/>    
                                </div>
                            ))}
                        </div>
                        <input
                            onKeyDown={ (e)=>{ comaSeparator(e) } }
                            placeholder='Presiona enter para agregar'
                        />
                    </div>
                </div>
                <div className={styles.switchCont}>
                    <div>
                        <img src="/info.svg" onClick={ ()=>{ setInfoModal(true) } }/>
                    </div>
                    <div>
                        <img src="/refresh.svg" onClick={()=>{

                            let copySplit  = {...splitModal}
                            // console.log(copySplit.type)
                            copySplit!.type = copySplit!.type == "exclude" ? "include" : "exclude"
                            const NewCopySplit = copySplit as IChat
                            setSplitModal(NewCopySplit)
                        }}/>
                    </div>
                </div>
            </div>
            </div>

            {/* Aca va el chat window */}
            <ChatWindow chatData={splitSecuence} setChatData={setSplitSecuence} notification={notification} setNotification={setNotification} />

        </div>
        
        <div className={styles.splitBtnsCont}>
            <CustomColorBtn
                type="submit"
                text="cancelar"
                backgroundColorInit="#a52022"
                backgroundColorEnd="#e22a2d"
                borderColor="#c22529"
                onClick={()=>{ cancelChanges() }}
                disable={ false }
            />
            <CustomColorBtn
                type="submit"
                text="GUARDAR"
                backgroundColorInit="#c21c3b"
                backgroundColorEnd="#f9bd4f"
                borderColor="#e17846"
                onClick={()=>{ saveModalSplit()}}
                disable={ false }
            />
            
        </div>
        
        {infoModal && <InfoModal setInfoModal={setInfoModal} type={splitModal?.type} />}

        </div>
    
    );
}



export default ModalSplit;