import { IInputGral } from './InputGral';

const base: IInputGral = {
    type : "text",
    placeholder : "Hola",
    name : "text1",
    value : "Este es el val",
    onChange : ()=>{ return 'jaja' } 
}

export const mockInputGralProps = {
    base
}