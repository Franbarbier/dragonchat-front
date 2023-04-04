import { useEffect, useState } from "react";
import styles from "./NavBottom.module.css";

export interface INavBottom {
  setActiveCard: (id: number) => void;
  activeCard : number;
  checkPrevCard : () => void;
  checkNextCard : () => void;
}

const NavBottom: React.FC<INavBottom> = ({setActiveCard, activeCard, checkPrevCard, checkNextCard }) => {
 
  const [ruletaAngulo, setRuletaAngulo] = useState<string>('rotate(-0deg)')
  // const [ruletaAngulo, setRuletaAngulo] = useState<string>('rotate(-0deg)')

  useEffect(()=>{
    switch (activeCard) {
      case 1:
        // setTimeout(() => {
          setRuletaAngulo('0')
        // }, 300);
       break;
      case 2:
        // setTimeout(() => {
          setRuletaAngulo('-60')
        // }, 300);
        break;
      case 3:
        // setTimeout(() => {
          setRuletaAngulo('-120')
        // }, 300);
        break;
          
      default:
        break;
      }
  }, [activeCard])
    


  return (
    <div className={''}>
        <div>
          <div className={styles.circuloNav}>

            <img src="/wapi_plataforma_wheel_bg.png" />
            <img src="/wapi_plataforma_wheel_bg2.png" />
            
            <div style={{ transform :  `rotate(${ruletaAngulo}deg)`  }}>
              <img src="/wapi_plataforma_wheel_lines.png" />

              {/* style={{ transform :  `translate(-50%, 50%) rotate(${ruletaAngulo}deg)`  }} */}

              <div className={`${styles.paginationBtn} ${styles.cardBtnPos0} ${activeCard == 1 && styles.activeBtn}`} onClick={ ()=>{ if (activeCard > 1){ checkPrevCard() } {
                
              } } } >
                <div className={styles.iconCont} >
                  <div>
                    <img src="/add.svg" width={'100%'}/>
                  </div>
                </div>
              </div>
              <div className={`${styles.paginationBtn} ${styles.card2Btn} ${styles.cardBtnPos1} ${activeCard == 2 && styles.activeBtn}`} onClick={ ()=>{ if (activeCard > 2){ checkPrevCard() }else{ checkNextCard() } } } >
                <div className={styles.iconCont}>
                  <div>
                    <img src="/text.svg" width={'100%'}/>
                  </div>
                </div>
              </div>
              <div className={`${styles.paginationBtn} ${styles.card3Btn} ${styles.cardBtnPos2} ${activeCard == 3 && styles.activeBtn}`} onClick={ ()=>{ if (activeCard > 3){ checkPrevCard() }else{ checkNextCard() } } } >
                <div className={styles.iconCont}>
                  <div>
                    <img src="/send.svg" width={'100%'}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default NavBottom;
