import { useState } from 'react';
import eyeImg from "../../public/ver.png";
import styles from './InputGral.module.css';

export interface IInputGral {
    type?: string;
    placeholder?: string;
    name?: string;
    value?: string | number;
    classes?: string[];
    onChange?: (e: string) => void;
    isDisabled?: boolean;
    labelText?: string;
    labelClassName?: string;
    autoComplete?: string;
}

const InputGral: React.FC<IInputGral> = ({
    type = 'text',
    placeholder = "",
    name,
    value = "",
    onChange = () => { return "" },
    classes = [],
    isDisabled = false,
    labelText,
    labelClassName,
    autoComplete,
}) => {
    const [showHide, setShowHide] = useState(false)

    return (
        <>
            {labelText && <label className={labelClassName} htmlFor="">{labelText}</label>}

            <div className={styles.input_cont} >
                <input
                    className={classes.join(' ')}
                    placeholder={placeholder}
                    type={!showHide ? type : 'text'}
                    name={name} value={value}
                    onChange={(e) => { onChange(e.target.value) }}
                    disabled={isDisabled}
                    autoComplete={autoComplete}
                />

                {type == 'password' && (
                    <div onClick={() => setShowHide(!showHide)} className={styles.ojito} >
                        <img src={eyeImg.src} alt="eye-img" />
                        {showHide && <span className={styles.slash}>/</span>}
                    </div>
                )}
            </div>
        </>
    );
}

export default InputGral;