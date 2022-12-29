import { IFreeCard3 } from './SendFree';

const base: IFreeCard3 = {
    sampleTextProp : 'string',
    setActiveCard: () => {},
    activeCard : 3,
    contactos : [{
        name: 'asd',
        wpp: '5491136'
    }],
    setContactos : () => {},
    mensaje: "tuqui"
}

export const mockFreeCard1Props = {
    base
}