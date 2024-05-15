import { STATUS } from '../../enums';
import { ILoginView } from './LoginView';

const base: ILoginView = {
    notification : {
        status : STATUS.SUCCESS,
        render : true,
        message : "string",
        modalReturn : (value) => {return false}
    },
    setNotification : (notification) => {return false},
}

export const mockLoginViewProps = {
    base
}