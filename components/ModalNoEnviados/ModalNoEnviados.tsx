import { ROUTES } from "../../enums";
import { ContactInfo } from "../cards/CardsContFree";
import CardTitle from "../cards/CardTitle/CardTitle";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import styles from './ModalNoEnviados.module.css';

export interface IModalNoEnviados {
   blackList: ContactInfo[];
}



const ModalNoEnviados: React.FC<IModalNoEnviados> = ({ blackList }) => {

return (
        <div className={styles.modal_no_enviados}>

          <div>
            <CardTitle text={`${blackList?.length} MENSAJES NO SE ENVIARON`} />
            <div>
                <p>Hubo {blackList?.length} mensajes que no se pudieron enviar. Puede ser porque la linea ingresada no existe o debido al % de Entregabilidad de tu plan actual.</p>
                <p>Podes pasarte a <u>DragonChat 2.0</u> con servidores de mejor performance para aumentar la entregabilidad al 100%</p>

                <h5>Descarga la lista de contactos a los que no les llego su mensaje!</h5>
                <div>
                    <CustomColorBtn
                        type="submit"
                        text="Descargar"
                        backgroundColorInit="#c21c3b"
                        backgroundColorEnd="#f9bd4f"
                        borderColor="#e17846"
                        onClick={()=>{ window.location.href = ROUTES.DASH }}
                    />
                </div>
            </div>
          </div>
        </div>
      );
}

export default ModalNoEnviados;