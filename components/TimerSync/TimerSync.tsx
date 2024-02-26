import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import CardTitle from '../cards/CardTitle/CardTitle';
import styles from './TimerSync.module.css';

export interface ITimerSync {

}

const TimerSync: React.FC<ITimerSync> = ({ }) => {

    const [timer, setTimer] = useState<string>('03:00');

    useEffect(() => {
        const apartir = new Date();

        

        // const interval = setInterval(() => {
        //     setTimer(getTimeLeftUntilHour(syncTime))
        // }, 1000);

        let timing = setInterval(() => {
            if ( getTimeLeftUntilHour() < 1000 ) {
                clearInterval(timing);
                Cookies.set("syncTime", null, { expires: new Date(0) });
                window.location.href = "/dash";
                return false

            }
            const minutesLeft = Math.floor(getTimeLeftUntilHour() / (1000 * 60));
            let sec = getTimeLeftUntilHour() % (1000 * 60);
            const secondsLeft = Math.floor(sec / 1000);
            
            if (isNaN(minutesLeft)) {
                setTimer(`00:00`);
                return;
            }

            var sec0;
            if (secondsLeft < 10) {
                sec0 = `0${secondsLeft}`;
                setTimer(`${minutesLeft}:${sec}`);
            } else {
                sec0 = `${secondsLeft}`;
            }

            if (minutesLeft < 10) {
                setTimer(`0${minutesLeft}:${sec0}`);
                return;
            }
            setTimer(`${minutesLeft}:${sec0}`);
            
        }, 1000);
        
    }, []);

    function getTimeLeftUntilHour() {

        const syncTime = new Date( Cookies.get('syncTime') )
        const in5 = new Date( syncTime.getTime() + 180000 );

        // Calculate the time difference between now and the target hour
        let timeDiff = in5.getTime() - new Date().getTime();

        return  timeDiff;
      }

      console.log(Cookies.get('syncTime'))

    return <>
                <div className={styles.timerCont}>
                    <CardTitle text="Sincronizando" />
                    <h4>Perfecto! Aguarda 3 minutos para asegurarnos que Whatsapp terminó de sincronizarse a tu dispositivo</h4>

                    <div className={styles.cron}>
                            <p>{timer}</p>
                    </div>
               </div>
    </>;
}

export default TimerSync;