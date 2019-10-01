const initialState ={
    forum :{}
}
const UPDATE_FORUM = 'UPDATE_FORUM'

export function updateForum (forum){
    return{
        type:UPDATE_FORUM,
        payload:forum
    }
}
    export default function reducer (state=initialState,action){
        switch(action.type){
            case UPDATE_FORUM:
                return{
                    ...state,
                    forum:action.payload
                }
                default:return state
        }
    }
