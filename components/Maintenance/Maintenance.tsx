
import styles from './Maintenance.module.css';


const Maintenance: React.FC = ({ }) => {

    
   
    return (
        <div className={styles.maintCont}>
            <img src="dragonchat_dragon_tecnico.webp" />
            <div>
                <p>¡Hey, estamos en mantenimiento!</p>
                <p>Pero dentro de muy poco estamos de nuevo funcionando</p>
                <br/>
                <p>Regresa dentro de un rato para continuar contactando y dominando tu mercado.</p>
            </div>
        </div>
    );
}

export default Maintenance;