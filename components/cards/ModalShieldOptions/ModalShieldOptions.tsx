import { useEffect, useRef } from 'react';
import { EVENT_KEY } from '../../../enums';
import OrangeBtn from '../../OrangeBtn/OrangeBtn';
import CardTitle from '../CardTitle/CardTitle';
import styles from './ModalShieldOptions.module.css';

export interface IModalShieldOptions {
    
    setModalShieldOptions : (modal: boolean) => void;
    timer : [number, number];
    setTimer : (val:[number,number]) => void;
    bloques : number
    setBloques : (val:number) => void;
    pausa : number
    setPausa : (val:number) => void;
    setActiveShield : (val:boolean) => void;
}



// interface contactosArr extends Array<ContactInfo>{}

const ModalShieldOptions: React.FC<IModalShieldOptions> = ({setModalShieldOptions, timer=[20,25], setTimer, bloques=0, setBloques,
    pausa=0, setPausa, setActiveShield }) => {
    
    
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const inputRef3 = useRef<HTMLInputElement>(null);
    const inputRef4 = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
        inputRef2?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
        inputRef3?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
        inputRef4?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
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

    function guardarSetting() {
        
        setTimer([ Number.isNaN(parseInt(inputRef3.current!.value) ) ? 3 : parseInt(inputRef3.current!.value), Number.isNaN(parseInt(inputRef3.current!.value) ) ? 3 : parseInt(inputRef4.current!.value)] );  
        setPausa( Number.isNaN(parseInt(inputRef2.current!.value) ) ? 0 : parseInt(inputRef2.current!.value) );  
        setBloques( Number.isNaN(parseInt(inputRef.current!.value) ) ? 0 : parseInt(inputRef.current!.value) );
        setActiveShield(true)
        setModalShieldOptions(false); 
    }

    function handleEnter(event) {
        if (event.key == EVENT_KEY.ENTER ) guardarSetting()
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEnter);
        return () => {
            document.removeEventListener("keydown", handleEnter);
        };
    });

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
                            

                            <span>Una pausa aleatoria entre:</span>
                            <div>
                                <div onClick={()=> {  
                                     if (parseInt(inputRef3.current!.value) > 3) {
                                        setTimer( [parseInt(inputRef3.current!.value) - 1, timer[1]])
                                    }
                                 }}>
                                    <span>-</span>
                                </div>
                                <input
                                id="timer" ref={inputRef3} type="number" value={timer[0]} min={3} 
                                    onInput={ (e)=>{  setTimer([parseInt(e.currentTarget.value), timer[1]]) } }
                                    onBlur={ (e)=>{
                                        if (e.currentTarget.value == "" || parseInt(e.currentTarget.value) < 3) {
                                            setTimer([3, timer[1]])
                                        }
                                    } }
                                />
                                <div onClick={ ()=> {
                                        if (inputRef3.current!.value == "" ) {
                                            setTimer([3, timer[1]])
                                        }else{
                                            setTimer( [parseInt(inputRef3.current!.value) + 1, timer[1]] )
                                        }}}>
                                    <span >+</span>
                                </div>
                            </div>
                            {/* Segundo timer */}
                            <span>y:</span>
                            <div>
                                <div onClick={()=> {  
                                     if (parseInt(inputRef4.current!.value) > 3) {
                                        setTimer([timer[0] , parseInt(inputRef4.current!.value) - 1])
                                    }
                                 }}>
                                    <span>-</span>
                                </div>
                                <input
                                id="timer" ref={inputRef4} type="number" value={timer[1]} min={3} 
                                    onInput={ (e)=>{  setTimer([timer[0] ,parseInt(e.currentTarget.value)]) } }
                                    onBlur={ (e)=>{
                                        if (e.currentTarget.value == "" || parseInt(e.currentTarget.value) < 3) {
                                            setTimer([ timer[0], 3])
                                        }
                                    } }
                                />
                                <div onClick={ ()=> {
                                        if (inputRef4.current!.value == "" ) {
                                            setTimer([timer[0] ,3])
                                        }else{
                                            setTimer( [timer[0] ,parseInt(inputRef4.current!.value) + 1])
                                        }}}>
                                    <span >+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <OrangeBtn text={'Activar'} onClick={ ()=>{ guardarSetting() } } />
                    

                </div>
            </div>
        </div>
    
    );
}

export default ModalShieldOptions;