import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import styles from './AntiBlockerTuto.module.css';



export interface IAntiBlockerTuto {
    setTuto : (val:string) => void
}


const AntiBlockerTuto: React.FC<IAntiBlockerTuto> = ({ setTuto }) => {


    const [show, setShow] = useState(false);


    const handleOuterClick = () => {
        setTuto("desp")
      };
    
      const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      };

    return (
        <AnimatePresence>
           <div className={styles.tutoBackground} onClick={handleOuterClick} >
            <div onClick={handleInnerClick}>
                <div>
                    <h4>Conoces la funcion "Anti Blocker"? Te permite espaciar por bloques y tiempo el envío de mensajes </h4>
                    <div style={{"transform": show ? "scale(0)" : "scale(1)"}}>
                        <CustomColorBtn
                            type="submit"
                            text="Ver como"
                            backgroundColorInit="#13013780"
                            backgroundColorEnd="#13013780"
                            borderColor="var(--newViolet)"
                            onClick={()=>{ setShow(true) }}
                            />
                    </div>
                    <div style={{"marginLeft" : "1.5%" }}>
                        <CustomColorBtn
                            type="submit"
                            text="Ahora no"
                            backgroundColorInit="#13013780"
                            backgroundColorEnd="#13013780"
                            borderColor="var(--newViolet)"
                            onClick={ ()=> {setTuto("desp")} }
                        />
                    </div>
                </div>

                <aside className={styles.notShow} onClick={()=> setTuto("nunca")}>
                    <span>x</span> <i>No volver a mostrar</i>
                </aside>
                <aside className={styles.videoCont} style={{"height": show ? "70vh" : "0vh", "marginTop" : show ? "5%" : "0" }}>
                    <video src="dc_explica_antiblock_1.mp4" autoPlay loop muted></video>
                </aside>

                {show && <button onClick={()=> setTuto("nunca")}>ENTENDIDO</button> }
                

            </div>
           </div>
        </AnimatePresence>
    
    );
}

export default AntiBlockerTuto;
