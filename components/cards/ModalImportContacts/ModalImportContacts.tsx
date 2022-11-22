import Papa from "papaparse";
import { useCallback, useEffect, useState } from "react";
import OrangeBtn from "../../OrangeBtn/OrangeBtn";
import { ContactInfo } from "../CardsContFree";
import ContactRow from "../ContactRow/ContactRow";
import HeaderRow from "../HeaderRow/HeaderRow";
import styles from './ModalImportContacts.module.css';

export interface IModalImportContacts {
    setModalImport : (render: boolean) => void;
    uploadContacts: (contacts: ContactInfo[]) => void
}



// interface contactosArr extends Array<ContactInfo>{}

const ModalImportContacts: React.FC<IModalImportContacts> = ({ setModalImport, uploadContacts }) => {

  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [isFile, setIsFile] = useState<boolean>(false);


  const parseFile = file  => {
    Papa.parse(file, {
      header: true,
      complete: results => {
        let newArr = results.data
        
        renameKeys(newArr)
        setParsedCsvData(newArr)
      },
    });
  };
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
      setIsFile(true)
    }
  }, []);

  
  function renameKeys(newArr:Array<any>) {
    for (let index = 0; index < newArr.length; index++) {
      var element = newArr[index];
      element.wpp = element["Número"]
      element.name = element["Nombre"]
      delete element["Número"] 
      delete element["Nombre"] 
    }
    console.log(newArr)
  }
  
  useEffect(()=>{
    console.log(parsedCsvData)
  
      
  }, [parsedCsvData])



  const campos = ["Número", "Apodo"]

return (
        <div>
          <div className={styles.table_cont}>
            {parsedCsvData.length > 0 &&
              <HeaderRow campos={campos} />
            }
            
            {parsedCsvData.map((contact)=>(
              <>
                <ContactRow contact={contact} campos={campos}  />
              </>
            ))

            }
          </div>

          {isFile ?

            <div className={styles.saveOrEdit}>
              <label className={styles.labelFile} htmlFor="csvInput">Cambiar .CSV</label>
              {/* <button className={styles.uploadContacts} for="csvInput">Subir contactos</button> */}
              <OrangeBtn text="Subir contactos" onClick={()=>{
                                                            uploadContacts(parsedCsvData)
                                                            setModalImport(false)
                                                          }}/>
            </div>
          :
          <>
            <div className={styles.infoCsv}>
              <div>
                <span className={styles.infoIcon}>i</span>
                <span className={styles.infoTxt}>Asegúrate que la primera fila de cada columna sea <span>"Número"</span> y "Nombre". </span>
                {/* <br /> */}
                <span className={styles.infoTxt}>Este es un <span className={styles.ejPlantilla}>ejemplo de plantilla</span>.
                <img src='/plantilla-ejemplo.jpg' width="200px"/>
                También podes descargarlo haciendo <span className={styles.ejDownload}><a href="/Plantilla DragonChat - Importar contactos.csv" >click acá</a></span>.</span>
              </div>

              <label className={styles.labelFile} htmlFor="csvInput">Agregar .CSV</label>
            </div>
          </>
          }

          <input
              onChange={ (e)=>{ onDrop(e.target.files) } }
              id="csvInput"
              name="file"
              type="File"
          />
        </div>
      );
}

export default ModalImportContacts;