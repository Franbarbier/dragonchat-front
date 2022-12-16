
import * as api from '../api';
// import { LOGIN } from '../constants/actionTypes';


export const sendMessage = async (bodyContent) => {

    try{
        const data = await api.sendMessage(bodyContent)
        // dispatch({type: LOGIN, payload:data})
        return data
    }catch(error){
        console.log(error)
    }

}


