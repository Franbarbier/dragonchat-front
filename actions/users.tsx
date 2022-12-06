
import * as api from '../api';
// import { LOGIN } from '../constants/actionTypes';


export const login = async (user) => {

    try{
        const data = await api.login(user)
        // dispatch({type: LOGIN, payload:data})
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }

}

export const signup = async (user) => {

    try{
        const data = await api.signup(user)
        // dispatch({type: LOGIN, payload:data})
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }

}
