import styles from "./NavBottom.module.css";

export interface INavBottom {}

const NavBottom: React.FC<INavBottom> = ({}) => {
 


  return (
    <div className={''}>
        <div>
          <div className={styles.circuloNav}>
            <div>
              <div className={`${styles.paginationBtn} ${styles.card1Btn}`}>

                <div className={styles.iconCont}>
                  <img src="/delete.svg" width={'100%'}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default NavBottom;
