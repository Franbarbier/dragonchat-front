import styles from './FreeBanner.module.css';


interface IFreeBanner {
    setModalPro: (modalPro:boolean) => void;
    text : string;
}

const FreeBanner: React.FC<IFreeBanner> = ({ setModalPro, text }) => {

    return (
            <div className={styles.banner} onClick={()=>{ setModalPro(true) }}>
                <p>{text} <u>Hazte PRO!</u></p>
            </div>
    )
}

export default FreeBanner;