import { useEffect, useState } from "react";
import CountryCodeFlagSelector from "../CountryCodeFlagSelector/CountryCodeFlagSelector";
import CustomColorBtn from "../CustomColorBtn/CustomColorBtn";
import CardTitle from "../cards/CardTitle/CardTitle";
import styles from './ModalCalentador.module.css';

// set interface for props
interface IModalCalentador {
  setCalentadorModal : (calentador: boolean) => void;
}

const ModalCalentador: React.FC<IModalCalentador> = ({ setCalentadorModal }) => {


const [hotNum, setHotNum] = useState<{code: string, number: string}>({ code: "9", number: "56" });

useEffect(() => {
  console.log(hotNum)
}, [hotNum])

return (
        <div className={styles.modal_calentador}>
          <div>
            <CardTitle text="Calentador de líneas" />
            <div>
                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit </p>
                <div className={styles.inputsCont}>
                    <CountryCodeFlagSelector
                        phone={{ code: hotNum.code, number: hotNum.number }}
                        setPhone={ setHotNum  }
                    />
                    
                </div>
                <div className={styles.btnsCont}>
                    <div>
                        <CustomColorBtn
                          type="submit"
                          text={ "CANCELAR" }
                          backgroundColorInit={ "#A32123" }
                          backgroundColorEnd={ "#E42A2E" }
                          borderColor={ "#A32123"}
                          onClick={() => { setCalentadorModal(false)}}
                          disable={ false }
                        />
                    </div>
                    <div>
                        <CustomColorBtn
                          type="submit"
                          text={ "Guardar" }
                          backgroundColorInit={ "#c21c3b" }
                          backgroundColorEnd={ "#f9bd4f" }
                          borderColor={ "#e17846"}
                          onClick={() => {
                            
                          }}
                          disable={ hotNum.number == "" }
                        />
                    </div>
                </div>
            </div>
          </div>
        </div>
      );
}

export default ModalCalentador;