import CardTitle from "../cards/CardTitle/CardTitle";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import styles from './ModalReferiAmigos.module.css';

export interface IModalReferiAmigos {
    // setModalImport : (render: boolean) => void;
    // uploadContacts: (contacts: ContactInfo[]) => void
}



// interface contactosArr extends Array<ContactInfo>{}

const ModalReferiAmigos: React.FC<IModalReferiAmigos> = ({  }) => {

 

return (
        <div className={styles.modal_ref}>
          <div>
            
            <CardTitle text="REFERI AMIGOS" />
            <div>
                <p>Al compartir este enlace:</p>
                <ul>
                    <li><img src="cierto.png"/>Tu amigo ganará <span>15 mensjaes extras diarios.</span></li>
                    <li><img src="cierto.png"/>Tu ganarás <span>10 mensjaes extras diarios.</span></li>
                </ul>
                <div>
                    <h6>COMPARTE TU ENLACE</h6>
                    <p className={styles.enlace}>https://dragonchat.io/error?code=0000</p>
                    <CustomColorBtn
                        type="submit"
                        text="Copiar enlance"
                        backgroundColorInit="#724cdf"
                        backgroundColorEnd="#3a94fe"
                        borderColor="#5573f0"
                        onClick={()=>{alert('Esta función no estará disponible proximamente')}}
                    />
                </div>
            </div>
          </div>
        </div>
      );
}

export default ModalReferiAmigos;