import { useEffect, useRef, useState } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import { ContactInfo } from '../CardsContFree';
import CardTitle from '../CardTitle/CardTitle';
import HeaderRow from '../HeaderRow/HeaderRow';
import styles from './FreeCard.module.css';

interface IModalImport {
    modalImport : boolean;
}

export interface IFreeCard1 {
    sampleTextProp : string;
    setActiveCard: (id: number) => void;
    setContactos : (contactos: ContactInfo[]) => void;
    activeCard : number;
    contactos : ContactInfo[];
    handleNewContact: (newContact: ContactInfo) => void;
    handleDeleteContact : (contact: ContactInfo) => void;
    handleRenderModal : (render: boolean) => void;
    finalList : ContactInfo[]
}

// type setPropsType = {

const allowedExtensions = ["csv"];


const FreeCard1: React.FC<IFreeCard1> = ({ setActiveCard, activeCard, setContactos, contactos, handleNewContact, handleDeleteContact, handleRenderModal, finalList }) => {


    let idCard = 1;

    const grillaFondo = useRef(null);
    const [height, setHeight] = useState(0);

    // useEffect(() => {
    //     if (grillaFondo.current) {
    //     setHeight(grillaFondo.current);
    //     }
    // }, [grillaFondo]);

    useEffect(() => {
        if (grillaFondo.current) {
            // console.log(grillaFondo.current.clientHeight)
            
        }
    }, []);


    const [newContact, setNewContact] = useState<ContactInfo>({
        nombre: '',
        numero : ''
    })
  
    const regex = new RegExp(/[^\d]/g);
    
    
    function formatList(e, type:string, index:number){

        // if(event.which === 13){}
        let breaks = new RegExp("\n")
        let tabs = new RegExp("\t")
        
        let inputText = e.target.value;

        let prevCells:ContactInfo[] = finalList.slice(0, index)

        var headersArray = ['nombre','estado', 'numero'];
       
        if (!breaks.test(inputText) && !tabs.test(inputText)) {
            let updateContact = [...finalList]
            updateContact[index][type] = inputText

            if (updateContact[index].nombre === "" && updateContact[index].numero === ""  ) {
                updateContact.splice(index, 1)
            }

            setContactos(updateContact)
            
        }else if(breaks.test(inputText) && tabs.test(inputText )){
            
            let rawRows = inputText.split("\n");

            let output : ContactInfo[] = [];
            console.log(rawRows)
            rawRows.forEach((rawRow, idx) => {

                let rowObject: any = {};
                let values = rawRow.split("\t");

                if (values[0] != "") {
                    rowObject['nombre'] = values[0];   
                }
                if (values[1] != "") {
                    rowObject['numero'] = values[1];
                }
                
                output.push(rowObject);
                
            });
       
            var newContacts = prevCells.concat(output);
            setContactos(newContacts)
            

        }else if(breaks.test(inputText)){

            let rawRows = inputText.split("\n");
            console.log(rawRows)

            let output : ContactInfo[] = [];

            var newList = [...finalList]
            newList = newList.slice(prevCells.length)
            
            rawRows.map((rawRow, index) => {
                
                let rowObject: any = {};

                console.log(rawRow)
                if(newList[index]){
                    if (type == "numero") {                       
                        rowObject['numero'] = rawRow;
                        rowObject['nombre'] = newList[index].nombre;
                    }
                    if (type == "nombre") {
                        rowObject['numero'] = newList[index].numero;  
                        rowObject['nombre'] = rawRow;  
                    }
                }else{
                    if (type == "numero") {
                        rowObject['numero'] = rawRow;
                        rowObject['nombre'] = '';
                    }
                    if (type == "nombre") {
                        rowObject['numero'] = '';  
                        rowObject['nombre'] = rawRow;  
                    }
                }               
                output.push(rowObject);
            });

            var newContacts = prevCells.concat(output);
            console.log(newContacts)
            setContactos(newContacts)
            

        }else if(tabs.test(inputText )){

            let rawCols = inputText.split("\t");
            console.log(rawCols)

            let output : ContactInfo[] = [];

            let rowObject: any = {};

            rowObject['nombre'] = rawCols[0];
            rowObject['numero'] = rawCols[1];

            output.push(rowObject);

            var newContacts = prevCells.concat(output);
            setContactos(newContacts)
        }

    };


    // select rows
    function setSelection(index){
        let selectedList = [...contactos]
        if (!selectedList[index].selected) {
            selectedList[index].selected = true
        }else{
            selectedList[index].selected = false
        }
        console.log(selectedList[index].selected)
        setContactos(selectedList)
    }





    // menu right clic

    
    

    return (

        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>{}}>

            <img src="/trama-car.svg" className={`${styles.tramaBottom} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaLeft} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaRight} ${styles.tramas}`} />

            <div className={styles.card_container} >
                <div>
                    <CardTitle text={`${finalList.length - 1} Destinatarios`} />

                </div>
                {/* <div className={styles.card_table_cont}> */}
                    
                    <div style={{'margin': 'auto', 'width': '88%'}}>
                     <HeaderRow campos={["NOMBRE", "NUMERO"]} />
                    </div>
                    <span className={styles.list_counter}>{finalList.length - 1}</span>
                        
                    <div className={styles.table_layout}>
                        
                    <div className={styles.grilla_oficial}>
                        {finalList.map((elementInArray, index) => ( 
                                <div className={styles.row_table}>
                                    <div>
                                    { finalList.length - 1 !=  index ?
                                        <aside onClick={ ()=>{ setSelection(index) } } className={ `${elementInArray.selected && styles.rowSelected}`  }>
                                            <div>
                                                <></>
                                            </div>
                                        </aside>
                                        :
                                        <div></div>
                                    }
                                    <div className={styles.celda_table}>
                                        <textarea rows={1} onInput={ (e)=>{formatList(e, 'nombre', index)} } value={elementInArray.nombre} />
                                    </div>
                                    <div className={styles.celda_table}>
                                        <textarea rows={1} onInput={ (e)=>{formatList(e, 'numero', index)} } value={elementInArray.numero} />
                                    </div>
                                    { finalList.length - 1 !=  index ? <img src="/delete.svg" onClick={ ()=>{ setContactos( finalList.filter( ele => ele != elementInArray ) ) } } /> : <div></div>}
                                </div>
                                </div>
                            ))
                        }
                        
                    </div>
                    <div className={styles.grilla_fondo} ref={grillaFondo}>
                        {[...Array(finalList.length + 15)].map((elementInArray, index) => (
                                <div className={styles.row_table} >
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
                    
                {/* </div> */}

            </div>
        </div>
    
    );
}

export default FreeCard1;