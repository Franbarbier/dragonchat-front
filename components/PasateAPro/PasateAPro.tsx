import styles from './PasateAPro.module.css';

export interface IProBtn {
    // notification: INotification,
    onClick: (pro:boolean) => void,
}

const ProBtn: React.FC<IProBtn> = ({ onClick }) => {
   


    return (
        <div className={styles.pasate_cont}>
            <button onClick={()=>{
                // setModalRef(true)
                onClick(true)
            }}>
                <img src="corona.png" />
                <span>PASATE A PRO</span>
            </button>
        </div>
    );
}

export default ProBtn;

