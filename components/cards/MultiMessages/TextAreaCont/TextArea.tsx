import { motion } from 'framer-motion';


import styles from '../MultiMessages.module.css';


import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from 'react';
import { STATUS } from '../../../../enums';
import CustomColorBtn from '../../../CustomColorBtn/CustomColorBtn';
import { INotification } from '../../../Notification/Notification';
import { Imessages } from '../../CardsContFree';

export interface ITextAreaCont {
    index: number;
    j : number;
    msj : string;
    setTestMsj : (val: Imessages) => void;
    showPicker : number[];
    setShowPicker : (val: [number, number]) => void;
    testMsj : Imessages;
    message : string[];
    setNotification : (val: INotification) => void;
    notification : INotification;
    setFilesSelected : (val: File[]) => void;
    filesSelected : File[];
    isPaid : boolean;
    setModalPro : (val: boolean) => void;
}


const TextAreaCont: React.FC<ITextAreaCont> = ({ index, j, msj, setTestMsj, testMsj, message, setNotification, notification, setFilesSelected, filesSelected, isPaid, setModalPro }) => {
   

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

        // if (!isPaid) {
        //     setModalPro(true);
        //     e.preventDefault();
        //     return false;
        // }

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

    const fileChange = (e) => {
            const filename = e.target.files ? e.target.files[0] : null;
            setHasFile(filename);

            const base64FileName = btoa(e.target.files[0].name)
            const formattedFileName = `[file] ${base64FileName}`;
            
            
            let newMessages = [...testMsj];
            let fileName = formattedFileName
            newMessages[index][j] =  fileName;
            setTestMsj(newMessages);

            let newfiles = [...filesSelected];
            newfiles.push(e.target.files[0]);
            setFilesSelected(newfiles);
        
            console.log(newMessages[index][j])
            console.log(e.target.files[0])
    }

    const deleteMessage = (index, j) => {
        let newMessages = [...testMsj];
        const thisArr = newMessages[index]
        
        // remove object that has the prop "name" that match the file name
        let newfiles = [...filesSelected];
        const fileInd = newfiles.findIndex((file) => file.name === fileDecode( thisArr[j]));

        if (fileInd !== -1) {
            newfiles.splice(fileInd, 1);
        }
        setFilesSelected(newfiles);

        thisArr.splice(j, 1);


        if (thisArr.length == 0) { newMessages.splice(index, 1); }
        setFileAttached(null)
        setHasFile(null)
        setTestMsj(newMessages);
    }

    const fileDecode = (fileNombre) => {

        if (fileNombre.startsWith("[file] ")) {
            try {
                let fileNameDec = fileNombre.replace("[file] ", "");
                return  atob(fileNameDec);
              } catch (e) {
                return fileNombre;
              }
        }else{
            return fileNombre;
        }        

    }



    return (<div key={`keyItem-${index}-${j}`}>

        { (!isPaid && index > 0) ?
                <>
                    <div>
                        <div className={`${styles.txtareaCont} ${styles.blockMulti}`}>
                            <textarea />
                            <div>
                                <img src="/bloqueo-alternativo.png" width={'24px'}/>
                                <p>Pasate a 2.0 para desbloquear los multi mensajes</p>
                                <div>

                                    <CustomColorBtn
                                        text="Pasar a 2.0"
                                        backgroundColorInit={ "#c21c3b" }
                                        backgroundColorEnd={ "#f9bd4f" }
                                        borderColor={ "#e17846"}
                                        onClick={()=>{ setModalPro(true) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                

                :
                <motion.div className={styles.txtareaCont}
                        initial={{ opacity: 0, y : 50 }}
                        animate={{ opacity: 1, y : 0 }}>

                    <img src="/var_linea.svg" alt="" className={styles.svgBranch} />
                    
                    <textarea placeholder={`Mensaje #${index+1} - Variacion #${j + 1}`}
                        value={fileDecode(msj)}
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
                            title='Insertar emoji'
                        />
                    </div>


                    {showPicker  && (
                        <div className={styles.pickerCont} ref={emojiCont}>
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                    { testMsj[index][0] != "" &&
                        <div  className={`${styles.newVaracion} ${styles.icons}`} 
                            onClick={()=>{
                                const newArray = [...testMsj];
                                newArray[index] = [...message, ``];
                                setTestMsj(newArray);
                            }}
                            title='Agregar variacion'
                        >

                            <img src="./fork.png"/>                                                                        
                        </div>

                    }
                
                    {!isPaid && j === 0  && (
                        <>
                            <label className={`${styles.attachFileIcon} ${styles.icons}`} htmlFor={`attach${index}${j}`}>
                            <img
                                src="./clips-de-papel.png"
                                />
                            <input
                                hidden
                                type="file"
                                id={`attach${index}${j}`}
                                title='Adjuntar archivo'
                                ref={addFileBtn}
                                onClick={(e) => { handleClick(e) }}
                                onMouseDown={handleFakeClick}
                                onChange={(e) => { fileChange(e) }}
                                />
                        </label>
                        </>
                    )}


                    

                    {msj.startsWith("[file] ") && 
                            <div className={styles.fileName}>
                                <img src="/clips-de-papel.png" width={"12px"} />
                                <span>{fileDecode(msj)}</span>
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
                    
                    <img src="/close.svg" width={"12px"} onClick={()=>{ deleteMessage(index, j); }} className={`${styles.deleteVariacion} ${styles.icons}`} title='Eliminar mensaje' />


                </motion.div>

}

        </div>
        )
}


export default TextAreaCont;
