import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import styles from './SuscriptionExpired.module.css';



const SuscriptionExpired: React.FC<{}> = ({ }) => {
   


    return (
        <div className={styles.suscriptionExpiredCont}>
           <div>
                <div>
                    <div className={styles.planesCont}>
                        <h5>Plan Mensual</h5>
                        <p>pagas cada mes</p>
                        <h4><span>$</span>16<span>99</span></h4>
                        <p>por mes</p>
                    </div>
                    <div className={styles.planesCont}>
                        <h5>Plan Anual</h5>
                        <p>pagas una vez por año</p>
                        <h4><span>$</span>9<span>99</span></h4>
                        <p>por mes final</p>
                    </div>
                </div>
                <div className={styles.infoCont}>
                    <h3>Continúa en la vanguardia de la mensajería</h3>
                    <ul>
                        <li><img src="cierto.png"/>Importar contactos .csv.</li>
                        <li><img src="cierto.png"/>Sistema antiblocker.</li>
                        <li><img src="cierto.png"/>Entregabilidad del 100%.</li>
                        <li><img src="cierto.png"/>Mensajes ilimitados.</li>
                        <li style={{"opacity":"0.7"}}><img src="cierto.png"/>Adjuntar archivos en los envíos. (próximamente)</li>
                        <li style={{"color":"#b5b5b5"}}><img src="cierto.png"/>Enviar archivos. (próximamente)</li>
                        <li style={{"color":"#b5b5b5"}}><img src="cierto.png"/>Creador de Secuencias. (próximamente)</li>
                        <li style={{"color":"#b5b5b5"}}><img src="cierto.png"/>Base de Contactos. (próximamente)</li>
                        <li style={{"color":"#b5b5b5"}}><img src="cierto.png"/>Métricas y CRM. (próximamente)</li>
                    </ul>

                    <CustomColorBtn
                        type="submit"
                        text="Continuar con la versión 2.0"
                        backgroundColorInit="#c21c3b"
                        backgroundColorEnd="#f9bd4f"
                        borderColor="#e17846"
                        onClick={()=>{ window.location.href = '/checkout' }}
                    />
                    <CustomColorBtn
                        type="submit"
                        text="Volver al plan 1.0"
                        backgroundColorInit="#13013780"
                        backgroundColorEnd="#13013780"
                        borderColor="var(--newViolet)"
                        onClick={()=>{  }}
                    />
                </div>
           </div>
        
        </div>
    );
}

export default SuscriptionExpired;

