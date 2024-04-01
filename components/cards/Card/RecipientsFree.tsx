import { useEffect, useRef, useState } from 'react';
import { STATUS } from '../../../enums';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { INotification } from '../../Notification/Notification';
import CardTitle from '../CardTitle/CardTitle';
import { ContactInfo } from '../CardsContFree';
import HeaderRow from '../HeaderRow/HeaderRow';
import CardStructure from './CardStructure';
import styles from './FreeCard.module.css';
import { executeFormat } from "./recipientsUtils";


export interface IFreeCard1 {
    isPaid : boolean;
    activeCard : number;
    setContactos : (contactos: ContactInfo[]) => void;
    handleRenderModal : (render: boolean) => void;
    finalList : ContactInfo[];
    setDroppedCsv : (droppedCsv: File) => void;
    notification : INotification
    setNotification : (notification: INotification) => void;
    setModalPro : (modalPro: boolean) => void;
}

interface ICustomContextMenu {
    position: { x: number; y: number; index: number, type: string };
    contextVisible: boolean;
    executeFormat : (e, type:string, index:number, finalList:ContactInfo[], {notification, setNotification}) => ContactInfo[];
    setContactos : (contactos: ContactInfo[]) => void;
    finalList : ContactInfo[];
    notification : INotification;
    setNotification : (notification: INotification) => void;
}

const CustomContextMenu: React.FC<ICustomContextMenu> = ({ position, contextVisible, executeFormat, finalList, setContactos, notification, setNotification }) => {


    executeFormat

    function handlerPegar() {
        navigator.clipboard.readText().then(text => { 
            setContactos( executeFormat( text, position.type, position.index, finalList, {notification, setNotification}) )
        }) .catch(err => console.error('Failed to read clipboard contents: ', err));
    }
    function handleEliminar() {
        const filteredArr = [...finalList];
        filteredArr.splice(position.index,1)
        if (filteredArr.length > 1) {
            setContactos(filteredArr)
        }else{
            setContactos([{nombre: '', numero: ''}])
        }
    }
    function handleCopiar() { navigator.clipboard.writeText(finalList[position.index][position.type]); }

    return(
        <>
        {contextVisible &&
            <div 
                style={{
                    position: "absolute",
                    top: `calc(${position.y}px - 10vh)`,
                    left: `calc(${position.x}px - 25vw)`,
                }}
                className={styles.contextMenu} >
            <ul>
                <li onClick={ handleCopiar }><img src="/copy.svg"/><span>Copiar</span></li>
                <li onClick={ handlerPegar }><img src="/paste.svg"/><span>Pegar</span></li>
                <li onClick={ handleEliminar }><img src="/delete_white.svg" /><span>Eliminar</span></li>
            </ul>
        </div>
        }
        </>
    )
}

