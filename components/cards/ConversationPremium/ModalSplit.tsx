import { useState } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import AddChatBox from './AddChatBox';
import ChatBox from './ChatBox';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';

export interface IModalSplit {
    type : "exclude" | "include",
    color : "blue" | "red",
    chat : IChat[],
    setChat : (chat:IChat[]) => void,
    setSplitModal : (bool:boolean) => void,
    splitModal : boolean,
    setSplitModalData : (infoSecuen:IChat[]) => void,
    splitModalData : IChat[]
}
    
const ModalSplit: React.FC<IModalSplit> = ({ type, color, chat, setChat, setSplitModal, splitModal, setSplitModalData=[], splitModalData }) => {
    
    const [excludes, setExcludes] = useState<string[]>([]);
    const [splitName, setSplitName] = useState<string>('');
    const [splitSecuence, setSplitSecuence] = useState<IChat[]>(splitModalData)
   
    function comaSeparator(e){
        const inputText = e.target.value;
        if (e.which == 13 && e.target.value != "") { // if the input ends with a comma, create a new tag
        setExcludes([...excludes, inputText]); // add the new tag to the tags array
        e.target.value = ''; // clear the input for the next tag
        
        }
    }
    

    return (
        <div className={styles.splitModal}>
            <div className={styles.splitNameCont}>
                <span>SPLIT</span>
                <input placeholder='Nombre del split' value={splitName} onChange={ (e)=>{setSplitName(e.target.value)} }/>
            </div>
            <div style={{ height:'80%', marginTop: '5%', position: 'relative' }}>

            <div>
            <div className={styles.message_cont}>
                <div className={`${styles.message}  ${color == "blue" ? `${styles.blue_message} ${styles.blue_type}` : `${styles.red_message}
                ${styles.red_type}` }`}>
                    <div className={styles.excludeChat}>  
                        <div className={styles.excludeList}>
                            {excludes.map((exclude) =>(
                                <div>
                                    <span>{exclude}</span>
                                    <img src="/close.svg" onClick={ ()=>{ setExcludes( excludes.filter(word => word != exclude) ) } }/>    
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
                    <ChatBox message={message} setChat={setSplitSecuence} chat={splitSecuence} index={index} setSplitModal={setSplitModal} />
                ))}
            </div>

           <AddChatBox chat={splitSecuence} setChat={setSplitSecuence} splitModal={splitModal} setSplitModal={setSplitModal} />

        </div>
        <div className={styles.splitBtnsCont}>
            <CustomColorBtn
                type="submit"
                text="cancelar"
                backgroundColorInit="#a52022"
                backgroundColorEnd="#e22a2d"
                borderColor="#c22529"
                onClick={()=>{ setSplitSecuence([]); setExcludes([]); setSplitModal(false)}}
                disable={ false }
            />
            <CustomColorBtn
                type="submit"
                text="GUARDAR"
                backgroundColorInit="#c21c3b"
                backgroundColorEnd="#f9bd4f"
                borderColor="#e17846"
                onClick={()=>{ 
                    if (excludes.length >= 1 && splitSecuence.length >= 1 && splitName != "") {
                        let splitMessage = {
                            message : excludes,
                            color : "red",
                            type : "exclude",
                            name : splitName
                        }

                        let splitBigObj:IChat = {
                            color : 'red',
                            type : 'split',
                            message : [splitMessage, ...splitSecuence]
                        }
                        console.log(splitBigObj)
                        console.log([...chat, splitBigObj])
                        setChat([...chat, splitBigObj])
                        setSplitSecuence([]);
                        setExcludes([])
                        // setSplitModal(false)
                        
                    }
                    if (excludes.length == 0) {
                        alert('Agrega al menos una palabra para [excluir]')
                    }
                    if (splitSecuence.length == 0) {
                        alert('Agrega al menos una respuesta a la secuencia')
                    }
                    if (splitName == "") {
                        alert('Debes asignarle un nombre al split')
                    }
                }}
                disable={ false }
            />
            
        </div>


        </div>
    
    );
}



export default ModalSplit;