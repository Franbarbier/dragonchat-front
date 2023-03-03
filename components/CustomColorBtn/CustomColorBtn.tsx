import styles from './CustomColorBtn.module.css';

export interface ICustomColorBtn {
    text : string;
    type?: "button" | "submit" | "reset";
    backgroundColorInit: string;
    backgroundColorEnd: string;
    disable?: boolean;
    borderColor: string,
    onClick: () => void;
}

const CustomColorBtn: React.FC<ICustomColorBtn> = ({ text, type="button", backgroundColorInit, backgroundColorEnd, borderColor, onClick, disable=false }) => {
    return <button type={type} className={`${styles.customColorBtn} ${disable && styles.disabled}`} onClick={ ()=> { if(!disable){ onClick() }}} style={{background: `linear-gradient(0, ${backgroundColorInit}, ${backgroundColorEnd})`, border: `1px solid ${borderColor}`}}>{text}</button>;
}

export default CustomColorBtn;