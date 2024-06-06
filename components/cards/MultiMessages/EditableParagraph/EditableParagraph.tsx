import { useRef, useState } from 'react';
import styles from '../MultiMessages.module.css';

interface IEditableParagraph {
    msj : string;
    index : number;
    j : number;
    setPMessages: (pMessages: string[][]) => void;
    pMessages: string[][];
    content : string;
    setContent : (content: string) => void;
    range : any;
    setRange : (range: any) => void;
    handleBlur : (e, i, j) => void;
}


const EditableParagraph: React.FC<IEditableParagraph> = ({ msj="", index, j, setPMessages, pMessages, handleBlur}) => {

  const editableRef = useRef(null);
  const [range, setRange] = useState(null);


 

  function encodeName(contenido:string) {
    
    // let spannedCont = contenido.replace(/(\S)\[name\](\S)/g, "<span>[name]</span>");
    let resultado = contenido.replace(/\s*\[name\]\s*/g, ' <span>[name]</span> ');

    // Eliminar espacios duplicados
    resultado = resultado.replace(/\s+/g, ' ').trim();

    // Asegurarse de que termine con un espacio si es necesario
    if (!resultado.endsWith(' ') && resultado.length > 0) {
        resultado += '&nbsp;';
    }

    console.log(resultado);
    return resultado;
  }


  return (
    <div key={"pcontentnro"+index+j}>
      <p
        className={styles.editableParagraph}
        key={"editbalep"+index+j}
        contentEditable="true"
        ref={editableRef}
        onBlur={ (e)=> handleBlur(e, index, j)}
        dangerouslySetInnerHTML={{ __html: encodeName(msj) }}
        
        onChange={()=>console.log("change")}
      >
      </p>
    </div>
  );
}

export default EditableParagraph;