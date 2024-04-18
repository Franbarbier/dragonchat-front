import CardTitle from '../CardTitle/CardTitle';
import CardStructure from './CardStructure';
import styles from './FreeCard.module.css';


export interface IFreeCard3 {
    activeCard : number;
    setModalPro : (value: boolean) => void;
    isPaid : boolean;
}



const FreeCard3: React.FC<IFreeCard3> = ({ activeCard, setModalPro, isPaid}) => {


    let idCard = 3;


      
    return (

            <CardStructure id_card={idCard} activeCard={activeCard} isPaid={isPaid} setModalPro={setModalPro}>
            <>
            { activeCard == idCard &&
            <>

         

            <div className={styles.card_container} >
                <CardTitle text={"ANTI-BLOCKER"} />

                

            </div>
            </>
            }

       </>
        </CardStructure>
    
    );
}

export default FreeCard3;