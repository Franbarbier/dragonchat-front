import styles from './OrangeBtn.module.css';

export interface IOrangeBtn {
    text : string;
    type?: "button" | "submit" | "reset";
    onClick: (arg: any) => void;
    disabled? : boolean;
}

const OrangeBtn: React.FC<IOrangeBtn> = ({ text, type="button", onClick, disabled = false }) => {

    return <button type={type} className={styles.orangeBtn} onClick={onClick} disabled={disabled}>{text}</button>;
}

export default OrangeBtn;