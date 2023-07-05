import { STATUS } from '../../../enums';
import { IModalImportContacts } from './ModalImportContacts';

const base: IModalImportContacts = {
    setModalImport: () => {return false},
    uploadContacts: (contacts) => {return false},
    inheritFile: null,
    notification: {
        status : STATUS.ERROR,
        render : true,
        message : "El archivo debe ser un csv",
        modalReturn : () => {return false},
    },
    setNotification: (notification) => {return false}
}

export const mockModalImportProps = {
    base
}