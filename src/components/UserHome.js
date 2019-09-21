import React,{Component} from 'react'
import UserNav from './UserNav'

export default class UserHome extends Component{

    render(){
        return(
            <div>
                <UserNav/>
                <h1>User Home</h1>
            </div>
        )
    }
}
