import { useState } from 'react';
import OrangeBtn from '../../OrangeBtn/OrangeBtn';
import CardTitle from '../CardTitle/CardTitle';
import styles from './ModalShieldOptions.module.css';

export interface IModalShieldOptions {
    setShieldOptions : (limit: {
        timer: number,
        pausa : number,
        bloques: number
    }) => void;
    setModalShieldOptions : (modal: boolean) => void

}



// interface contactosArr extends Array<ContactInfo>{}

const ModalShieldOptions: React.FC<IModalShieldOptions> = ({ setShieldOptions, setModalShieldOptions }) => {
    

    const [tamanoBloque, setTamanoBloque] = useState<number>(0);
    const [pausaBloque, setPausaBloque] = useState<number>(0);
    const [pausaMensaje, setPausaMensaje] = useState<number>(0);
    

    return (
        <div className={styles.ModalShieldOptions_cont}>
            <div>
                <CardTitle text={"Anti-block"} />
                <div>
                    <div className={styles.wireMsjs}>
                        <div>
                            <div className={styles.wireCont}>
                                <div className={styles.bloqueCont}>
                                    <div className={styles.messageCont}></div>
                                    <div className={styles.messageCont}></div>
                                </div>
                            </div>
                            <div className={styles.linesCont}>
                                <hr />
                            </div>
                            <div className={styles.nameCont}>
                                <span>Bloque</span>
                            </div>
                        </div>
                        <div>
                            <div className={styles.wireCont}>
                                <div className={styles.blockSpace}>
                                    <img src="timer.svg" />
                                </div>
                            </div>
                            <div className={styles.linesCont}>
                                <hr />
                            </div>
                            <div className={styles.nameCont}>
                                <span>Pausa entre bloques</span>
                            </div>
                        </div>
                        <div>
                            <div className={styles.wireCont}>
                                <div className={styles.bloqueCont}>
                                    <div className={styles.messageCont}></div>
                                    <div className={styles.messageCont}></div>
                                </div>
                            </div>
                            <div className={styles.linesCont}>
                                <div>
                                    <div></div>
                                    <hr />
                                </div>
                            </div>
                            <div className={styles.nameCont}>
                                <span>Pausa entre mensajes</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.shieldInputsCont}>
                        <div>
                            <h6>TAMAÑO DE BLOQUE (mensajes)</h6>
                            <div>
                                <div onClick={()=> { if(tamanoBloque != 0) setTamanoBloque(tamanoBloque - 1)}}>
                                    <span>-</span>
                                </div>
                                <input type="number" value={tamanoBloque} onChange={(e)=>{setTamanoBloque(parseInt(e.target.value))}} />
                                <div onClick={()=> { setTamanoBloque(tamanoBloque + 1)}}>
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h6>PAUSA ENTRE BLOQUES (segundos)</h6>
                            <div>
                                <div onClick={()=> { if(pausaBloque != 0) setPausaBloque(pausaBloque - 1)}}>
                                    <span>-</span>
                                </div>
                                <input type="number" value={pausaBloque} onChange={(e)=>{setPausaBloque(parseInt(e.target.value))}} />
                                <div onClick={ ()=> {setPausaBloque(pausaBloque + 1)} }>
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h6>PAUSA ENTRE MENSAJES (segundos)</h6>
                            <div>
                                <div onClick={()=> { if(pausaMensaje != 0) setPausaMensaje(pausaMensaje - 1)}}>
                                    <span>-</span>
                                </div>
                                <input type="number" value={pausaMensaje} onChange={(e)=>{setPausaMensaje(parseInt(e.target.value))}} />
                                <div onClick={ ()=> {setPausaMensaje(pausaMensaje + 1)} }>
                                    <span >+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <OrangeBtn text={'Activar'} onClick={ ()=>{ setShieldOptions( {
                        timer: pausaMensaje,
                        pausa : pausaBloque,
                        bloques: tamanoBloque
                    } ) ; setModalShieldOptions(false)}
                    } />

                </div>
            </div>
        </div>
    
    );
}

export default ModalShieldOptions;