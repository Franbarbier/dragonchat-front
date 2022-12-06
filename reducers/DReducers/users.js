export default (state=[], action) => {

    switch(action.type){

    //     case 'FETCH_ALL_USERS':
    //         return action.payload;
    //     case 'CREATE_USER':
    //         return [action.payload.newUser, ...state];
    //     case 'DELETE_USER':
    //         var id_deleted = action.payload.id
    //         return state.filter((user)=> user._id != id_deleted);
        case 'LOGIN':
            const response = action.payload

            if(response.error == 0){
                window.localStorage.setItem('token', response.token)
                window.localStorage.setItem('user', JSON.stringify(response.user))
                window.location = "/"
            }
            return {...state, login:response}
        
    //     case 'VERIFY_USER':
    //         return {...state, user: action.payload}

        default:
            return state;
    }

}