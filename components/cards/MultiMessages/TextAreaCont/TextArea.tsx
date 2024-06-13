import { motion } from 'framer-motion';


import styles from '../MultiMessages.module.css';


import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from 'react';
import { STATUS } from '../../../../enums';
import { INotification } from '../../../Notification/Notification';

export interface ITextAreaCont {
    index: number;
    j : number;
    msj : string | File;
    setTestMsj : (val: any) => void;
    showPicker : number[];
    setShowPicker : (val: [number, number]) => void;
    testMsj : any;
    message : string[];
    setNotification : (val: INotification) => void;
    notification : INotification;

}


const TextAreaCont: React.FC<ITextAreaCont> = ({ index, j, msj, setTestMsj, testMsj, message, setNotification, notification }) => {
   

    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [hasFile, setHasFile] = useState<File | null>(typeof msj === "string" ? null : msj);
    const [fileAttached, setFileAttached] = useState<File | null>(null);


    const emojiCont = useRef(null);
    const addFileBtn = useRef(null);


    const onEmojiClick = (event) => {
        
        let newMessages = [...testMsj];
        newMessages[index][j] = newMessages[index][j] + event.emoji;     
        setTestMsj(newMessages);
        setShowPicker(false);
    };


    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiCont.current && !(emojiCont.current as Element).contains(event.target as Node)) {
                setShowPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [emojiCont]);



    const handleFakeClick = (e) => {
        if (testMsj[index].length > 1) {
          e.target.click();
        }
      };

      const handleClick = (e) => {

        const originalEvent = e;
        
        if (testMsj[index].length > 1) {
            e.preventDefault();
            setNotification({
                status: STATUS.ALERT,
                render: true,
                message: 'No se pueden adjuntar más de un archivo por mensaje. ¿Desea eliminar las variaciones de este mensaje?',
                modalReturn: (val) => {
                    if (val) { 
                        let newMessages = [...testMsj];
                        newMessages[index] = [""];
                        setTestMsj(newMessages);
                        setTimeout(() => {
                            originalEvent.target.click();
                        }, 10);
                    }
                    setNotification({...notification, render : false})
                }
            })
        } 
      };

      
    
    return (<div key={`keyItem-${index}-${j}`}>
                <motion.div className={styles.txtareaCont}
                        initial={{ opacity: 0, y : 50 }}
                        animate={{ opacity: 1, y : 0 }}>

                    <img src="/var_linea.svg" alt="" className={styles.svgBranch} />

                    
                    <textarea placeholder={`Mensaje #${index+1} - Variacion #${j + 1}`}
                        value={typeof msj === "string" ? msj : msj?.name}
                        onChange={(e) => {
                            let newMessages = [...testMsj];
                            const thisArr = newMessages[index];
                            thisArr[j] = e.target.value;
                            newMessages[index] = thisArr;
                            setTestMsj(newMessages);
                        }}
                        rows={1}
                    />
                    
                    <div className={`${styles.emojiIcon} ${styles.icons}`}>
                        <img
                            src="./sonriente.png"
                            onClick={() => setShowPicker(true)}
                        />
                    </div>


                    {showPicker  && (
                        <div className={styles.pickerCont} ref={emojiCont}>
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                
                    { j === 0  && (
                        <>
                            <label className={`${styles.attachFileIcon} ${styles.icons}`} htmlFor={`attach${index}${j}`}>
                            <img
                                src="./clips-de-papel.png"
                                />
                            <input
                                hidden
                                type="file"
                                id={`attach${index}${j}`}
                                ref={addFileBtn}
                                onClick={(e) => { handleClick(e) }}
                                onMouseDown={handleFakeClick}
                                onChange={(e) => {
                                    const filename = e.target.files ? e.target.files[0] : null;
                                    setHasFile(filename);
                                    let newMessages = [...testMsj];
                                    newMessages[index][j] =  e.target.files ? e.target.files[0] : null;
                                    setTestMsj(newMessages);
                                }}
                                />
                        </label>

                        { testMsj[index][0] != "" &&
                            <div  className={`${styles.newVaracion} ${styles.icons}`} >

                                <img onClick={()=>{
                                    const newArray = [...testMsj];
                                    newArray[index] = [...message, ``];
                                    setTestMsj(newArray);
                                }} title='Agregar variacion'
                                src="./fork.png"   />                                                                        
                            </div>
                        }
                        </>
                    )}

                    

                    
                    {hasFile && 
                            <div className={styles.fileName}>
                                <img src="/clips-de-papel.png" width={"12px"} />
                                <span>{hasFile.name}</span>
                                <p
                                    onClick={() => {
                                        setHasFile(null);
                                        let newMessages = [...testMsj];
                                        newMessages[index][j] = '';
                                        setTestMsj(newMessages);
                                    }}
                                >Tt</p>
                            
                            </div>
                    }
                    

                    <img src="/close.svg" width={"12px"} onClick={()=>{

                        let newMessages = [...testMsj];
                        const thisArr = newMessages[index]
                        thisArr.splice(j, 1);

                        if (thisArr.length == 0) { newMessages.splice(index, 1); }
                        setFileAttached(null)
                        setHasFile(null)
                        setTestMsj(newMessages);
                        }} className={`${styles.deleteVariacion} ${styles.icons}`}
                    />
                </motion.div>

        </div>
        )
}


export default TextAreaCont;
