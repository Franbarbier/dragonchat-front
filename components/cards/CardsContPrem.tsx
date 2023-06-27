import { useState } from 'react';
import SecuenceMessage from './Card/SecuencePremium';
import styles from './CardsCont.module.css';


export interface ICardsCont {
}

type IdCard = {
    id: number
}

export interface ContactInfo {
    name : string,
    wpp : string,
    status? : "success" | "error" | "pending",
}


const CardsCont: React.FC<ICardsCont> = ({  }) => {

    
    const [activeCard, setActiveCard] = useState<number>(1)

    return (
        <div>
            <div className={styles.cards_cont}>

                    <SecuenceMessage
                        setActiveCard={(val:any)=>setActiveCard(val)}
                        activeCard={activeCard}
                    />
                    

                    <div className={styles.ruleta}>

                    </div>

            </div>
            <div className={`${styles.nextCard} ${activeCard == 1 && styles.arrow_disabled}`} onClick={ ()=>{  if(activeCard < 1) setActiveCard(activeCard+1) } }>
                <button>{'>'}</button>
            </div>
            <div className={`${styles.prevCard} ${activeCard == 1 && styles.arrow_disabled}`} onClick={ ()=>{  if(activeCard > 1) setActiveCard(activeCard-1) } }>
                <button>{'<'}</button>
            </div>

                   
        </div>
    
    );
}

export default CardsCont;