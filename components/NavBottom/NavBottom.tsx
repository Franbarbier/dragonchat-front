import { useEffect, useState } from "react";
import styles from "./NavBottom.module.css";

export interface INavBottom {
  setActiveCard: (id: number) => void;
  activeCard : number;
  nextCard : boolean;
  prevCard : boolean;
}

const NavBottom: React.FC<INavBottom> = ({setActiveCard, activeCard, nextCard, prevCard }) => {
 
  const [ruletaAngulo, setRuletaAngulo] = useState<string>('rotate(-0deg)')
  // const [ruletaAngulo, setRuletaAngulo] = useState<string>('rotate(-0deg)')

  useEffect(()=>{
    switch (activeCard) {
      case 1:
          setRuletaAngulo('0')
       break;
      case 2:
          setRuletaAngulo('-60')
        break;
      case 3:
          setRuletaAngulo('-120')
        break;
      case 4:
          setRuletaAngulo('-180')
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


              <div className={`${styles.paginationBtn} ${styles.cardBtnPos0} ${activeCard == 1 && styles.activeBtn}`} onClick={ ()=>{ if (activeCard > 1 && prevCard){ setActiveCard(1) } } } >
                <div className={styles.iconCont} >
                  <div>
                    <img src="/add.svg" width={'100%'}/>
                  </div>
                </div>
              </div>
              <div className={`${styles.paginationBtn} ${styles.card2Btn} ${styles.cardBtnPos1} ${activeCard == 2 && styles.activeBtn}`} onClick={ ()=>{ if (activeCard > 2){ setActiveCard(activeCard-1) }else{ if (nextCard) {
                setActiveCard(activeCard+1)
              } } } } >
                <div className={styles.iconCont}>
                  <div>
                    <img src="/text.svg" width={'100%'}/>
                  </div>
                </div>
              </div>
              <div className={`${styles.paginationBtn} ${styles.card3Btn} ${styles.cardBtnPos2} ${activeCard == 3 && styles.activeBtn}`} onClick={ ()=>{ if (activeCard < 3){ if (nextCard) { setActiveCard(activeCard+1) } }else{ if (prevCard) { setActiveCard(activeCard-1)  } } } } >
                <div className={styles.iconCont}>
                  <div>
                    <img src="/shield-clock.svg" width={'100%'}/>

                  </div>
                </div>
              </div>

              <div className={`${styles.paginationBtn} ${styles.card4Btn} ${styles.cardBtnPos3} ${activeCard == 4 && styles.activeBtn}`} onClick={ ()=>{ 
                if (activeCard < 4){  if (nextCard) { setActiveCard(activeCard+1) }  }
              }} >
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
