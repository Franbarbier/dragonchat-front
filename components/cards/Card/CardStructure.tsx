import styles from './FreeCard.module.css';

export interface ICardStructure {
    children : React.ReactElement<any, any>;
    id_card : number;
    activeCard : number;
    isPaid : boolean;
    setModalPro : (modalPro: boolean) => void;
}


const CardStructure: React.FC<ICardStructure> = ({ children, id_card, activeCard, isPaid, setModalPro }) => {

    return (
        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == id_card && styles.active}`} id={`${styles['card'+id_card]}`} key={`card${id_card}`}>
            <img src="/trama-car.svg" className={`${styles.tramaBottom} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaLeft} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaRight} ${styles.tramas}`} />
            {!isPaid && 
                <div>
                    <h5 className={styles.entregabilidad_free}>60% ENTREGABILIDAD <span>i</span></h5>
                    <div onClick={()=>{ setModalPro(true) }}>
                        <p>Con nuestro plan actual, garantizamos una entregabilidad del 60%. Pero, si buscas lo mejor, DragonChat 2.0 aumenta esa entregabilidad casi al 100%. <i>¡Mejora tus resultados con Dragonchat 2.0!</i></p>
                    </div>
                </div>
            }
            {children}
        </div>

    );
}

export default CardStructure;