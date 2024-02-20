import CustomColorBtn from "../../CustomColorBtn/CustomColorBtn";
import CardTitle from "../CardTitle/CardTitle";
import { ContactInfo } from "../CardsContFree";
import styles from './ModalFinish.module.css';

export interface IModalFinish {
   blackList: ContactInfo[];
   nuevaDifusion : ()=> void
}



const ModalFinish: React.FC<IModalFinish> = ({ blackList, nuevaDifusion }) => {


function downloadCSV(data, filename) {


  const modifiedData = data.map(({ estado, ...rest }) => rest);

  const headerRow = 'nombre,numero';

  // Convert array of objects to a CSV string
  const csv = modifiedData.map((row) => Object.values(row).join(',')).join('\n');

  // Combine the header row and the CSV data
  const csvWheader = `${headerRow}\n${csv}`;

  // Create a Blob from the CSV string
  const blob = new Blob([csvWheader], { type: 'text/csv' });
  
  // Create a download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  
  // Trigger the download link
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}



return (
        <div className={styles.modal_finish}>

          <div>
            <CardTitle text={`Envio finalizado`} />
            <div>
                
                {blackList?.length > 0 ?
                <>
                  <p>Hubo {blackList?.length} mensajes que no se pudieron enviar. Puede ser porque la linea ingresada no existe o debido al % de Entregabilidad de tu plan actual.</p>
                  <p>Podes descargar una lista de los contactos a los que no se le pudo entregar correctamente el mensaje</p>
                  <CustomColorBtn
                    type="submit"
                    text="Descargar lista"
                    backgroundColorInit="rgba(0,0,0,0.3)"
                    backgroundColorEnd="rgba(0,0,0,0.3)"
                    borderColor="var(--newViolet)"
                    // disable={true}
                    onClick={()=>{ downloadCSV(blackList, 'no-enviados.csv'); }}
                  />
                </>
              :
              
              <h3>Se enviaron todos los mensajes correctamente!</h3>
              }
                
                <div>
                    <CustomColorBtn
                        type="submit"
                        text="Crear nueva difusion"
                        backgroundColorInit="#c21c3b"
                        backgroundColorEnd="#f9bd4f"
                        borderColor="#e17846"
                        onClick={()=>{
                          nuevaDifusion()
                        }}
                    />
                </div>

            </div>
          </div>
        </div>
      );
}

export default ModalFinish;