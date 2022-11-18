import { ContactInfo } from '../CardsContFree';
import styles from './ContactRow.module.css';

export interface IContactRow {
    contact : ContactInfo;
    campos : string[];
}


// interface contactosArr extends Array<ContactInfo>{}

const ContactRow: React.FC<IContactRow> = ({ contact, campos }) => {

    const columnWidth = 100 / campos.length 

  
   
    return (
        <div className={styles.row_card}>
            <div className={`column${columnWidth}`}>
                <div>
                    <span>+{contact.wpp}</span>
                </div>
            </div>
            <div className={`column${columnWidth}`}>
                <div>
                    <span>{contact.name}</span>
                </div>
            </div>
            <div className={styles.delete_contact}
                onClick={()=>{
                    // handleDeleteContact(contact)
                }}
            >❌</div>
        </div>
    
    );
}

export default ContactRow;