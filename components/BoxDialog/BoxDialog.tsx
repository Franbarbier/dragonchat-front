import React from 'react';
import { HOST_URL } from '../../constants/index';
import { ROUTES } from '../../enums/index';
import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
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
                <CustomColorBtn
                    type="submit"
                    text="Entendido"
                    backgroundColorInit="#13013780"
                    backgroundColorEnd="#13013780"
                    borderColor="var(--newViolet)"
                    onClick={()=>{ 
                        setRenderDialog(false)
                     } }
                    disable={ false }
                />
                <CustomColorBtn
                        type="submit"
                        text="version ilimitada"
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