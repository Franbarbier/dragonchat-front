
import { useMemo } from 'react';
import styles from './HeaderRow.module.css';

export interface IHeaderRow {
    campos: string[];
}

const HeaderRow: React.FC<IHeaderRow> = ({ campos }) => {
    const columnWidth = useMemo(() => 100 / campos.length, [campos.length]);

    return (
        <div className={styles.table_headers}>
            {campos.map((campo) => (
                <div className={`column${columnWidth}`} key={campo}>
                    <h6>{campo}</h6>
                </div>
            ))}
        </div>
    );
}

export default HeaderRow;
