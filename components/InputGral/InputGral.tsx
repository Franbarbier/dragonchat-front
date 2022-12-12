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
   
    return (
        <div className={styles.input_cont} >
            <input className={ classes.join(' ') } placeholder={placeholder} type={type} name={name} value={value} onChange={ (e)=>{ onChange(e.target.value) } }/>
        </div>
    
    );
}

export default InputGral;