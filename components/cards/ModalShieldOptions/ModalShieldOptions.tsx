import { useEffect, useRef } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import CardTitle from '../CardTitle/CardTitle';
import styles from './ModalShieldOptions.module.css';

export interface IModalShieldOptions {
    
    setModalShieldOptions : (modal: boolean) => void;
    timer : number
    setTimer : (val:number) => void;
    bloques : number
    setBloques : (val:number) => void;
    pausa : number
    setPausa : (val:number) => void;
    setActiveShield : (val:boolean) => void;
}



// interface contactosArr extends Array<ContactInfo>{}

const ModalShieldOptions: React.FC<IModalShieldOptions> = ({setModalShieldOptions, timer=3, setTimer, bloques=0, setBloques,
    pausa=0, setPausa, setActiveShield }) => {
    
    
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const inputRef3 = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
        inputRef2?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
        inputRef3?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
    },[])


    function handleChangeValue(input, value){
    
        // if starts with 0, remove the 0 and let the typed number
        if (input.current.value.startsWith("0") && input.current?.id != "timer" ) {
            input.current.value = value;
            return false;
        }

        if (input.current?.id == "timer" &&  value < 3  ) {
            input.current.value = 3;
            return false;
        }
        if ((input.current?.id == "bloques" && value < 0) || (input.current?.id == "pausa" && value < 0)) {
            input.current.value = 0;
            return false;
        }
    }

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
                                <span>Pausa entre destinatarios</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.shieldInputsCont}>
                        <div>
                            <h6>TAMAÑO DE BLOQUE (mensajes)</h6>
                            <div>
                                <div onClick={()=> {
                                    
                                    if (parseInt(inputRef.current!.value) > 0) {
                                        inputRef.current!.value = ( parseInt(inputRef.current!.value) - 1).toString()
                                    }
                                }} >
                                    <span>-</span>
                                </div>
                                <input ref={inputRef} id="bloques" type="number" defaultValue={bloques} onChange={
                                    (e)=>{ if (/[0123456789]/g.test(e.target.value)) handleChangeValue(inputRef, parseInt(e.target.value)) }
                                    } />
                                <div onClick={ ()=> {
                                    if (inputRef.current!.value == "" ) {
                                        inputRef.current!.value = "0"
                                    }else{
                                        inputRef.current!.value = ( parseInt(inputRef.current!.value) + 1).toString()
                                    }
                                    }}>
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h6>PAUSA ENTRE BLOQUES (minutos)</h6>
                            <div>
                                <div onClick={()=> { 
                                    if (parseInt(inputRef2.current!.value) > 0) {
                                        inputRef2.current!.value = ( parseInt(inputRef2.current!.value) - 1).toString()
                                    }
                                 }}>
                                    <span>-</span>
                                </div>
                                <input ref={inputRef2} id="pausa" type="number" defaultValue={pausa} onChange={
                                    (e)=>{ if (/[0123456789]/g.test(e.target.value)) handleChangeValue(inputRef2, parseInt(e.target.value)) }
                                    } />
                                <div onClick={ ()=> {
                                        if (inputRef2.current!.value == "" ) {
                                            inputRef2.current!.value = "0"
                                        }else{
                                            inputRef2.current!.value = ( parseInt(inputRef2.current!.value) + 1).toString()
                                        }}}>
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h6>PAUSA ENTRE DESTINATARIOS (segundos)</h6>
                            <div>
                                <div onClick={()=> {  
                                     if (parseInt(inputRef3.current!.value) > 3) {
                                        inputRef3.current!.value = ( parseInt(inputRef3.current!.value) - 1).toString()
                                    }
                                 }}>
                                    <span>-</span>
                                </div>
                                <input id="timer" ref={inputRef3} type="number" defaultValue={timer} min={3} 
                                    onInput={ (e)=>{  handleChangeValue(inputRef3, parseInt(e.currentTarget.value)) } }
                                />
                                <div onClick={ ()=> {
                                        if (inputRef3.current!.value == "" ) {
                                            inputRef3.current!.value = "3"
                                        }else{
                                            inputRef3.current!.value = ( parseInt(inputRef3.current!.value) + 1).toString()
                                        }}}>
                                    <span >+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CustomColorBtn
                        type="submit"
                        text={ "Activar" }
                        backgroundColorInit={ "#c21c3b" }
                        backgroundColorEnd={ "#f9bd4f" }
                        borderColor={ "#e17846"}
                        onClick={() => {
                            setTimer( Number.isNaN(parseInt(inputRef3.current!.value) ) ? 3 : parseInt(inputRef3.current!.value) );  
                            setPausa( Number.isNaN(parseInt(inputRef2.current!.value) ) ? 0 : parseInt(inputRef2.current!.value) );  
                            setBloques( Number.isNaN(parseInt(inputRef.current!.value) ) ? 0 : parseInt(inputRef.current!.value) );
                            setActiveShield(true)
                            setModalShieldOptions(false); 
                        }}
                    />
                    

                </div>
            </div>
        </div>
    
    );
}

export default ModalShieldOptions;