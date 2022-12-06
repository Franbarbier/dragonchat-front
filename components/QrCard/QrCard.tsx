import styles from './QrCard.module.css';

import CardTitle from "../cards/CardTitle/CardTitle";

export interface IQrCard {
    qr_url : string;
}




const QrCard: React.FC<IQrCard> = ({ qr_url }) => {
   console.log(qr_url)
    return (
        <div className={styles.qrCard_cont}>
            <CardTitle text="Vincular dispositivo" />
            <p>Vincula tu Whatsapp esacaneando el código QR:</p>
            <div>
                <img src={qr_url} width="75%"/>
            </div>
        </div>
    
    );
}

export default QrCard;

