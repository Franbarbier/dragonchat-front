import { Dispatch, SetStateAction, useCallback } from 'react';
import styles from './CountryCodeFlagSelector.module.css';
import { countries } from './data.json';

interface CountryCodeFlagSelectorProps {
    phone: { code: string, number: string },
    setPhone: (prev: any) => void,
};

const CountryCodeFlagSelector: React.FC<CountryCodeFlagSelectorProps> = (props) => {
    const { phone, setPhone } = props;

    const handlePhone = useCallback((value: string) => {
        if ((/^\d+$/.test(value) || value === '') && value.length !== 15) {
            setPhone(prev => ({ ...prev, number: value }));
        }
    }, [setPhone])

    return (
        <div className={styles.container}>
            <select
                className={styles.select}
                onChange={({ target: { value } }) => setPhone(prev => ({ ...prev, code: value }))}
            >
                {countries.map(c => (
                    <option 
                        key={c.code_2} 
                        value={c.dial_code}
                    >
                        {`${c.emoji} ${c.code_3} ${c.dial_code}`}
                    </option>
                ))}
            </select>
            <input
                className={styles.phone}
                placeholder="89898989"
                type="text"
                value={phone.number}
                onChange={({ target: { value } }) => handlePhone(value)}
                autoComplete="off"
            />
        </div>
    );
}

export default CountryCodeFlagSelector;