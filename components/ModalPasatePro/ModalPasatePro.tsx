import { ROUTES } from "../../enums";
import CardTitle from "../cards/CardTitle/CardTitle";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import styles from './ModalPasatePro.module.css';

export interface IModalPasatePro {
   
}



const ModalPasatePro: React.FC<IModalPasatePro> = ({ }) => {

return (
        <div className={styles.modal_pro}>

          <div>
            <CardTitle text="DRAGONCHAT 1.0" />
            <div>
                <ul>
                  <li><img src="cierto.png"/>Importar contactos .csv.</li>
                  <li><img src="cierto.png"/>Sistema antiblocker.</li>
                  <li><img src="cierto.png"/>Entregabilidad del 60%.</li>
                  <li><img src="cierto.png"/>Hasta 50 mensajes diarios.</li>
                </ul>
                <div className={styles.pro_feats}>
                    <h3>DRAGONCHAT 2.0</h3>
                    <ul>
                        <li><img src="cierto.png"/>Importar contactos .csv.</li>
                        <li><img src="cierto.png"/>Sistema antiblocker.</li>
                        <li><img src="cierto.png"/>Entregabilidad del 100%.</li>
                        <li><img src="cierto.png"/>Mensajes ilimitados.</li>
                        <li style={{"opacity":"0.7"}}><img src="cierto.png"/>Creador de Secuencias. (próximamente)</li>
                        <li style={{"opacity":"0.7"}}><img src="cierto.png"/>Base de Contactos. (próximamente)</li>
                        <li style={{"opacity":"0.7"}}><img src="cierto.png"/>Métricas y CRM. (próximamente)</li>
                    </ul>
                <div>
                    <CustomColorBtn
                        type="submit"
                        text="PASAR A DRAGONCHAT 2.0"
                        backgroundColorInit="#c21c3b"
                        backgroundColorEnd="#f9bd4f"
                        borderColor="#e17846"
                        onClick={()=>{ window.location.href = ROUTES.CHECKOUT }}
                        />
                </div>
                </div>
            </div>
          </div>
        </div>
      );
} 

export default ModalPasatePro;