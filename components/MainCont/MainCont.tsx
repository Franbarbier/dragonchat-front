import styles from './MainCont.module.css';

export interface IMainCont {
    width?: number | null;
    children : React.ReactElement<any, any>;
}



// interface contactosArr extends Array<ContactInfo>{}

const MainCont: React.FC<IMainCont> = ({ width = 50, children }) => {

   
    return (
        <div className={styles.main_cont} style={{'width' : `${width}vw` }}>
            <div>
                {children}
            </div>
        </div>
    
    );
}

export default MainCont;