const FreeCard1: React.FC<IFreeCard1> = ({ isPaid, activeCard, setContactos, handleRenderModal, finalList, setDroppedCsv, notification, setNotification, setModalPro }) => {


    let idCard = 1;

    const grillaFondo = useRef(null);
    
    function formatList(e:any, type:string, index:number, ){
        let inputText = e.target.value;
        if (typeof inputText === "string" && inputText.length >= 0) {
            setContactos(executeFormat(inputText, type, index, finalList, {notification, setNotification}))
        }
    };


    

    // select rows
    function setSelection(event, index){


        let selectedList = [...finalList]

        if (event.shiftKey) {
            // Shift key was pressed
            let lastIndex = -1;
            for (let i = 0; i < selectedList.length; i++) {
                if (selectedList[i].selected) {
                    lastIndex = i;
                }
            }
            // Update selected status based on the last and current index
            for (let i = Math.min(lastIndex, index); i <= Math.max(lastIndex, index); i++) {
                selectedList[i].selected = true;
            }
            // Perform the action for Shift + click
        } else {
           
            // get index of selected item and check the las selected item from the actual selected
            selectedList[index].selected = !selectedList[index].selected
            
        }
        
        setContactos(selectedList)
    }


    // menu right clic
    const [position, setPosition] = useState({ x: 0, y: 0 , index: 0, type : ''});
    const [contextVisible, setContextVisible] = useState(false);

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>, type, index) => {
        event.preventDefault(); // prevent default context menu
        setPosition({ x: event.clientX, y: event.clientY, index, type }); // save mouse position
        setContextVisible(true); // show custom menu
    };

    
    useEffect(() => {
        // hide menu when clicked outside
        const hideMenu = () => {
            setContextVisible(false);
        };
        document.addEventListener("click", hideMenu);
        return () => {
            document.removeEventListener("click", hideMenu);
        };
    }, []);


    // movida del drag n drop
    const [isDragging, setIsDragging] = useState(false);


    const handleDragOver = (event: React.DragEvent<HTMLTableElement>) => {
        event.preventDefault();
        setIsDragging(true);
      };
    
      const handleDragLeave = (event: React.DragEvent<HTMLTableElement>) => {
        event.preventDefault();
        setIsDragging(false);
      };
    
      const handleDrop = async (event: React.DragEvent<HTMLTableElement>) => {
        event.preventDefault();
        setIsDragging(false);

        if ( event.dataTransfer.files[0] != undefined) {

            const file = event.dataTransfer.files[0];

            if (file.type === "text/csv") {
                handleRenderModal(true)
                setDroppedCsv(file)
            }else{
                setNotification({
                    status : STATUS.ERROR,
                    render : true,
                    message : "El archivo debe ser un csv",
                    modalReturn : () => {setNotification({...notification, render : false})}
                })
            }
        }else{
            setNotification({
                status : STATUS.ERROR,
                render : true,
                message : "El archivo debe ser un csv",
                modalReturn : () => {setNotification({...notification, render : false})}
            })
        }
      };

      
    return (

            <CardStructure id_card={idCard} activeCard={activeCard} isPaid={isPaid} setModalPro={setModalPro}>
            <>
            { activeCard == idCard &&
            <>

            <CustomContextMenu position={position} contextVisible={contextVisible} executeFormat={executeFormat} setContactos={setContactos} finalList={finalList} notification={notification} setNotification={setNotification} />
            

            <div className={styles.card_container} >
                <CardTitle text={isPaid ? `${finalList.length - 1} Destinatarios` : "VERSION 1.0"} />

                    <div style={{'margin': 'auto', 'width': '88%'}}>
                     <HeaderRow campos={["NOMBRE", "NUMERO"]} />
                    </div>
                        
                    <div className={`${styles.table_layout}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        
                    <div className={`${styles.grilla_oficial} ${isDragging && styles.draggedIcon }`} >
                        {finalList.map((elementInArray, index) => ( 
                                
                                <div className={`${styles.row_table} ${elementInArray.repeated !== undefined ? (elementInArray.repeated === 1 ? styles.firstRepeated : styles.repeated) : ''}`} key={`recipient${index}`} >

                                    <div key={`row${index}`}>
                                    { finalList.length - 1 !=  index ?
                                        <aside onClick={ (e)=>{ setSelection(e, index) } } className={ `${elementInArray.selected && styles.rowSelected} `  }>
                                            <div>
                                                <></>
                                            </div>
                                        </aside>
                                        :
                                        <div></div>
                                    }
                                    <div className={styles.celda_table} onContextMenu={(e)=>handleContextMenu(e, 'nombre', index)}>
                                        <textarea
                                            rows={1}
                                            onInput={ (e)=>{formatList(e, 'nombre', index)} }
                                            value={elementInArray.nombre}
                                            key={`nombre${index}`}
                                        />
                                    </div>
                                    <div className={styles.celda_table} onContextMenu={(e)=>handleContextMenu(e, 'numero', index)}>
                                        <textarea
                                            rows={1}
                                            onInput={ (e)=>{ formatList(e, 'numero', index) } }
                                            value={elementInArray.numero}
                                            key={`number${index}`}
                                        />
                                    </div>
                                    { finalList.length - 1 !=  index ?
                                    
                                    <img src="/close.svg" onClick={ ()=>{ setContactos( finalList.filter( ele => ele != elementInArray ) ) } } />
                                    
                                    : <div></div>}
                                </div>
                                </div>
                            ))
                        }
                        
                    </div>
                    <div className={styles.grilla_fondo} ref={grillaFondo}>
                        {[...Array(finalList.length + 15)].map((elementInArray, index) => (
                                <div className={`${styles.row_table} ${index > finalList.length-1 && styles.bckgrndCell}`} key={"fakerow"+index}>
                                    <div>
                                    <>
                                    </>
                                    <div className={styles.celda_table}>
                                        <textarea rows={1} onInput={ (e)=>{formatList(e, 'nombre', index)} } value={''} disabled />
                                    </div>
                                    <div className={styles.celda_table}>
                                        <textarea rows={1} onInput={ (e)=>{formatList(e, 'numero', index)} } value={''} disabled />
                                    </div>
                                    </div>
                                </div>
                        ))}
                    </div>
                    
                    {isDragging && <div className={styles.dragging}>Drop file here</div>}
                    
                    </div>
                    <div className={styles.footerBtns}>
                        <div>

                            <div style={{ 'height' : '100%'}}>

                            {finalList.filter(item => item.selected == true ).length > 0 ?

                                <CustomColorBtn
                                    type="submit"
                                    text="Limpiar seleccionados"
                                    backgroundColorInit="#13013780"
                                    backgroundColorEnd="#13013780"
                                    borderColor="var(--newViolet)"
                                    onClick={()=>{ setContactos( finalList.filter(item => item.selected != true )) } }
                                    disable={ activeCard != 1 }
                                />
                                :
                                <CustomColorBtn
                                    type="submit"
                                    text="Limpiar planilla"
                                    backgroundColorInit="#13013780"
                                    backgroundColorEnd="#13013780"
                                    borderColor="var(--newViolet)"
                                    onClick={()=>{ setContactos([{nombre: '', numero: ''}]) } }
                                    disable={ activeCard != 1 }
                                />
                            }
                            </div>
                        </div>
                        <div>
                            <CustomColorBtn
                                type="submit"
                                text="Importar CSV"
                                backgroundColorInit="#724cdf"
                                backgroundColorEnd="#3a94fe"
                                borderColor="#5573f0"
                                onClick={()=>{handleRenderModal(true)}}
                                disable={ activeCard != 1 }
                            />
                        </div>
                    </div>
                    

            </div>
            </>
            }

       </>
        </CardStructure>
    
    );
}

export default FreeCard1;