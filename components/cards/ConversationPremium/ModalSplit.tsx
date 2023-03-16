import { useState } from 'react';
import styles from './ConversationPremium.module.css';

export interface IModalSplit {

}
    
const ModalSplit: React.FC<IModalSplit> = ({ }) => {
    

    const [excludes, setExcludes] = useState<string[]>([]);
   
    function comaSeparator(e){
        const inputText = e.target.value;
        if (e.which == 13 && e.target.value != "") { // if the input ends with a comma, create a new tag
        setExcludes([...excludes, inputText]); // add the new tag to the tags array
        e.target.value = ''; // clear the input for the next tag
        
        }
    }


    return (
        <div className={styles.modalSplitCont}>
            <div className={styles.splitNameCont}>
                <span>SPLIT</span>
                <input placeholder='Nombre del split' />
            </div>
            <div>
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
    
    );
}



export default ModalSplit;