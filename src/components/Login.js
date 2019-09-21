import React,{Component} from 'react'
import {Link} from 'react-router-dom'

export default class Login extends Component{

    render(){
        return(
            <div>
                <Link to = "/">
                    <button>Home</button>
                </Link>
                <h1>login</h1>
                <Link to = '/UserHome'>
                    <button>Login</button>
                </Link>
            </div>
        )
    }
}
