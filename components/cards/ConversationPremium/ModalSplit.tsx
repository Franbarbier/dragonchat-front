import { useEffect, useState } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import AddChatBox from './AddChatBox';
import ChatBox from './ChatBox';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';
import { SplitInfo } from './DetailSecuence';

export interface IModalSplit {
    type : "exclude" | "include",
    color : "blue" | "red",
    chat : IChat[],
    setChat : (chat:IChat[]) => void,
    setSplitModal : (bool:boolean) => void,
    splitModal : boolean,
    setSplitModalData : (infoSecuen:SplitInfo) => void,
    splitModalData : SplitInfo,
    chatIndex: number,
    setChatIndex: (i:number) => void,
    setSplitType : (splitType:"exclude" | "include") => void

}
    
const ModalSplit: React.FC<IModalSplit> = ({ type, color, chat, setChat, setSplitModal, splitModal, setSplitModalData, splitModalData, chatIndex, setChatIndex, setSplitType}) => {
    
    const [keyWords, setKeyWords] = useState<string[]>(splitModalData ? splitModalData.key_words : []);
    const [splitSecuence, setSplitSecuence] = useState(splitModalData ? splitModalData.split_chat : []);
   
    function comaSeparator(e){
        const inputText = e.target.value;
        if (e.which == 13 && e.target.value != "") { // if the input ends with a comma, create a new tag
        setKeyWords([...keyWords, inputText]); // add the new tag to the tags array
        e.target.value = ''; // clear the input for the next tag
        
        }
    }

    useEffect(()=>{
        setSplitModalData({...splitModalData, key_words : keyWords})
    }, [keyWords])

    // console log "test"
    
    function saveModalSplit() {
        if (keyWords.length >= 1 && splitSecuence.length >= 1 && splitModalData.name != "") {
                        
            console.log(splitModalData)

            let subObj = {
                name: splitModalData.name,
                key_words: keyWords,
                split_chat : splitSecuence
            }

            if (chatIndex == 0) {
                setChat([...chat, {
                    type: type,
                    color: 'red',
                    message: subObj
                }])
            }else{
                let copyChat = [...chat]
                copyChat[chatIndex] = {
                    type: type,
                    color: 'red',
                    message: subObj
                }
                setChat(copyChat)
            }
            setSplitSecuence([]);
            setSplitModal(false)
            setSplitModalData({
                name : '',
                key_words : [],
                split_chat : []
            })
            setChatIndex(0)
        }
        if (keyWords.length == 0) {
            alert('Agrega al menos una palabra para [excluir]')
        }
        if (splitSecuence.length == 0) {
            alert('Agrega al menos una respuesta a la secuencia')
        }
        if (splitModalData.name == "") {
            alert('Debes asignarle un nombre al split')
        }
    }

    return (
        <div className={styles.splitModal}>
            <div className={styles.splitNameCont}>
                <span>SPLIT</span>
                <input placeholder='Nombre del split' value={splitModalData.name} onChange={ (e)=>{setSplitModalData({ ...splitModalData, name: e.target.value })} }/>
            </div>
            <div style={{ height:'80%', marginTop: '5%', position: 'relative' }}>

            <div>
            <div className={styles.message_cont}>
                <div className={`${styles.message} ${styles.red_message} ${styles.red_type} ${type == "include" ? styles.include_cont : styles.exclude_cont}`}>
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
            </div>
                {splitSecuence.map((message, index)=>(
                    <ChatBox message={message} setChat={setSplitSecuence} chat={splitSecuence} index={index} setSplitModal={setSplitModal} setSplitModalData={setSplitModalData} splitModalData={splitModalData} chatIndex={chatIndex} setChatIndex={setChatIndex}/>
                    
                ))}
            </div>

           <AddChatBox arrMessages={splitSecuence} setArrMessages={setSplitSecuence} splitModal={splitModal} setSplitModal={setSplitModal} setSplitModalData={setSplitModalData} setSplitType={setSplitType}/>

        </div>
        <div className={styles.splitBtnsCont}>
            <CustomColorBtn
                type="submit"
                text="cancelar"
                backgroundColorInit="#a52022"
                backgroundColorEnd="#e22a2d"
                borderColor="#c22529"
                onClick={()=>{ setSplitSecuence([]); setSplitModalData({
                    name : '',
                    key_words : [],
                    split_chat : []
                }); setSplitModal(false); }}
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


        </div>
    
    );
}



export default ModalSplit;