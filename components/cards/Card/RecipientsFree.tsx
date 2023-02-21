import { useState } from 'react';
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

            rawRows.map((rawRow) => {

                console.log(rawRow)
                let rowObject: any = {};

                if (type == "nombre" && rawRow != "") {
                    rowObject['nombre'] = rawRow;  
                    rowObject['numero'] = ''
                }
                if (type == "numero" && rawRow != "") {
                    rowObject['nombre'] = "";  
                    rowObject['numero'] = rawRow; 
                }
                
                output.push(rowObject);
            });

            var newContacts = prevCells.concat(output);
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



    return (
        <div>

        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>{}}>

            <img src="/trama-car.svg" className={`${styles.tramaBottom} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaLeft} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaRight} ${styles.tramas}`} />

            <div className={styles.card_container} >
                <div>
                    <CardTitle text={"Destinatarios"} />

                </div>
                {/* <div className={styles.card_table_cont}> */}
                    
                     <HeaderRow campos={["NOMBRE", "NUMERO"]} />
                    <span className={styles.list_counter}>{finalList.length - 1}</span>
                        
                    <div className={styles.table_layout} style={{'width' : finalList.length > 12 ? '102%' : '100%'}}>
                    <div>
                                {finalList.map((elementInArray, index) => ( 
                                    
                                        <div className={styles.row_table}>
                                            <div className={styles.celda_table}>
                                                <textarea onInput={ (e)=>{formatList(e, 'nombre', index)} } value={finalList[index].nombre} />
                                            </div>
                                            <div className={styles.celda_table}>
                                                <textarea onInput={ (e)=>{formatList(e, 'numero', index)} } value={finalList[index].numero} />
                                            </div>
                                        </div>
                                    ))
                                }
                                    
                            </div>
                        {/* {finalList.length > 20 ?
                            <div>
                                {finalList.map((elementInArray, index) => ( 
                                    
                                        <div className={styles.row_table}>
                                            <div className={styles.celda_table}>
                                                <textarea onInput={ (e)=>{formatList(e, 'nombre', index)} } value={finalList[index].nombre} />
                                            </div>
                                            <div className={styles.celda_table}>
                                                <textarea onInput={ (e)=>{formatList(e, 'numero', index)} } value={finalList[index].numero} />
                                            </div>
                                        </div>
                                    ))
                                }
                                    
                            </div>
                        :
                          [...Array(13)].map((elementInArray, index) => (

                            
                            <>
                            {index < finalList.length ?
                                <div>
                                    <div className={styles.row_table}>
                                        <div className={styles.celda_table}>
                                            <textarea onInput={ (e)=>{formatList(e, 'nombre', index)} } value={finalList[index].nombre} />
                                        </div>
                                        <div className={styles.celda_table}>
                                            <textarea onInput={ (e)=>{formatList(e, 'numero', index)} } value={finalList[index].numero} />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className={styles.row_table}>
                                        <div className={styles.celda_table}>
                                            <textarea onInput={ (e)=>{formatList(e, 'nombre', index)} } disabled value='' />
                                        </div>
                                        <div className={styles.celda_table}>
                                            <textarea onInput={ (e)=>{formatList(e, 'numero', index)} } disabled value=''/>
                                        </div>
                                    </div>
                                </div>

                                }
                            
                            </>
                            
                            
                        ))
                        }  */}
                    </div>
                    <div className={styles.footerBtns}>
                        <div>
                            <CustomColorBtn
                                type="submit"
                                text="Importar CSV"
                                backgroundColorInit="#724cdf"
                                backgroundColorEnd="#3a94fe"
                                borderColor="#5573f0"
                                onClick={()=>{handleRenderModal(true)}}
                            />
                        </div>
                        <div>
                            <CustomColorBtn
                                type="submit"
                                text="Redactar mensaje"
                                backgroundColorInit="#c21c3b"
                                backgroundColorEnd="#f9bd4f"
                                borderColor="#e17846"
                                disable={finalList.length < 2 }
                                onClick={()=>{ setActiveCard(2) }}
                            />
                        </div>
                    </div>
                    
                {/* </div> */}

            </div>
        </div>
                
                
            </div>
        
    
    );
}

export default FreeCard1;