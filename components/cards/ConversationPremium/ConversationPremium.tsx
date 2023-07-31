<<<<<<< HEAD
import React, { useState } from 'react';
=======
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { STATUS } from '../../../enums';
>>>>>>> develop
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
<<<<<<< HEAD
=======
    activeSecuence : number | null;
    setActiveSecuence : (id: number | null) => void; 
>>>>>>> develop
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



<<<<<<< HEAD
const ConversationPremium: React.FC<IConversationPremium> = ({ blocked, setSelectedSecuence, selectedSecuence, notification, setNotification }) => {
=======
const ConversationPremium: React.FC<IConversationPremium> = ({ blocked, setSelectedSecuence, selectedSecuence, notification, setNotification, setActiveSecuence, activeSecuence }) => {
>>>>>>> develop
    
    const idCard = 2
 
    
    const [secuenciasCreadas, setSecuenciasCreadas] = useState<ISecuence[]>([])
    const [isNew, setIsNew] = useState<number>(-1)

    const [editSecuence, setEditSecuence] = useState<ISecuence | null>(null)
    const [gridHovered, setGridHovered] = useState<number | null>(null)
    const [menuOptions, setMenuOptions] = useState<number | null>(null)

    const [gridHovered, setGridHovered] = useState<number | null>()

    function new_secuence() {
        setEditSecuence({
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
<<<<<<< HEAD
=======

    const menuOpt = useRef(null);
    const menuConfig = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (menuConfig.current !== event.target ) {
            setMenuOptions(null);
          }
        };
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);
>>>>>>> develop


    return (            
        <div className={` ${styles.SecuencePremiumCard}`} >
            {blocked ?
            <>
                {editSecuence == null ?
                    <div>
                        <div className={styles.gridSecuences}>
                            <div className={styles.addNewSecuence} onClick={()=>{new_secuence()}}>
                                <img src='/close.svg' />
                            </div>
                            {secuenciasCreadas.map((secuen, index)=>(
                                <div key={`secuenNro${index}`}
                                    onClick={()=>{
<<<<<<< HEAD
                                        setActiveSecuence(secuen); setIsNew(index)
=======
                                        setActiveSecuence( index == activeSecuence ? null : index  );
                                        setIsNew(index)
>>>>>>> develop
                                    }}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    style={{
                                        opacity: gridHovered !== null && gridHovered !== index ? 0.5 : 1,
<<<<<<< HEAD
=======
                                        filter: activeSecuence !== null && activeSecuence !== index ? "brightness(0.6)" : "brightness(1)",
                                        borderColor: activeSecuence == index ? "#fffb11" : "#7545d8",
>>>>>>> develop
                                      }}
                                >
                                    <img src={ secuen.icon == "" ? "/dragonchat_logo.svg" : `/${secuen.icon}` } 
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            e.currentTarget.src = '/dragonchat_logo.svg';
                                        }} 
                                    />
                                    <div>
<<<<<<< HEAD
                                        <div>
                                            <span>{secuen.name}</span>
                                            <img src="/icon_config.svg" />
=======
                                        <div
                                            style={{
                                                borderColor: activeSecuence == index ? "#fffb11" : "#7545d8",
                                            }}>
                                            <span
                                            style={{
                                                borderColor: activeSecuence == index ? "#fffb11" : "#7545d8",
                                            }}>{secuen.name}</span>
                                            <img src="/icon_config.svg"
                                                ref={menuConfig}
                                                onClick={(e)=>{
                                                    e.stopPropagation()
                                                    setMenuOptions(index == menuOptions ? null : index)
                                                    // setSelectedSecuence(secuen)
                                                }}
                                            />
                                            <AnimatePresence>
                                                {menuOptions == index &&
                                                <motion.div className={styles.menuOptions} onClick={(e)=>{ e.stopPropagation() } } ref={menuOpt}>
                                                    <span
                                                        onClick={(e)=>{
                                                            e.preventDefault()
                                                            setEditSecuence(secuen)
                                                        }}
                                                    >Editar</span>
                                                    <span
                                                        onClick={(e)=>{
                                                            e.preventDefault()
                                                            let copiaNueva = {...secuen}
                                                            copiaNueva.name = `Copia de - ${copiaNueva.name}`
                                                            setSecuenciasCreadas([...secuenciasCreadas, copiaNueva])
                                                        }}
                                                    >Duplicar</span>
                                                    <span
                                                        onClick={(e)=>{
                                                            e.preventDefault()
                                                            setNotification({
                                                                status : STATUS.ALERT,
                                                                render : true,
                                                                message : `¿Estas seguro que quieres eliminar esta secuencia: ${secuen.name} ?`,
                                                                modalReturn : (booleanReturn)=>{
                                                                    setNotification({...notification, render : false })
                                                                    if ( booleanReturn ) {
                                                                        setSecuenciasCreadas(secuenciasCreadas.filter((secuence, i)=> i != index))
                                                                    }
                                                                }
                                                            })
                                                        }}
                                                    >Eliminar</span>
                                                </motion.div>
                                                }
                                            </AnimatePresence>
>>>>>>> develop
                                        </div>
                                    </div>
                                </div>
                            ))

                            }
                           
                        </div>
                        
                    </div>
                :
<<<<<<< HEAD
                    <DetailSecunce isNew={isNew} secuence={activeSecuence} setActiveSecuence={setActiveSecuence} secuenciasCreadas={secuenciasCreadas} setSecuenciasCreadas={setSecuenciasCreadas} notification={notification} setNotification={setNotification} />
=======
                    <DetailSecunce isNew={isNew} secuence={editSecuence} setActiveSecuence={setEditSecuence} secuenciasCreadas={secuenciasCreadas} setSecuenciasCreadas={setSecuenciasCreadas} notification={notification} setNotification={setNotification} />
>>>>>>> develop
                }
            </>
            :
                <BlockedPreVisual />
            }
        </div>
        
    );
    
}

export default ConversationPremium;