import { IFreeCard2 } from './MessageFree';

const base: IFreeCard2 = {
    sampleTextProp : "string",
    setActiveCard: (num) => {return false;} ,
    activeCard : 2,
    mensaje : "string",
    setMensaje: (msj) => {return false;},
    setSelectedSecuence: (num) => {return false;} ,
    selectedSecuence : null,
    setReadyMessage : (ready) => {return false;} 
}

export const mockFreeCard2Props = {
    base
}