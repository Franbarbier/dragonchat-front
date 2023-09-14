import CardTitle from "../cards/CardTitle/CardTitle";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import styles from './ModalUpgradePlan.module.css';
export interface IModalUpgradePlan {
    setModalStripe: (value: number) => void
}

const ModalUpgradePlan: React.FC<IModalUpgradePlan> = ({ setModalStripe }) => {

  return (
        <div className={styles.modal_upgrade}>
            <CardTitle text="Nuevo plan" />
            <div>
                <img src="./dragonchat_logo.svg" />
                <h3>Felicidades!</h3>
                <h4>Tu plan fue actualizado con éxito.</h4>
                <h6>Ya podes disfrutar de tus nuevos beneficios dentro de la plataforma!</h6>
                <CustomColorBtn
                    type="submit"
                    text="Comenzar"
                    backgroundColorInit="#c21c3b"
                    backgroundColorEnd="#f9bd4f"
                    borderColor="#e17846"
                    onClick={()=>{ setModalStripe(1) }}
                    disable={ false }
                />
                          </div>
        </div>
      );
}

export default ModalUpgradePlan;