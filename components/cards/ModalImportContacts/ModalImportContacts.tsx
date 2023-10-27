import { faCloudArrowUp, faFileCircleCheck, faFileCsv, faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Papa from "papaparse";
import { useCallback, useEffect, useState } from "react";
import { FILE, FILE_TYPE, STATUS } from '../../../enums';
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
      skipEmptyLines: true,
      transformHeader: (header: string) => header.toLowerCase().replaceAll('ú', 'u'),
      complete: ({ data }: { data: Array<{ numero: string, nombre: string }> }) => {
        if (data?.length > 0 && data[0].nombre && data[0].numero) {
          setIsFile(true)
          setParsedCsvData(data.filter(d => d.nombre?.replaceAll(' ', '') !== '' && d.numero?.replaceAll(' ', '') !== ''))
        } else {
          setNotification({
            status: STATUS.ERROR,
            render: true,
            message: 'El contenido del archivo es inválido',
            modalReturn: () => setNotification({ ...notification, render: false })
          })
        }
      },
    });
  };

  const onDropFn = useCallback((file: File) => {

    console.log(file)

    if (file.type === FILE_TYPE.CSV) {
      parseFile(file);
    } else {
      setNotification({
        status: STATUS.ERROR,
        render: true,
        message: 'El contenido subido no es un archivo válido',
        modalReturn: () => setNotification({ ...notification, render: false })
      })
    }
  }, [parseFile, setIsFile, setNotification]);

  const handleDrop = (file: File, e: React.DragEvent<HTMLDivElement>) => {
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

  console.log(parsedCsvData, inheritFile)

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
            onChange={(e) => (e.target.files && e.target.files.length) && onDropFn(e.target.files[0])}
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
                <p>La primera columna va a ser tomada como "Nombre" y la segunda como "Número".</p>

              </div>
              <div>
                <div className={styles.infoIcon}>
                  <FontAwesomeIcon icon={faFileCircleCheck} />
                </div>
                <p>Puedes ver un ejemplo o descargarlo haciendo clic <b><u><a href={FILE.CONTACTS_CSV} >ACA</a></u></b>.</p>
              </div>
            </div>
            <div className={styles.dropCont}
              onDragOver={e => { e.preventDefault() }}
              onDrop={e => e.dataTransfer.files.length > 0 && handleDrop(e.dataTransfer.files[0], e)}
            >
              <div>
                <label htmlFor="csvInput" />
                <FontAwesomeIcon icon={faCloudArrowUp} />
                <p>Arrastrar archivo</p>
                <button>Elegir archivo</button>
                <input
                  onChange={e => (e.target.files && e.target.files.length > 0) && onDropFn(e.target.files[0])}
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