import styles from './FreeCard1.module.css';

export interface IFreeCard1 {
    sampleTextProp : string;
}

const FreeCard1: React.FC<IFreeCard1> = ({ sampleTextProp }) => {
    return (
        <div className={styles.container}>{sampleTextProp} Compaaa</div>
    
    );
}

export default FreeCard1;