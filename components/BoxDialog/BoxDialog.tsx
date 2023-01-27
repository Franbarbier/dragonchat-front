import React from 'react';
import styles from './BoxDialog.module.css';

interface Props {
    message: React.ReactNode;
}

const BoxDialog: React.FC<Props> = ({ message }) => {
    return (
        <div className={styles.box_dialog}>
            <div className={styles.box_dialog_arrow} ></div>
            <div className={styles.box_dialog_content} >
                {message}
            </div>
        </div>
    );
};

export default BoxDialog;