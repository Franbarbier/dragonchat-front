import React from 'react';
import OrangeBtn from '../OrangeBtn/OrangeBtn';
import styles from './BoxDialog.module.css';

interface Props {
    message: React.ReactNode;
    setRenderDialog : (id: boolean) => void;
}

const BoxDialog: React.FC<Props> = ({ message, setRenderDialog }) => {
    return (
        <div className={styles.box_dialog}>
            <div className={styles.box_dialog_arrow} ></div>
            <div className={styles.box_dialog_content} >
                <span>
                    {message}
                </span>
                {/* <button>ENTENDIDO</button> */}
                <OrangeBtn text="ENTENDIDO" onClick={()=>{setRenderDialog(false)}}/>
            </div>
        </div>
    );
};

export default BoxDialog;