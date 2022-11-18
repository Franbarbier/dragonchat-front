import styles from './OrangeBtn.module.css';

export interface IOrangeBtn {
    text : string;
    onClick: (arg: any) => void;
}

const OrangeBtn: React.FC<IOrangeBtn> = ({ text, onClick }) => {
    return <button className={styles.orangeBtn} onClick={onClick} >{text}</button>;
}

export default OrangeBtn;