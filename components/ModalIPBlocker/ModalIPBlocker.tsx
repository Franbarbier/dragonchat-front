import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import CardTitle from '../cards/CardTitle/CardTitle';
import styles from './ModalIpblocker.module.css';




const ModalIpblocker: React.FC< {setModalip: (val:boolean) => void  }> = ({ setModalip }) => {

  function wppLink(number, message) {
    const encodedMessage = encodeURIComponent(message);

    const whatsappLink = `https://api.whatsapp.com/send?phone=${number}&text=${encodedMessage}`;

    return whatsappLink;
  }

  const whatsappLink = wppLink(
    573104719365,
    "Hola!! Paso por acá porque necesito ayuda con el DragonChat"
  );

return (
        <div className={styles.modal_ipblocker}>
            <div>
                <CardTitle text="Parece que ya tienes una cuenta vinculada" />
                <div>
                  <p>Nos alegra que desees formar parte de nuestra comunidad. Queremos recordarte que cada cuenta en DragonChat es estrictamente personal. No está permitido vincular múltiples cuentas.<br/> Si no tenias otra cuenta en uso, por favor contacta a soporte.</p>
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
                        <a href={whatsappLink} target="_blank">
                          <CustomColorBtn
                            type="submit"
                            text="SOPORTE"
                            backgroundColorInit="#724cdf"
                            backgroundColorEnd="#3a94fe"
                            borderColor="#5573f0"
                            onClick={()=>{}}
                          />
                        </a>
                      </div>
                  </div>
                </div>
            </div>
        </div>
      );
}

export default ModalIpblocker;