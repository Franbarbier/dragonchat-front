import { useEffect, useState } from 'react';
import styles from './InputGral.module.css';

export interface IInputGral {
    type? : string;
    placeholder? : string;
    name? : string;
    value? : string | number;
    classes? : string[];
    onChange?: (e: string) => void;

}



// interface contactosArr extends Array<ContactInfo>{}

const InputGral: React.FC<IInputGral> = ({ type='text', placeholder="", name="", value="" , onChange = ()=>{return ""}, classes=[]}) => {
    
    const [isPass, setIsPass] = useState(false)
    const [showHide, setShowHide] = useState(false)

    useEffect(()=>{
        if (type == 'password') {
            setIsPass(true)
        }
    }, [])

    function showHidePass(){
        setShowHide(!showHide)
    }

    return (
        <div className={styles.input_cont} >
            <input className={ classes.join(' ') } placeholder={placeholder} type={!showHide ? type : 'text'} name={name} value={value} onChange={ (e)=>{ onChange(e.target.value) } }/>
            {isPass &&
                <div onClick={showHidePass} className={styles.ojito} >
                <img src="ver.png" />
                {showHide &&
                    <span className={styles.slash}>/</span>
                }
                </div>
            }
        </div>
    
    );
}

export default InputGral;