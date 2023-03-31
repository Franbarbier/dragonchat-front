import React, { useEffect, useState } from 'react';
import BlockedPreVisual from './BlockedPreVisual';
import styles from './ConversationPremium.module.css';
import DetailSecunce from './DetailSecuence';

export interface IConversationPremium {
    blocked : boolean;
}

// types of info:
// 1. texto : string
// 2. followup : {message : string, delay: {hours: string, mins: string, secs: string}}
// 3. include/exclude:  {name: string, key_words: [], split_chat : IChat[]}
// 4. archivo : {url: string, name: string}
// 5. any: string

export interface IChat {
    info : any,
    color : string,
    type : "texto" | "archivo" | "followup" | "any" | "exclude" | "include" | "split";
}
export interface ISecuence {
    name : string,
    icon : string,
    chat : IChat[]
}



export interface ISecuencePremium {
    blocked : boolean
}


interface IChatBox {
    message : IChat,
    setChat : (chat:IChat[])=> void,
    chat : IChat[],
    index : number
}



const ConversationPremium: React.FC<IConversationPremium> = ({ blocked }) => {
    
    const idCard = 2
 
    const [selectedSecuence, setSelectedSecuence] = useState<ISecuence | null>(null)
    const [secuenciasCreadas, setSecuenciasCreadas] = useState<ISecuence[]>([])

    const [activeSecuence, setActiveSecuence] = useState<ISecuence>({
        name : '',
        icon : '',
        chat : []
    })

    function new_secuence() {
        console.log('crear y renderizar secuencia nueva')
        setSelectedSecuence({
            name : '',
            icon : '',
            chat : []
        })
    }

    useEffect(()=>{
        console.log(activeSecuence)
    },[activeSecuence])


    return (            
        <div className={` ${styles.SecuencePremiumCard}`} >
            {!blocked ?
            <>
                {!selectedSecuence ?
                    <div>
                        <div className={styles.gridSecuences}>
                            <div className={styles.addNewSecuence} onClick={()=>{new_secuence()}}>
                                <img src='/close.svg' />
                            </div>
                            {secuenciasCreadas.map((secuen, index)=>(
                                <div>
                                    <img />
                                </div>
                            ))

                            }
                           
                        </div>
                        
                    </div>
                :
                    <DetailSecunce secuence={activeSecuence}/>
                }
            </>
            :
                <BlockedPreVisual />
            }
        </div>
        
    );
    
}

export default ConversationPremium;