import styles from './ModalContainer.module.css';

export interface IModalContainer {
    children : React.ReactElement<any, any>;
    closeModal : (render: boolean) => void;
    addedClass? : string;
}



// interface contactosArr extends Array<ContactInfo>{}

const ModalContainer: React.FC<IModalContainer> = ({ children, closeModal, addedClass='' }) => {



    return (
        <div className={styles.modal_background}  onClick={ ()=> { closeModal(false) } } >
            <div className={`${styles.modal_cont} ${styles[addedClass]}`}  onClick={ (e)=> { e.stopPropagation() } } >
                    <aside className={styles.close_mod}  onClick={ ()=> { closeModal(false) } } >
                        <img src="close.svg" />
                    </aside>
                    <div>

                        <aside>
                            <img src={"/trama-car.svg"} className={styles.trama1}/>
                        </aside>
                        <div style={{'position': 'relative', 'zIndex': '2'}}>
                            {children}
                        </div>
                    </div>

            </div>
        </div>
    
    );
}

export default ModalContainer;