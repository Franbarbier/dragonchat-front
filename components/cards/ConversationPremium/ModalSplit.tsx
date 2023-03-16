import { useState } from 'react';
import AddChatBox from './AddChatBox';
import ChatBox from './ChatBox';
import { IChat } from './ConversationPremium';
import styles from './ConversationPremium.module.css';

export interface IModalSplit {
    type : "exclude" | "include",
    color : "blue" | "red"
}
    
const ModalSplit: React.FC<IModalSplit> = ({ type, color }) => {
    
    const [excludes, setExcludes] = useState<string[]>([]);
    const [splitSecuence, setSplitSecuence] = useState<IChat[]>([])

    const [splitModal, setSplitModal] = useState<boolean>(false)
   

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
                <input placeholder='Nombre del split' />
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
                    <ChatBox message={message} setChat={setSplitSecuence} chat={splitSecuence} index={index}/>
                ))}
            </div>

           <AddChatBox chat={splitSecuence} setChat={setSplitSecuence} splitModal={splitModal} setSplitModal={setSplitModal} />

        </div>


        </div>
    
    );
}



export default ModalSplit;