

const initialState ={
    user:{}
}

const UPDATE_USER ="UPDATE_USER";
// const GET_SESSION ="GET_SESSION"

// export function getSession(){
//     return {
//         type: GET_SESSION,
//         payload: axios.get('/auth/user')
//     }
// }

export function updateUser(user){
    return{
        type:UPDATE_USER,
        payload:user
    }
}
export default function reducer (state =initialState,action){
    // const {payload} =action
    switch(action.type){
        case UPDATE_USER:
            return{
                ...state,
                user:action.payload
            }
            // case GET_SESSION:
            //     return {
            //         ...state,
            //         user:payload.data.user
            //     }    
                default:return state;
            }
}