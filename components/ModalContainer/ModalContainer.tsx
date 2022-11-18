import styles from './ModalContainer.module.css';

export interface IModalContainer {
    children : React.ReactElement<any, any>;
    closeModal : (render: boolean) => void;
}



// interface contactosArr extends Array<ContactInfo>{}

const ModalContainer: React.FC<IModalContainer> = ({ children, closeModal }) => {



    return (
        <div className={styles.modal_background}  onClick={ ()=> { closeModal(false) } } >
            <div className={styles.modal_cont}  onClick={ (e)=> { e.stopPropagation() } } >
                <div className={styles.close_mod}  onClick={ ()=> { closeModal(false) } } >
                    <p>x</p>
                </div>
                {children}
            </div>
        </div>
    
    );
}

export default ModalContainer;