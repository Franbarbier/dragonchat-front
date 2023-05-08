import { IFreeCard3 } from './SendFree';

const base: IFreeCard3 = {
    sampleTextProp : "string",
    setActiveCard: (id: number) => {return false},
    activeCard : 3,
    contactos : [],
    messagesLimitAchieved : true,
    setMessagesLimitAchieved : (limit) => {return false},
    mensaje: "string" ,
    setContactos : (contactos) => {return false},
    modalShieldOptions : false,
    setModalShieldOptions : (limit) => {return false},
    shieldOptions : {
        timer: 3,
        pausa : 3,
        bloques: 3
    },
}

export const mockFreeCard1Props = {
    base
}