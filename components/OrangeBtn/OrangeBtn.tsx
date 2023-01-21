import styles from './OrangeBtn.module.css';

export interface IOrangeBtn {
    text : string;
    type?: "button" | "submit" | "reset";
    onClick: (arg: any) => void;
}

const OrangeBtn: React.FC<IOrangeBtn> = ({ text, type="button", onClick }) => {
    return <button type={type} className={styles.orangeBtn} onClick={onClick} >{text}</button>;
}

export default OrangeBtn;