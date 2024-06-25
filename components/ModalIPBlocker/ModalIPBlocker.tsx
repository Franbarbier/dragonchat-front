import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import styles from './ModalIPBlocker.module.css';





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
                <h3>Parece que ya tienes una cuenta vinculada.</h3>
                <div>
                  <p>¡Hola! ¿Cómo estás? Nos encanta que quieras aprovechar al máximo DragonChat.</p>
                  <p>Recuerda que con DragonChat 2.0 puedes enviar mensajes ilimitados, enviar mensajes múltiples, compartir archivos y utilizar una función que te ayudará a calentar tus líneas de WhatsApp para evitar bloqueos en nuevas líneas.
                  </p>
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
                            text="DRAGONCHAT 2.0"
                            backgroundColorInit={ "#c21c3b" }
                            backgroundColorEnd={ "#f9bd4f" }
                            borderColor={ "#e17846"}
                            onClick={()=>{
                              window.location.href  = '/checkout'
                            }}
                          />
                      </div>
                  </div>
                      <p>Si no tienes otra cuenta en uso, por favor, <a href={whatsappLink} target="_blank"><strong><u>contacta a soporte.</u></strong></a></p>
                </div>
            </div>
        </div>
      );
}

export default ModalIpblocker;