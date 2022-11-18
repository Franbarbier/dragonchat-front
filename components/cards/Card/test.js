import { useState } from 'react';
import { ContactInfo } from '../CardsContFree';
import styles from './FreeCard.module.css';
import OrangeBtn from './OrangeBtn/OrangeBtn';

export interface IFreeCard1 {
    sampleTextProp : string;
    setActiveCard: (id: number) => void;
    activeCard : number;
    contactos : [ContactInfo];
    handleNewContact: (newContact: ContactInfo) => void;
    handleDeleteContact : (contact: ContactInfo) => void;
}

// type setPropsType = {
//     setActiveCard : React.Dispatch<ReactDOM.SetStateAction>
// }

const FreeCard1: React.FC<IFreeCard1> = ({ setActiveCard, activeCard, contactos, handleNewContact, handleDeleteContact }) => {


    let idCard = 1;

    const [newContact, setNewContact] = useState<ContactInfo>({
        name: '',
        wpp : ''
    })

    const [file, setFile] = useState();
   
    var FileReader = require('filereader');
    const fileReader = new FileReader();

    //  var FileReader = require('filereader')
    // , fileReader = new FileReader()
    // ;


     const handleOnChange = (e) => {
      // console.log(e.target);
       setFile(e.target.files[0]);
      // console.log(e.target.files[0]);


     };
   
     const csvFileToArray = string => {
       var array = string.toString().split(" ")
       console.log(string) 
       // here we are getting the first rows which is our header rows to convert it into keys we are logging it here
        var data = []
        console.log(data);
        for(const r of array){
          console.log(r);
            let row = r.toString().split(",")
            data.push(row)
        }
        console.log(data)
        var heading = data[0]
        // to get the column headers which will act as key
        console.log(heading); 
        var ans_array = []
        console.log(ans_array);
        for(var i=1;i<data.length;i++){
            var row = data[i]
            var obj = {}
            for(var j=0;j<heading.length;j++){
                if(!row[j]){
                    row[j]="NA";
                }
                console.log(row[j].toString())
                obj[heading[j].replaceAll(" ","_")] = row[j].toString().replaceAll(" ","_")
            }
            ans_array.push(obj)
        }
        console.log({ans_array})
     };
   
     const handleOnSubmit = (e) => {
       e.preventDefault();
   
       if (file) {
         fileReader.onload = function (event) {
           const text = event.target.result;
          //  console.log(event);
           console.log(event.target.result);
           csvFileToArray(text);
         };
   
         fileReader.readAsText(file);
       }
     };

    return (
        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>setActiveCard(idCard)}>
            <div className={styles.card_container} >
                <div>
                    <h3 className={styles.card_title}># destinatarios #</h3>
                </div>
                <div className={styles.card_table_cont}>
                    <div className={styles.table_headers}>
                        <div className={styles.column50}>
                            <div>
                                <h6>Número</h6>
                            </div>
                        </div>
                        <div className={styles.column50}>
                            <div>
                                <h6>Apodo</h6>
                            </div>
                        </div>
                    </div>
                    <div className={styles.table_rows}>

                        {contactos.map(contact=>(
                            <div className={styles.row_card}>
                                <div className={styles.column50}>
                                    <div>
                                        <span>+{contact.wpp}</span>
                                    </div>
                                </div>
                                <div className={styles.column50}>
                                    <div>
                                        <span>{contact.name}</span>
                                    </div>
                                </div>
                                <div className={styles.delete_contact}
                                    onClick={()=>{
                                        handleDeleteContact(contact)
                                    }}
                                >❌</div>
                            </div>
                        ))
                        }
                        
                    </div>
                    <div className={styles.options_cont}>
                        <div className={styles.new_contact}>
                            <input placeholder='Número' onChange={(e)=>{
                                setNewContact({...newContact, wpp :  e.target.value})
                                } } value={newContact.wpp}/>
                                
                            <input placeholder='Apodo' onChange={(e)=>{
                                setNewContact({...newContact, name :  e.target.value})
                                } } value={newContact.name}/>
                            <button onClick={ ()=>{
                                if (newContact.name != '' && newContact.wpp != '') {
                                    
                                    handleNewContact(newContact)
                                    setNewContact({
                                        name: '',
                                        wpp: ''
                                    })
                                }else{
                                    alert('Ingresar datos del contacto.')
                                }
                            } } ><span>+</span></button>

                        </div>
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleOnChange}
                        />
                
                        <button
                            onClick={(e) => {
                            handleOnSubmit(e);
                            }}
                        >submited</button>
                        {/* <button className={styles.importBtn}>Importar contactos</button> */}
                        <OrangeBtn text="Importar contacto" />


                    </div>
                </div>
            </div>
        </div>
        
    
    );
}

export default FreeCard1;