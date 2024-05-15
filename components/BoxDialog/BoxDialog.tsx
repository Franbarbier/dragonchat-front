import React from 'react';
import { HOST_URL } from '../../constants/index';
import { ROUTES } from '../../enums/index';
import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import styles from './BoxDialog.module.css';

interface Props {
    setRenderDialog : (id: boolean) => void;
}

const BoxDialog: React.FC<Props> = ({ setRenderDialog }) => {
    return (
        <div className={styles.box_dialog}>
            <div className={styles.close_box} onClick={ ()=> setRenderDialog(false) } >
                <img src="/close.png" alt="close_box_dialog" />
            </div>
            <div className={styles.box_dialog_arrow} ></div>
            <div className={styles.box_dialog_content} >
                <span>
                    <span>Llegaste a tu <strong>límite diario de 50 mensajes!</strong></span>
                    <br /><br />
                    <span>Acordate que se van a resetear pasadas las 00:00 horas del dia siguiente.</span>
                    <br /><br />
                    <span>Para serguir enviando de forma ilimitada pasate al plan premium.</span>
                </span>
                <CustomColorBtn
                    type="submit"
                    text="PASARME A DRAGONCHAT 2.0"
                    backgroundColorInit="#c21c3b"
                    backgroundColorEnd="#f9bd4f"
                    borderColor="#e17846"
                    onClick={ (e)=>{ 
                        // Router.push("/checkout")
                        window.location.href = `${HOST_URL}${ROUTES.CHECKOUT}`;
                    } }
                />
            </div>
        </div>
    );
};

export default BoxDialog;