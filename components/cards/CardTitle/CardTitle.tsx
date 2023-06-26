import styles from './CardTitle.module.css';
export interface ICardTitle {
    text : string;

}




const CardTitle: React.FC<ICardTitle> = ({ text }) => {

  
   
    return (
            <div className={styles.title_cont}>
                <div className={`${styles.title_lines} ${styles.left_line}`}></div>
                <h5 className={styles.card_title}>{text}</h5>
                <div className={`${styles.title_lines} ${styles.right_line}`}></div>
            </div>
    )
}

export default CardTitle;