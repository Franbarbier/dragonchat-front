import { IFreeCard3 } from './SendFree';

const base: IFreeCard3 = {
    sampleTextProp : 'string',
    setActiveCard: (id) => {return true},
    activeCard : 1,
    contactos : [{nombre: 'pedro', numero: '5491134536136'}],
    messagesLimitAchieved : true,
    setMessagesLimitAchieved : (limit) => {return true},
    mensaje: 'string',
    setContactos : (contactos) => {return true}
}

export const mockFreeCard1Props = {
    base
}