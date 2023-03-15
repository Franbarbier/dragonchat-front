import styles from './MainCont.module.css';

export interface IMainCont {
    width?: number | null;
    maxWidth?: number | null;
    children : React.ReactElement<any, any>;
}



// interface contactosArr extends Array<ContactInfo>{}

const MainCont: React.FC<IMainCont> = ({ width = 50, maxWidth = 1200, children }) => {

   
    return (
        <div className={styles.main_cont} style={{'width' : `${width}vw`, 'maxWidth' : `${maxWidth}px` }}>
            <div>
                {children}
            </div>
        </div>
    
    );
}

export default MainCont;