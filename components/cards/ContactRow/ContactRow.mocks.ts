import { IContactRow } from './ContactRow';

const base: IContactRow = {
    contact : {name: '', wpp: ''},
    campos : ['Campo1', 'Campo2']
}

export const mockContactRowProps = {
    base
}