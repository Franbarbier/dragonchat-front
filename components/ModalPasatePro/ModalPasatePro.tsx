import CardTitle from "../cards/CardTitle/CardTitle";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import styles from './ModalPasatePro.module.css';

export interface IModalPasatePro {
   
}



const ModalPasatePro: React.FC<IModalPasatePro> = ({ }) => {

return (
        <div className={styles.modal_pro}>

          <div>
            <CardTitle text="PASATE A PRO" />
            <div>
                <p>Pasate a DragonChat PRO para tener:</p>
                <ul>
                    <li><img src="cierto.png"/>Mensajes ilimitados.</li>
                    <li><img src="cierto.png"/>Entregabilidad del 100%.</li>
                    <li style={{"opacity":"0.7"}}><img src="cierto.png"/>Creador de Secuencias. (próximamente)</li>
                    <li style={{"opacity":"0.7"}}><img src="cierto.png"/>Base de Contactos. (próximamente)</li>
                    <li style={{"opacity":"0.7"}}><img src="cierto.png"/>Métricas y CRM. (próximamente)</li>
                </ul>
                <div>
                    <CustomColorBtn
                        type="submit"
                        text="Copiar enlance"
                        backgroundColorInit="#c21c3b"
                        backgroundColorEnd="#f9bd4f"
                        borderColor="#e17846"
                        onClick={()=>{ window.location.href = "/checkout" }}
                    />
                </div>
            </div>
          </div>
        </div>
      );
}

export default ModalPasatePro;