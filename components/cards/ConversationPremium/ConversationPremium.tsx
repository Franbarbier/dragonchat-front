import React, { useState } from 'react';
import { INotification } from '../../Notification/Notification';
import BlockedPreVisual from './BlockedPreVisual';
import styles from './ConversationPremium.module.css';
import DetailSecunce from './DetailSecuence';

export interface IConversationPremium {
    blocked : boolean;
    setSelectedSecuence:  (secuence: ISecuence) => void;
    selectedSecuence : ISecuence | null;
    notification: INotification;
    setNotification: (notification: INotification) => void;
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



const ConversationPremium: React.FC<IConversationPremium> = ({ blocked, setSelectedSecuence, selectedSecuence, notification, setNotification }) => {
    
    const idCard = 2
 
    
    const [secuenciasCreadas, setSecuenciasCreadas] = useState<ISecuence[]>([])
    const [isNew, setIsNew] = useState<number>(-1)

    const [activeSecuence, setActiveSecuence] = useState<ISecuence | null>()

    const [gridHovered, setGridHovered] = useState<number | null>()

    function new_secuence() {
        console.log('crear y renderizar secuencia nueva')
        setActiveSecuence({
            name : '',
            icon : '',
            chat : []
        })
        setIsNew(-1)
    }

    const handleMouseEnter = (index) => {
        setGridHovered(index);
    };

    const handleMouseLeave = () => {
        setGridHovered(null);
    };


    return (            
        <div className={` ${styles.SecuencePremiumCard}`} >
            {blocked ?
            <>
                {activeSecuence == null ?
                    <div>
                        <div className={styles.gridSecuences}>
                            <div className={styles.addNewSecuence} onClick={()=>{new_secuence()}}>
                                <img src='/close.svg' />
                            </div>
                            {secuenciasCreadas.map((secuen, index)=>(
                                <div key={`secuenNro${index}`}
                                    onClick={()=>{
                                        setActiveSecuence(secuen); setIsNew(index)
                                    }}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        opacity: gridHovered !== null && gridHovered !== index ? 0.5 : 1,
                                      }}
                                >
                                    <img src={ secuen.icon == "" ? "/dragonchat_logo.svg" : `/${secuen.icon}` } 
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            e.currentTarget.src = '/dragonchat_logo.svg';
                                        }} 
                                    />
                                    <div>
                                        <div>
                                            <span>{secuen.name}</span>
                                            <img src="/icon_config.svg" />
                                        </div>
                                    </div>
                                </div>
                            ))

                            }
                           
                        </div>
                        
                    </div>
                :
                    <DetailSecunce isNew={isNew} secuence={activeSecuence} setActiveSecuence={setActiveSecuence} secuenciasCreadas={secuenciasCreadas} setSecuenciasCreadas={setSecuenciasCreadas} notification={notification} setNotification={setNotification} />
                }
            </>
            :
                <BlockedPreVisual />
            }
        </div>
        
    );
    
}

export default ConversationPremium;