import styles from './InputGral.module.css';

export interface IInputGral {
    type? : string;
    placeholder? : string;
    name? : string;
    value? : string | number;
    classes? : string[];
    onChange? : (val: string) => void

}



// interface contactosArr extends Array<ContactInfo>{}

const InputGral: React.FC<IInputGral> = ({ type='text', placeholder="", name="", value="" , onChange, classes=[]}) => {

  
   
    return (
        <div className={styles.input_cont} >
            <input className={ classes.map(clase => `${clase} `  ) } placeholder={placeholder} type={type} name={name} value={value} onChange={ event => onChange(event.target.value)}/>
        </div>
    
    );
}

export default InputGral;