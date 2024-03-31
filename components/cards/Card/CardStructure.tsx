import styles from './FreeCard.module.css';

export interface ICardStructure {
    children : React.ReactElement<any, any>;
    id_card : number;
    activeCard : number;
    isPaid : boolean;
}


const CardStructure: React.FC<ICardStructure> = ({ children, id_card, activeCard, isPaid }) => {


    return (
        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == id_card && styles.active}`} id={`${styles['card'+id_card]}`} key={`card${id_card}`}>
            <img src="/trama-car.svg" className={`${styles.tramaBottom} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaLeft} ${styles.tramas}`} />
            <img src="/trama-car.svg" className={`${styles.tramaRight} ${styles.tramas}`} />
            {!isPaid && 
                <div>
                    <h5 className={styles.entregabilidad_free}>60% ENTREGABILIDAD <h6>i</h6></h5>
                    <div>
                        <p>Con nuestro plan actual, garantizamos una entregabilidad del 60%. Pero, si buscas lo mejor, nuestro plan Premium aumenta esa entregabilidad casi al 100%. <i>¡Mejora tus resultados con el plan Premium!</i></p>
                    </div>
                </div>
            }
            {children}
        </div>
    
    );
}

export default CardStructure;