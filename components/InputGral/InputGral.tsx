import styles from './InputGral.module.css';

export interface IInputGral {
    type? : string;
    placeholder? : string;
    name? : string;
    value? : string | number;

}



// interface contactosArr extends Array<ContactInfo>{}

const InputGral: React.FC<IInputGral> = ({ type='text', placeholder="", name="", value="" }) => {

  
   
    return (
        <div className={styles.input_cont} >
            <input placeholder={placeholder} type={type} name={name} value={value}/>
        </div>
    
    );
}

export default InputGral;