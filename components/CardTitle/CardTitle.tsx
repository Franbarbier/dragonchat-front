import styles from './CardTitle.module.css';
export interface ICardTitle {
    text : string;

}



// interface contactosArr extends Array<ContactInfo>{}

const CardTitle: React.FC<ICardTitle> = ({ text }) => {

  
   
    return <h5 className={styles.card_title}># {text} #</h5>
}

export default CardTitle;