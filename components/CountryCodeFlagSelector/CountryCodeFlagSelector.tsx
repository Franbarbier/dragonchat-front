import { useCallback, useEffect } from 'react';
import InputGral from '../InputGral/InputGral';
import styles from './CountryCodeFlagSelector.module.css';
import data from './data.json';

interface CountryCodeFlagSelectorProps {
    phone: { code: string, number: string },
    setPhone: (prev: any) => void,
};

const CountryCodeFlagSelector: React.FC<CountryCodeFlagSelectorProps> = (props) => {
    const { phone, setPhone } = props;

    useEffect(() => {
        setPhone(prev => ({ ...prev, code: data.countries[0].dial_code }));
    }, [])

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
                {data.countries.map(c => (
                    <option
                        key={c.code_2}
                        value={c.dial_code}
                    >
                        {`${c.emoji} ${c.code_3} +${c.dial_code}`}
                    </option>
                ))}
            </select>
            <InputGral
                placeholder="912345678"
                type="text"
                value={phone.number}
                onChange={(value) => handlePhone(value)}
                autoComplete="off"
            />
        </div>
    );
}

export default CountryCodeFlagSelector;