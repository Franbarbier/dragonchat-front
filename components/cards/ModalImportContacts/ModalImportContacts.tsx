import { faCloudArrowUp, faFileCircleCheck, faFileCsv, faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Papa from "papaparse";
import { useCallback, useEffect, useState } from "react";
import { INotification } from '../../Notification/Notification';
import OrangeBtn from "../../OrangeBtn/OrangeBtn";
import { ContactInfo } from "../CardsContFree";
import CardTitle from "../CardTitle/CardTitle";
import ContactRow from "../ContactRow/ContactRow";
import HeaderRow from "../HeaderRow/HeaderRow";
import styles from './ModalImportContacts.module.css';

export interface IModalImportContacts {
  setModalImport: (render: boolean) => void;
  uploadContacts: (contacts: ContactInfo[]) => void;
  inheritFile: File | null;
  notification: INotification;
  setNotification: (notification: INotification) => void;
};

const ModalImportContacts: React.FC<IModalImportContacts> = ({ setModalImport, uploadContacts, inheritFile, notification, setNotification }) => {
  const [parsedCsvData, setParsedCsvData] = useState<Array<{ numero: string, nombre: string }>>([]);
  const [isFile, setIsFile] = useState<boolean>(false);
  

  const parseFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      transformHeader: (header: string) => header.replaceAll('N', 'n').replaceAll('ú', 'u'),
      complete: ({ data }: { data: Array<{ numero: string, nombre: string }> }) => {
        if (data?.length > 0 && data[0].nombre && data[0].numero) {
          setIsFile(true)
          setParsedCsvData(data)
        } else {
          setNotification({
            status: "error",
            render: true,
            message: 'El contenido del archivo es inválido',
            modalReturn: () => setNotification({ ...notification, render: false })
          })
        }
      },
    });
  };
  

  const onDropFn = useCallback((file: File) => {
    if (file.type === 'text/csv') {
      parseFile(file);
    } else {
      setNotification({
        status: "error",
        render: true,
        message: 'El contenido subido no es un archivo válido',
        modalReturn: () => setNotification({ ...notification, render: false })
      })
    }
  }, [parseFile, setIsFile, setNotification]);

  const handleDrop = (file: File, e: Event) => {
    e.preventDefault();
    onDropFn(file);
  };

  useEffect(() => {
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
        {parsedCsvData.map((contact) => (
          <>
            <ContactRow contact={contact} campos={campos} />
          </>
        ))
        }
      </div>

      {isFile ?
        <div className={styles.saveOrEdit}>
          <label className={styles.labelFile} htmlFor="csvInput">Cambiar .CSV</label>
          <input
            onChange={(e) => {
              if (e.target.files?.length) {
                onDropFn(e.target.files[0]);
              }
            }}

            className={styles.csvInput}
            id="csvInput"
            name="file"
            type="File"
          />
          <OrangeBtn text="Subir contactos" onClick={() => {
            uploadContacts(parsedCsvData)
            setModalImport(false)
          }} />
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
                <p>Puedes ver un ejemplo o descargarlo haciendo clic <a href="/Plantilla Ejemplo.numbers" >acá</a>.</p>
              </div>
            </div>
            <div className={styles.dropCont}
              onDragOver={e => { e.preventDefault() }}
              onDrop={e => e.dataTransfer.files && e.dataTransfer.files.length > 0 && handleDrop(e.dataTransfer.files[0], e)}
            >
              <div>
                <label htmlFor="csvInput" />
                <FontAwesomeIcon icon={faCloudArrowUp} />
                <p>Arrastrar archivo</p>
                <button>Elegir archivo</button>
                <input
                  onChange={e => e.target.files && e.target.files.length > 0 && onDropFn(e.target.files[0])}
                  className={styles.csvInput}
                  id="csvInput"
                  name="file"
                  type="File"
                />
              </div>
            </div>
          </div>
        </>
      }
    </div >
  );
}

export default ModalImportContacts;