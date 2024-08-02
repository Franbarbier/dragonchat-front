import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import styles from './AdjuntarFree.module.css';



export interface IAdjuntarFree {
    setTuto : (val:string) => void
    tuto? : string
}


const AdjuntarFree: React.FC<IAdjuntarFree> = ({ setTuto, tuto }) => {

    const [show, setShow] = useState(false);

    const handleOuterClick = () => {
        setTuto("desp")
    };
    
    const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <AnimatePresence>
           <div className={styles.AdjuntarFree} onClick={handleOuterClick} >
            <div onClick={handleInnerClick}>
                <div>
                    <h4>Ahora podes adjuntar archivos</h4>
                    <div style={{"display":"flex"}}>

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
                </div>

                <aside className={styles.notShow} onClick={()=> setTuto("nunca")}>
                    <span>x</span> <i>No volver a mostrar</i>
                </aside>
               <aside style={{'display': show ? 'block' : 'none' }} className={styles.adjuntar_info}>
                    <p>
                         Agregamos la posibilidad de adjuntar archivos a tus mensajes. Los usuarios de DragonChat 1.0 van a tener esta funcionalidad disponible durante Agosto. Luego solo estará disponible para los usuarios 2.0.
                    </p>
                    <img src="/adjuntar_help.png" alt="adjuntar_help" style={{"height": "auto", "maxWidth":"100%" }} />
               </aside>

                {show && <button onClick={()=> setTuto("nunca")}>ENTENDIDO</button> }
                

            </div>
           </div>
        </AnimatePresence>
    
    );
}

export default AdjuntarFree;
