import axios from 'axios';
import { Switch } from '@material-ui/core';

const initialState = {
    comments:[]
}



const GET_COMMENTS = 'GET_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'

export function getComments(post_id) {
    let data = axios.get(`/api/comments/${post_id}`)
    return {
        type: GET_COMMENTS,
        payload: data,
        console:console.log(data) 
    }
}
export function addComment(postid,comments) {
    return {
        type: ADD_COMMENT,
        payload: axios.post(`/api/comment/${postid}`,comments),
    };
}
export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case `${GET_COMMENTS}_FULFILLED`:
            return{
                ...state,
                comments: payload.data.comment, 
               
            }
        case `${ADD_COMMENT}_FULFILLED`:
            return{
                ...state,
                comments: payload.data.comment
            }
        default: return state
    }
}    