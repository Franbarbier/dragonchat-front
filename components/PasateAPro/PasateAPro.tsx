import styles from './PasateAPro.module.css';

export interface IProBtn {
    // notification: INotification,
    onClick: (pro:boolean) => void,
}

const ProBtn: React.FC<IProBtn> = ({ onClick }) => {
   


    return (
        <div className={styles.pasate_cont}>
            <button onClick={()=>{
                onClick(true)
            }}>
                <img src="upgrade.png" />
                <span>PASATE A 2.0</span>
            </button>
        </div>
    );
}

export default ProBtn;

