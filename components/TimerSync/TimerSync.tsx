import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import CardTitle from "../cards/CardTitle/CardTitle";
import styles from "./TimerSync.module.css";

const TimerSync = () => {
  const [timer, setTimer] = useState("01:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = getTimeLeftUntilHour();

      if (timeLeft < 1000 || !Cookies.get("syncTime") ) {
        clearInterval(interval);
        Cookies.set("syncTime", null, { expires: new Date(0) });
        window.location.href = "/dash";
        return;
      }

      const minutesLeft = Math.floor(timeLeft / (1000 * 60));
      const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

      const formattedMinutes =
        minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
      const formattedSeconds =
        secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

      setTimer(`${formattedMinutes}:${formattedSeconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getTimeLeftUntilHour() {
    const syncTime = new Date(Cookies.get("syncTime"));
    const in5 = new Date(syncTime.getTime() + 60000);
    return in5.getTime() - new Date().getTime();
  }


  return (
    <div className={styles.timerCont}>
      <CardTitle text="Sincronizando" />
      <p>
        Perfecto! Aguarda 1 minuto para asegurarnos que Whatsapp terminó de
        sincronizarse a tu dispositivo
      </p>

      <div className={styles.cron}>
        <h3>{timer}</h3>
      </div>
    </div>
  );
};

export default TimerSync;
