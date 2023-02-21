import { IFreeCard3 } from './SendFree';

const base: IFreeCard3 = {
    sampleTextProp : 'string',
    setActiveCard: () => {},
    activeCard : 3,
    contactos : [{
        nombre: 'asd',
        numero: '5491136'
    }],
    setContactos : () => {},
    mensaje: "tuqui"
}

export const mockFreeCard1Props = {
    base
}