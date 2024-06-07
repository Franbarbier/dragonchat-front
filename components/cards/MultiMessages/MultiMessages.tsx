import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { STATUS } from '../../../enums';

import { INotification } from '../../Notification/Notification';
import styles from './MultiMessages.module.css';


import Picker from "emoji-picker-react";
import EditableParagraph from './EditableParagraph/EditableParagraph';

export interface IMultiMessages {
    messages : string[][];
    setMessages : (message: string[][]) => void;
    notification : INotification;
    setNotification : (notification: INotification) => void;
    delayBetween : number;
    setDelayBetween : (val: number) => void;
    isPaid: boolean;
    setModalPro : (modalPro: boolean) => void;
    setTestNext : (val:boolean) => void
}


const MultiMessages: React.FC<IMultiMessages> = ({ setTestNext, notification, setNotification, messages, setMessages, delayBetween, setDelayBetween, isPaid, setModalPro }) => {
   
    const [testMsj, setTestMsj] = useState<string[][]>(messages)
    const [pMessages, setPMessages] = useState<string[][]>(messages)


    const [content, setContent] = useState<[number, number]>([0,0]);

    const [range, setRange] = useState<Range | null>(null);

    const handleBlur = (e, index, j) => {

        let newPMessages = [...pMessages];
        newPMessages[index][j] = e.target.innerText;
        setPMessages(newPMessages);

        // get cursor position
        const selection = window.getSelection();
        // place a string in the cursor position
        const range = selection ? selection.getRangeAt(0) : null;

        setRange(range);
        setContent([index, j]);
    };

    const insertTextAtCursor = () => {

        try {
            let activeP = pMessages?.[content[0]]?.[content[1]] ?? '';
            
            let newRange = range?.startOffset ?? activeP.length;
            if (range?.startOffset === 0) {
                newRange = activeP.length;
            }
            
            // set in the range position the string in "content" var string
            const newContent = activeP.substring(0, newRange) + "[name]" + activeP.substring(newRange);
            
            let newMessages = [...pMessages];
            newMessages[content[0]][content[1]] = newContent;
            setPMessages(newMessages);

        } catch (error) {

            let activeP = pMessages[pMessages.length-1][0]
            let newRange = activeP.length;
            
            // set in the range position the string in "content" var string
            const newContent = activeP.substring(0, newRange) + "[name]"
            let newMessages = [...pMessages];
            newMessages[pMessages.length-1][0] = newContent;
            setPMessages(newMessages);
        }
    
    };
    


    useEffect(()=>{
        if (pMessages.length === 0) {
            setPMessages([[""]])
        }
    },[messages])



    const emojiCont = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiCont.current && !(emojiCont.current as Element).contains(event.target as Node)) {
                setShowPicker([99,99]);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [emojiCont]);

    useEffect(()=>{
        setMessages(testMsj)
    },[testMsj])
    useEffect(()=>{
        setMessages(pMessages)
    },[pMessages])

    const [showPicker, setShowPicker] = useState<[number, number]>([99,99]);

    const onEmojiClick = (event) => {
        
        let newMessages = [...pMessages];
        const thisArr = newMessages[showPicker[0]]
        thisArr[showPicker[1]] = thisArr[showPicker[1]] + event.emoji;
        newMessages[showPicker[0]] = thisArr;
        setPMessages(newMessages);

        setShowPicker([99,99]);
    };

  

    
    return (
            <div className={styles.MultiMessages_cont}>
                <div>
                    <ul>

                    {isPaid &&
                        <li className={styles.delayBetCont}>
                            <div>Podes establecer un delay entre cada mensaje para una mejor experiencia:</div>
                            <div>
                                <input type='number' value={delayBetween} onChange={(e)=>{
                                            if (e.target.value < '1') {
                                                e.target.value = '1';
                                                return false;
                                            }
                                            setDelayBetween(Number(e.target.value))
                                        }
                                    }/>
                                <span>(segundos)</span>
                            </div>
                        </li>
                    
                    }
                        <li>Escribiendo <strong onClick={ insertTextAtCursor }>[name]</strong> se va a enviar dinamicamente el nombre del destinatario.</li>
                    </ul>

                    <div className={styles.MultiMessages}>
                        <div>
                            {pMessages.map((message, index)=>{
                                    return (
                                        <div key={`mensajesCopy${index}`}>
                                        <>
                                            <motion.div className={styles.messages_cont}
                                                initial={{ opacity: 0, y : 50 }}
                                                animate={{ opacity: 1, y : 0 }}
                                                
                                            >
                                                <div>
                                                    {
                                                        message.length >= 0 && (
                                                        message.map((msj, j)=>{
                                                            return (
                                                                <div key={`mensaje${index}-var${j}`}>
                                                                    <motion.div className={styles.txtareaCont}
                                                                            initial={{ opacity: 0, y : 50 }}
                                                                            animate={{ opacity: 1, y : 0 }}
                                                                            key={`campo${index}-${j}`}>
                                                                        <img src="/var_linea.svg" alt="" className={styles.svgBranch} />

                                                                        <EditableParagraph
                                                                            msj={msj}
                                                                            index={index}
                                                                            j={j}
                                                                            pMessages={pMessages}
                                                                            setPMessages={setPMessages}
                                                                            content={content}
                                                                            setContent={setContent}
                                                                            range={range}
                                                                            setRange={setRange}
                                                                            handleBlur={handleBlur}
                                                                            setTestNext={setTestNext}
                                                                        />

                                                                    </motion.div>
                                                                        <img src="/close.svg" width={"12px"} onClick={()=>{

                                                                            let newMessages = [...pMessages];
                                                                            const thisArr = newMessages[index]
                                                                            thisArr.splice(j, 1);

                                                                            if (thisArr.length == 0) { newMessages.splice(index, 1); }
                                                                                    
                                                                            setPMessages(newMessages);
                                                                        }} className={styles.deleteVariacion} />


                                                                        
                                                                        <img
                                                                            className={styles.emojiIcon}
                                                                            src="./emoji-smile.svg"
                                                                            onClick={() => setShowPicker([index, j])}
                                                                        />

                                                                        {(j == showPicker[1] && index == showPicker[0])  && (
                                                                            <div className={styles.pickerCont} ref={emojiCont}>
                                                                                <Picker onEmojiClick={onEmojiClick} />

                                                                            </div>
                                                                        )}
                                                                        { pMessages[index][0] != "" && 
                                                                            <img className={styles.newVaracion} onClick={()=>{
                                                                                const newArray = [...pMessages];
                                                                                newArray[index] = [...message, ``];
                                                                                setPMessages(newArray);
                                                                            }} title='Agregar variacion'
                                                                            src="./fork.png"   />                                                                        
                                                                        }

                                                                </div>
                                                            )
                                                        } )
                                                        )
                                                    }



                                                </div>
                                            

                                                </motion.div>

                                               
                                        </>
                                        </div>
                                    )
                                })
                            }
                            <div>
                            </div>
                        </div>
                        <div className={`${styles.agregarMultiMensaje} ${messages.length > 4 && styles.noMoreMsjs}`} onClick={()=> {
                                if (isPaid) {
                                    if (messages.length < 5) { setPMessages([...pMessages, [""]]) }
                                }else{
                                    setNotification({
                                        status: STATUS.ALERT,
                                        render: true,
                                        message: 'Para agregar más mensajes debes tener una cuenta premium. Leer mas?',
                                        modalReturn: (val) => {
                                            if (val) { setModalPro(true)  }
                                            setNotification({...notification, render : false})
                                        }
                                    })
                                }
                        }}>
                            <img src="/close.svg" />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MultiMessages;
