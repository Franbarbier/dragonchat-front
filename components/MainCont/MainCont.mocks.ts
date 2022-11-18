import { IMainCont } from './MainCont';

const Test : any = () => {
    return 'Compa!'
};

const base: IMainCont = {
    width: 50,
    children : Test
}

export const mockMainContProps = {
    base
}