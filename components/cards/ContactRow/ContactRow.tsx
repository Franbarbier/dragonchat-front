import { ContactInfo } from '../CardsContFree';
import styles from './ContactRow.module.css';

export interface IContactRow {
    contact : ContactInfo;
    campos : string[];
}



const ContactRow: React.FC<IContactRow> = ({ contact, campos }) => {

    const columnWidth = 100 / campos.length 

  
   
    return (
        <div className={styles.row_card}>
            <div className={`column${columnWidth}`}>
                <div>
                    <span>{contact.nombre}</span>
                </div>
            </div>
            <div className={`column${columnWidth}`}>
                <div>
                    <span>+{contact.numero}</span>
                </div>
            </div>
        </div>
    
    );
}

export default ContactRow;