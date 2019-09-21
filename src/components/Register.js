import React,{Component} from 'react'
import {Link} from 'react-router-dom'

export default class Register extends Component{

    render(){
        return(
            <div>
                <Link to = "/">
                    <button>Home</button>
                </Link>
                <h1>Register</h1>
                <Link to = "/UserHome">
                    <button>Register</button>
                </Link>
            </div>
        )
    }
}
