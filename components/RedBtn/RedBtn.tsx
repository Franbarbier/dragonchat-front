import styles from './RedBtn.module.css';

export interface IRedBtn {
    text : string;
    type?: "button" | "submit" | "reset";
    onClick: (arg: any) => void;
}

const RedBtn: React.FC<IRedBtn> = ({ text, type="button", onClick }) => {
    return <button type={type} className={styles.redBtn} onClick={onClick} >{text}</button>;
}

export default RedBtn;