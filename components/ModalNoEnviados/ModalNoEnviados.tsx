import CardTitle from "../cards/CardTitle/CardTitle";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import styles from './ModalNoEnviados.module.css';

export interface IModalNoEnviados {
   
}



const ModalNoEnviados: React.FC<IModalNoEnviados> = ({ }) => {

return (
        <div className={styles.modal_no_enviados}>

          <div>
            <CardTitle text="X MENSAJES NO SE ENVIARON" />
            <div>
                <p>Hubo X mensajes que no se pudieron enviar. Puede ser porque la linea ingresada no existe o debido al % de Entregabilidad de tu plan actual.</p>
                <p>Podes pasarte a <u>DragonChat PRO</u> con servidores de mejor performance para aumentar la entregabilidad al 100%</p>

                <h5>Descarga la lista de contactos a los que no les llego su mensaje!</h5>
                <div>
                    <CustomColorBtn
                        type="submit"
                        text="Descargar"
                        backgroundColorInit="#c21c3b"
                        backgroundColorEnd="#f9bd4f"
                        borderColor="#e17846"
                        onClick={()=>{ window.location.href = "/" }}
                    />
                </div>
            </div>
          </div>
        </div>
      );
}

export default ModalNoEnviados;