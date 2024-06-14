import { useRef, useState } from 'react';
import styles from '../MultiMessages.module.css';

interface IEditableParagraph {
    msj : string;
    index : number;
    j : number;
    setPMessages: (pMessages: string[][]) => void;
    pMessages: string[][];
    content : [number, number];
    setContent : (content: [number, number]) => void;
    range : any;
    setRange : (range: any) => void;
    handleBlur : (e, i, j) => void;
    setTestNext: (val: boolean) => void;
}


const EditableParagraph: React.FC<IEditableParagraph> = ({ msj="", index, j, setPMessages, pMessages, handleBlur, setTestNext}) => {

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
        
        onInput={(e)=>{ 
          const target = e.target as HTMLInputElement;
          if(target?.innerText?.length > 0){
            setTestNext(true);
          }
        }}
      >
      </p>
    </div>
  );
}

export default EditableParagraph;