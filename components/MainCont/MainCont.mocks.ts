import { IMainCont } from './MainCont';

const Test : any = () => {
    return 'Compa!'
};

const base: IMainCont = {
    width: 50,
    maxWidth: 1200,
    children : Test
}

export const mockMainContProps = {
    base
}