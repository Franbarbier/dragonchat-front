import Papa from "papaparse";
import { useCallback, useEffect, useState } from "react";
import OrangeBtn from "../../OrangeBtn/OrangeBtn";
import { ContactInfo } from "../CardsContFree";
import ContactRow from "../ContactRow/ContactRow";
import HeaderRow from "../HeaderRow/HeaderRow";
import styles from './ModalImportContacts.module.css';

export interface IModalImportContacts {
    setModalImport : (render: boolean) => void;
    uploadContacts: (contacts: ContactInfo[]) => void;
    inheritFile : File | null;
}



// interface contactosArr extends Array<ContactInfo>{}

const ModalImportContacts: React.FC<IModalImportContacts> = ({ setModalImport, uploadContacts, inheritFile}) => {

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
   
      parseFile(acceptedFiles);
      setIsFile(true)
    
  }, []);

  
  function renameKeys(newArr:Array<any>) {
    for (let index = 0; index < newArr.length; index++) {
      var element = newArr[index];
      element.numero = element["Número"]
      element.nombre = element["Nombre"]
      delete element["Número"] 
      delete element["Nombre"] 
    }
    console.log(newArr)
  }
  
  useEffect(()=>{
    if (inheritFile != null && inheritFile != undefined) {
      onDrop(inheritFile)
      setIsFile(true)

    }
  }, [inheritFile])


  useEffect(() => {
    return () => {
      setParsedCsvData([])
      setIsFile(false)
    };
  }, []);

  const campos = ["Nombre", "Número"]

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
                <span className={styles.infoTxt}>Asegúrate que la primera fila de cada columna sea <span>"Nombre"</span> y "Número". </span>
                <span className={styles.infoTxt}>Este es un <span className={styles.ejPlantilla}>ejemplo de plantilla</span>.
                <img src='/plantilla-ejemplo.jpg' width="200px"/>
                También podes descargarlo haciendo <span className={styles.ejDownload}><a href="/Plantilla DragonChat - Importar contactos.csv" >click acá</a></span>.</span>
              </div>

              <label className={styles.labelFile} htmlFor="csvInput">Agregar .CSV</label>
            </div>
          </>
          }

          <input
              onChange={ (e)=>{ 
                if (e.target.files?.length) {
                    onDrop(e.target.files[0]);
                  } 
                }}
              className={styles.csvInput}
              id="csvInput"
              name="file"
              type="File"
          />
        </div>
      );
}

export default ModalImportContacts;