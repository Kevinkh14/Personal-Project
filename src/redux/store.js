import {createStore, combineReducers,applyMiddleware} from 'redux'
import userReducer from './userReducer'
import forumReducer from './forumReducer'
import commentReducer from './commentReducer'
import promise from 'redux-promise-middleware'

const rootReducer = combineReducers({
    userReducer,
    forumReducer,
    commentReducer
})

export default  createStore(rootReducer,applyMiddleware(promise))