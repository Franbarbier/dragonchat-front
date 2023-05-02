import { IFreeCard2 } from './MessageFree';

const base: IFreeCard2 = {
    sampleTextProp : "string",
    setActiveCard: (id: number) => {return false},
    activeCard : 3,
    mensaje : "string",
    setMensaje: (msj) => {return false},
    setSelectedSecuence:  (secuence) => {return false},
    selectedSecuence : null,
    setReadyMessage : (ready) => {return false},
    setBreadcrumb : (breadcrumb) => {return false},
}

export const mockFreeCard2Props = {
    base
}