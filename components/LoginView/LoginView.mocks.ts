import { ILoginView } from './LoginView';

const base: ILoginView = {
    notification : {
        status : "success",
        render : true,
        message : "string",
        modalReturn : (value) => {return false}
    },
    setNotification : (notification) => {return false},
}

export const mockLoginViewProps = {
    base
}