import CardTitle from "../cards/CardTitle/CardTitle";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import styles from './ModalTimer.module.css';

export interface IModalTimer {
    // setModalImport : (render: boolean) => void;
    // uploadContacts: (contacts: ContactInfo[]) => void
}



// interface contactosArr extends Array<ContactInfo>{}

const ModalTimer: React.FC<IModalTimer> = ({  }) => {

 

return (
        <div className={styles.modal_timer}>
          <div>
            <CardTitle text="TE QUEDAN" />
            <div>
                <h3>10:00</h3>
                <p>Para poder utilizar DragonChat por tiempo ilimitado, pasate a PRO.</p>
                <CustomColorBtn
                    type="submit"
                    text="Pasarse a PRO"
                    backgroundColorInit="#c21c3b"
                    backgroundColorEnd="#f9bd4f"
                    borderColor="#e17846"
                    onClick={()=>{()=> {

                    } } }
                />
            </div>
          </div>
        </div>
      );
}

export default ModalTimer;