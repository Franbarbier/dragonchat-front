import { FILE } from '../../enums';
import styles from './Maintenance.module.css';

const Maintenance: React.FC = ({ }) => (
    <div className={styles.maintCont}>
        <div>

            <img src={FILE.MAINTENANCE} />

            <aside>
                <div>
                    <p>{"¡Hey, estamos en mantenimiento!"}</p>
                    <p>{"Pero dentro de muy poco estamos de nuevo funcionando"}</p>
                    <br />
                    <p>{"Regresa dentro de un rato para continuar contactando y dominando tu mercado."}</p>
                </div>
                <button>LOG OUT</button>
            </aside>
        </div>
    </div>
)

export default Maintenance;
