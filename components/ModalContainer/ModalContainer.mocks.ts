import { IModalContainer } from './ModalContainer';

const Test : any = () => {
    return 'Compa!'
};

const base: IModalContainer = {
    children : Test,
    closeModal : ()=> console.log('Cerradpo')
}

export const mockModalContainerProps = {
    base
}