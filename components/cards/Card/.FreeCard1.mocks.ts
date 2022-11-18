import { IFreeCard1 } from './RecipientsFree';

const base: IFreeCard1 = {
    sampleTextProp: 'Hello World!',
    setActiveCard: () => {},
    activeCard : 1,
    contactos : [{
        name: 'compa',
        wpp: '54911'
    }],
    handleNewContact: () => {},
    handleDeleteContact : () => {},
    handleRenderModal : () => {}

}

export const mockFreeCard1Props = {
    base
}