import { IFreeCard2 } from './MessageFree';

const base: IFreeCard2 = {
    sampleTextProp : "string",
    setActiveCard: (id) => {return false},
    activeCard : 3,
    mensaje : "string",
    setMensaje: (msj) => {return false},
    setSelectedSecuence:  (seq) => {return false},
    selectedSecuence : null,
    setReadyMessage : (ready) => {return false}
}

export const mockFreeCard2Props = {
    base
}