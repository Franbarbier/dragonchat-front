import { useEffect, useRef } from 'react';
import OrangeBtn from '../../OrangeBtn/OrangeBtn';
import CardTitle from '../CardTitle/CardTitle';
import styles from './ModalShieldOptions.module.css';

export interface IModalShieldOptions {
    setShieldOptions : (limit: {
        timer: number,
        pausa : number,
        bloques: number
    }) => void;
    setModalShieldOptions : (modal: boolean) => void;
    tamanoBloque : number;
    setTamanoBloque : (tamano: number) => void;
    pausaBloque : number;
    setPausaBloque : (pausa: number) => void;
    pausaMensaje : number;
    setPausaMensaje : (pausa: number) => void;

}



// interface contactosArr extends Array<ContactInfo>{}

const ModalShieldOptions: React.FC<IModalShieldOptions> = ({ setShieldOptions, setModalShieldOptions, tamanoBloque, setTamanoBloque, pausaBloque, setPausaBloque, pausaMensaje, setPausaMensaje }) => {
    
    
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const inputRef3 = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
        inputRef2?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
        inputRef3?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
    },[])

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
                                <input ref={inputRef} type="number" value={tamanoBloque} onChange={
                                    (e)=>{ if (/[0123456789]/g.test(e.target.value)) setTamanoBloque(parseInt(e.target.value)) }
                                    } />
                                <div onClick={()=> { 
                                    if (Number.isNaN(tamanoBloque)) {
                                        setTamanoBloque(1)
                                    }else{
                                        setTamanoBloque(tamanoBloque + 1)}
                                    } }>
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
                                <input ref={inputRef2} type="number" value={pausaBloque} onChange={
                                    (e)=>{ if (/[0123456789]/g.test(e.target.value)) setPausaBloque(parseInt(e.target.value)) }
                                    } />
                                <div onClick={ ()=> {
                                    if (Number.isNaN(pausaBloque)) {
                                        setPausaBloque(1)
                                    }else{
                                        setPausaBloque(pausaBloque + 1)}
                                    } }>
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
                                <input ref={inputRef3} type="number" value={pausaMensaje} onChange={
                                    (e)=>{  if (/[0123456789]/g.test(e.target.value)) setPausaMensaje(parseInt(e.target.value)) }
                                    } />
                                <div onClick={ ()=> {
                                    if (Number.isNaN(pausaMensaje)) {
                                        setPausaMensaje(1)
                                    }else{
                                        setPausaMensaje(pausaMensaje + 1)}
                                    } }>
                                    <span >+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <OrangeBtn text={'Activar'} onClick={ ()=>{ setShieldOptions( {
                        timer: Number.isNaN(pausaMensaje) ? 0 : pausaMensaje,
                        pausa : Number.isNaN(pausaBloque) ? 0 : pausaBloque,
                        bloques: Number.isNaN(tamanoBloque) ? 0 : tamanoBloque
                    } ) ; setModalShieldOptions(false); } } />
                    

                </div>
            </div>
        </div>
    
    );
}

export default ModalShieldOptions;