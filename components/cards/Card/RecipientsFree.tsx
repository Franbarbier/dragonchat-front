import { useState } from 'react';
import OrangeBtn from '../../OrangeBtn/OrangeBtn';
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
    
    // function handleAddContact(e){
    //     e.preventDefault()

    //     console.log(newContact.name)
    //     if (newContact.name != '' && newContact.wpp != '') {
    //         handleNewContact(newContact)
    //         setNewContact({
    //             name: '',
    //             wpp: ''
    //         })
    //     }else{
    //         alert('Ingresar datos del contacto.')
    //     }
    // }
   
    
    function formatList(e, type:string, index:number){

        // if(event.which === 13){}
        let breaks = new RegExp("\n")
        let tabs = new RegExp("\t")
        
        let inputText = e.target.value;

        if (breaks.test(inputText) || tabs.test(inputText)) {

            let prevCells:ContactInfo[] = finalList.slice(0, index)
            
            let rawRows = inputText.split("\n");
            let headersArray = ['nombre','estado', 'numero'];
            let output : ContactInfo[] = [];
            rawRows.forEach((rawRow, idx) => {
                
                let rowObject = {};
                let values = rawRow.split("\t");
                headersArray.forEach((header, idx) => {
                    rowObject[header] = values[idx];
                });
                output.push(rowObject);
                
            });
            // return output;
            var newContacts = prevCells.concat(output);
            
            setContactos(newContacts)
        }else{

            let updateContact = [...finalList]
            updateContact[index][type] = inputText

            if (updateContact[index].nombre === "" && updateContact[index].numero === ""  ) {
                updateContact.splice(index, 1)
            }

            setContactos(updateContact)
        }
         
    };

    function pasarCard() {
        setActiveCard(2)
    }
    





    return (
        <div>

        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>setActiveCard(idCard)}>

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
                        
                    <div className={styles.table_layout}>
  
                        {finalList.length > 20 ?
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
                                            <textarea onInput={ (e)=>{formatList(e, 'nombre', index)} } disabled  />
                                        </div>
                                        <div className={styles.celda_table}>
                                            <textarea onInput={ (e)=>{formatList(e, 'numero', index)} } disabled />
                                        </div>
                                    </div>
                                </div>

                                }
                            
                            </>
                            
                            
                        ))
                        } 
                    </div>
                    <div className={styles.footerBtns}>
                        <div>
                            <button>Importar CSV</button>
                        </div>
                        <div>
                            <OrangeBtn text="Redactar mensaje" onClick={()=> {pasarCard()} } />
                        </div>
                    </div>
                    
                {/* </div> */}

            </div>
        </div>
                
                
            </div>
        
    
    );
}

export default FreeCard1;