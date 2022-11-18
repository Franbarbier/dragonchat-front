import styles from './QrCard.module.css';

import CardTitle from "../CardTitle/CardTitle";

interface IQrCard {
    qr : string;
}




const QrCard: React.FC<IQrCard> = ({ qr }) => {

    console.log(qr)  
   
    return (
        <div className={styles.qrCard_cont}>
            <CardTitle text="Vincular dispositivo" />
            <p>Vincula tu Whatsapp esacaneando el código QR:</p>
            <div>
                <img src={qr.qr} width="75%"/>
            </div>
        </div>
    
    );
}

export default QrCard;

