import { useEffect, useRef } from 'react';
import CustomColorBtn from '../../CustomColorBtn/CustomColorBtn';
import CardTitle from '../CardTitle/CardTitle';
import CardStructure from './CardStructure';
import styles from './FreeCard.module.css';


export interface IFreeCard3 {
    activeCard : number;
    setModalPro : (value: boolean) => void;
    isPaid : boolean;
    timer : number;
    pausa : number;
    bloques : number;
    setTimer : (val:number) => void;
    setPausa : (val:number) => void;
    setBloques : (val:number) => void;

}



const FreeCard3: React.FC<IFreeCard3> = ({ activeCard, setModalPro, isPaid, timer=3,  pausa=0 , bloques=0, setTimer, setPausa, setBloques}) => {


    let idCard = 3;


    const inputRef = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const inputRef3 = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
        inputRef2?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
        inputRef3?.current?.addEventListener('wheel', function(e) { e.preventDefault(); }, { passive: false });
    },[])

    
      
    return (

            <CardStructure id_card={idCard} activeCard={activeCard} isPaid={isPaid} setModalPro={setModalPro}>
            <>
            { activeCard == idCard &&
            <>

            <div className={styles.card_container} >
                <CardTitle text={"ANTI-BLOCKER"} />
                <div className={styles.antiblockerInfo}>
                    <p>El Anti-Blocker está hecho para evitar el baneo de WhatsApp.<br/>Es una pausa entre tus envíos para desrobotizar la frecuencia con la que salen los mensajes.</p>
                    <CustomColorBtn
                        type="submit"
                        text="COMO FUNCIONA"
                        backgroundColorInit="#13013780"
                        backgroundColorEnd="#13013780"
                        borderColor="var(--newViolet)"
                        onClick={()=>{ console.log("asd")} }
                        />
                </div>
                <div className={styles.controls}>
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
                            <aside className={styles.infoInputs}>
                                    <span>i</span>
                                    <p>El tamaño de bloque es la cantidad de mensajes que se enviarán antes de hacer una "Pausa entre bloques" y luego seguirá enviando hasta alcanzar el nuevo bloque, y así consecutivamente.</p>

                                </aside>
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
                            <aside className={styles.infoInputs}>
                                    <span>i</span>
                                    <p>La "Pausa entre bloques" es el tiempo que se espera entre un bloque y otro para evitar el baneo de WhatsApp.</p>
                                </aside>

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
                            <aside className={styles.infoInputs}>
                                    <span>i</span>
                                    <p>La "Pausa entre destinatarios" es el tiempo que se espera entre el envío de un destinatario y otro, para evitar el baneo de WhatsApp.</p>
                                </aside>
                        </div>
                    </div>
                    <div className={styles.shieldInputsCont}>
                        <div>
                            {/* <h6>TAMAÑO DE BLOQUE (mensajes)</h6> */}
                            <div>
                                <div onClick={()=> {
                                    
                                    if (parseInt(inputRef.current!.value) > 0) {
                                        setBloques ( parseInt(inputRef.current!.value) - 1)
                                    }
                                }} >
                                    <span>-</span>
                                </div>
                                <input
                                onBlur={(e)=>{ if(e.currentTarget.value == '' || !isNaN(parseInt(e.currentTarget.value))) setBloques(0) } }
                                ref={inputRef} id="bloques" type="number" value={bloques} onChange={
                                    (e)=>{ setBloques(parseInt(e.target.value)) }
                                    } />
                                <div onClick={ ()=> {
                                    if (inputRef.current!.value == "" ) {
                                        setBloques(0)
                                    }else{
                                        setBloques ( parseInt(inputRef.current!.value) + 1)
                                    }
                                    }}>
                                    <span>+</span>
                                </div>
                                <p>destinatarios</p>
                                
                            </div>
                        </div>
                        <div>
                            {/* <h6>PAUSA ENTRE BLOQUES (minutos)</h6> */}
                            <div>
                                <div onClick={()=> { 
                                    if (parseInt(inputRef2.current!.value) > 0) {
                                        setPausa( parseInt(inputRef2.current!.value) - 1)
                                    }
                                 }}>
                                    <span>-</span>
                                </div>
                                <input
                                onBlur={ (e)=>{ if(e.currentTarget.value == '' || !isNaN(parseInt(e.currentTarget.value))) setPausa(0) } }
                                ref={inputRef2} id="pausa" type="number" value={pausa} onChange={
                                    (e)=>{ setPausa(parseInt(e.target.value)) }
                                    } />
                                <div onClick={ ()=> {
                                        if (inputRef2.current!.value == "" ) {
                                            setPausa(0)
                                        }else{
                                            setPausa( parseInt(inputRef2.current!.value) + 1)
                                        }}}>
                                    <span>+</span>
                                </div>
                                <p>minutos</p>
                                

                            </div>
                        </div>
                        <div>
                            {/* <h6>PAUSA ENTRE DESTINATARIOS (segundos)</h6> */}
                            <div>
                                <div onClick={()=> {  
                                     if (parseInt(inputRef3.current!.value) > 3) {
                                        setTimer( parseInt(inputRef3.current!.value) - 1)
                                    }
                                 }}>
                                    <span>-</span>
                                </div>
                                <input
                                id="timer" ref={inputRef3} type="number" value={timer} min={3} 
                                    onInput={ (e)=>{  setTimer(parseInt(e.currentTarget.value)) } }
                                    onBlur={ (e)=>{
                                        if (e.currentTarget.value == "" || parseInt(e.currentTarget.value) < 3) {
                                            e.currentTarget.value = '3'
                                        }
                                    } }
                                />
                                <div onClick={ ()=> {
                                        if (inputRef3.current!.value == "" ) {
                                            setTimer(3)
                                        }else{
                                            setTimer( parseInt(inputRef3.current!.value) + 1)
                                        }}}>
                                    <span >+</span>
                                </div>
                                <p>segundos</p>
                               
                            </div>
                        </div>
                    </div>


                </div>


            </div>
            </>
            }

       </>
        </CardStructure>
    
    );
}

export default FreeCard3;