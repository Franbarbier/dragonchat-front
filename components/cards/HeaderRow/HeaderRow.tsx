
import styles from './HeaderRow.module.css';

export interface IHeaderRow {
    campos: string[];
}


// interface contactosArr extends Array<ContactInfo>{}

const HeaderRow: React.FC<IHeaderRow> = ({ campos }) => {

    const columnWidth = 100 / campos.length 

    return (
        <div className={styles.table_headers}>
           {campos.map((campo)=>(
            <div className={`column${columnWidth}`}>
                <h6>{campo}</h6>
            </div>
           ))}
        </div>
    
    );
}

export default HeaderRow;