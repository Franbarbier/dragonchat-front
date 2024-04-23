import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import styles from './CopyPasteTuto.module.css';



export interface ICopyPasteTuto {
    setTuto : (val:string) => void
}


const CopyPasteTuto: React.FC<ICopyPasteTuto> = ({ setTuto }) => {


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
                    <h4>Ahora puedes copiar y pegar listas desde una hoja de calculos </h4>
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
                    <video src="dc_explica_copypaste.mp4" autoPlay loop muted></video>
                </aside>

                {show && <button onClick={()=> setTuto("nunca")}>ENTENDIDO</button> }
                

            </div>
           </div>
        </AnimatePresence>
    
    );
}

export default CopyPasteTuto;
