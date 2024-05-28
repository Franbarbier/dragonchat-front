import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import CardTitle from '../cards/CardTitle/CardTitle';
import styles from './ModalIpblocker.module.css';




const ModalIpblocker: React.FC< {setModalip: (val:boolean) => void  }> = ({ setModalip }) => {

return (
        <div className={styles.modal_ipblocker}>
            <div>
                <CardTitle text="Parece que ya tienes una cuenta" />
                <div>
                  {/* <h3>Parece que estas intentando crear una cuenta y ya tienes otra!</h3> */}
                  <p>Nos alegra que desees formar parte de nuestra comunidad. Queremos recordarte que cada cuenta en DragonChat es estrictamente personal. No está permitido registrar múltiples cuentas.<br/> Si no tenias otra cuenta en uso, por favor contacta a soporte.</p>
                  <div>
                    <div>
                        <CustomColorBtn
                            type="submit"
                            text="CERRAR"
                            backgroundColorInit="#13013780"
                            backgroundColorEnd="#13013780"
                            borderColor="var(--newViolet)"
                            onClick={()=>{setModalip(false) } }
                        />
                      </div>
                      <div>
                        <CustomColorBtn
                            type="submit"
                            text="SOPORTE"
                            backgroundColorInit="#724cdf"
                            backgroundColorEnd="#3a94fe"
                            borderColor="#5573f0"
                            onClick={()=>{}}
                          />
                      </div>
                  </div>
                </div>
            </div>
        </div>
      );
}

export default ModalIpblocker;