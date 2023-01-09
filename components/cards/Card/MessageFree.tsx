import { useState } from 'react';
import CardTitle from '../CardTitle/CardTitle';
import ConversationPremium from '../ConversationPremium/ConversationPremium';
import styles from './FreeCard.module.css';

export interface IFreeCard2 {
    sampleTextProp : string,
    setActiveCard: (id: number) => void,
    activeCard : number;
    mensaje : string;
    setMensaje: (msj: string) => void;
}

const FreeCard2: React.FC<IFreeCard2> = ({ setActiveCard, activeCard, mensaje, setMensaje }) => {

    let idCard = 2;

    const [tab, setTab] = useState<string>("difusion")


    return (
        <div className={`${styles.card} ${styles['numberCard'+activeCard]} ${activeCard == idCard && styles.active}`} id={`${styles['card'+idCard]}`} onClick={()=>setActiveCard(idCard)}>

            <div className={styles.card_container}>
                <div>
                    <CardTitle text={"Mensaje"} />
                </div>
                <div>
                    <div className={styles.tabs_cont}>
                        <div>
                            <div className={`${styles.difu_tab} ${tab == "difusion" && styles.active_tab}`}
                            onClick={ ()=>{ setTab("difusion") } }
                            >
                                <h6>Difusión</h6>
                            </div>
                            <div className={`${styles.conv_tab} ${tab == "conversacion" && styles.active_tab}`}
                            onClick={ ()=>{ setTab("conversacion") } }
                            >
                                <h6>Conversación</h6>
                            </div>
                        </div>
                    </div>
                    {tab == "difusion" ?
                        <div className={styles.options_cont}>
                            <div className={styles.message}>
                            <textarea placeholder='Utilizando la variable `[name]` en tu mensaje, la misma será reemplazada por el nombre de cada uno de los destinatarios definidos en la sección anterior. Ejemplo: `Hola [name], tengo algo para enviarte que te va a encantar`' value={mensaje} onChange={ (e)=>{ setMensaje(e.target.value) } } />

                            </div>
                        </div>
                        :
                        <div>
                            <ConversationPremium />
                        </div>

                    }
                </div>
            </div>
        </div>
    
    );
}

export default FreeCard2;