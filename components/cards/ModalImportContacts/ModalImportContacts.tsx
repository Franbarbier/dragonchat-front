import { faCloudArrowUp, faFileCircleCheck, faFileCsv, faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Papa from "papaparse";
import { useCallback, useEffect, useState } from "react";
import OrangeBtn from "../../OrangeBtn/OrangeBtn";
import { ContactInfo } from "../CardsContFree";
import CardTitle from "../CardTitle/CardTitle";
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

  const onDropFn = useCallback(acceptedFiles => {
        parseFile(acceptedFiles);
      setIsFile(true)
  }, []);

  
  function renameKeys(newArr:Array<any>) {

    function getAllKeys(obj) {
      return Object.keys(obj);
    }
    
    for (let index = 0; index < newArr.length; index++) {
      var element = newArr[index];

      element.numero = element[getAllKeys(element)[1]]
      element.nombre = element[getAllKeys(element)[0]]
      delete element["Número"] 
      delete element["Nombre"] 
    }
  }
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
      setIsFile(true)
      parseFile(droppedFile);
  };
  
  useEffect(()=>{
    if (inheritFile != null && inheritFile != undefined) {
      onDropFn(inheritFile)
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
              <input
                        onChange={ (e)=>{ 
                          if (e.target.files?.length) {
                            onDropFn(e.target.files[0]);
                          } 
                        }}
                        
                        className={styles.csvInput}
                        id="csvInput"
                        name="file"
                        type="File"
                        />
              <OrangeBtn text="Subir contactos" onClick={()=>{
                                                            uploadContacts(parsedCsvData)
                                                            setModalImport(false)
                                                          }}/>
            </div>
          :
          <>
            <div className={styles.infoCsv}>
              <div className={styles.infoTitle}>
                {/* <h5>Importar contactos</h5> */}
                <CardTitle text="Importar contactos" />
              </div>
              <div className={styles.infoData}>
                <div>
                  <div className={styles.infoIcon}>
                    <FontAwesomeIcon icon={faFileCsv} />
                  </div>
                  <p>El archivo debe ser .csv</p>
                </div>
                <div>
                  <div className={styles.infoIcon}>
                    <FontAwesomeIcon icon={faTableColumns} />
                  </div>
                  <p>La primer columna va a ser tomada como "Nombre" y la segunda como "Número".</p>

                </div>
                <div>
                  <div className={styles.infoIcon}>
                    <FontAwesomeIcon icon={faFileCircleCheck} />
                  </div>
                  <p>Puedes ver un ejemplo o descargarlo haciendo clic <a href="/Plantilla DragonChat - Importar contactos.csv" >acá</a>.</p>
                </div>
              </div>
              <div className={styles.dropCont}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div>
                  {/* <div> */}
                    <label htmlFor="csvInput" />
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    <p>Arrastrar archivo</p>
                    <button>Elegir archivo</button>
                    <input
                        onChange={ (e)=>{ 
                          if (e.target.files?.length) {
                            onDropFn(e.target.files[0]);
                          } 
                        }}
                        
                        className={styles.csvInput}
                        id="csvInput"
                        name="file"
                        type="File"
                        />
                      </div>
                {/* </div> */}
              </div>

                {/* <img src='/plantilla-ejemplo.jpg' width="200px"/> */}

              {/* <label className={styles.labelFile} htmlFor="csvInput">Agregar .CSV</label> */}
            </div>
          </>
          }

        </div>
      );
}

export default ModalImportContacts;