import styles from './FreeBanner.module.css';


interface IFreeBanner {
    setModalPro: (modalPro:boolean) => void;
}

const FreeBanner: React.FC<IFreeBanner> = ({ setModalPro }) => {

    return (
            <div className={styles.banner} onClick={()=>{ setModalPro(true) }}>
                <p>Sabías que con Dragon Chat 2.0 podés enviar más mensajes? <u>Hazte PRO!</u></p>
            </div>
    )
}

export default FreeBanner;