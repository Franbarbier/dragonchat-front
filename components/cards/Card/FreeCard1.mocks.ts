import { IFreeCard1 } from './RecipientsFree';

const base: IFreeCard1 = {
    sampleTextProp : "string",
    setActiveCard: (id) => {return false},
    setContactos : (contactos) => {return false},
    activeCard : 8,
    contactos : [],
    handleNewContact: (newContact) => {return false},
    handleDeleteContact : (contact) => {return false},
    handleRenderModal : (render) => {return false},
    finalList : [],
    setDroppedCsv : (droppedCsv) => {return false}


}
export const mockFreeCard1Props = {
    base
}