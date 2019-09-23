import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/nav.css'

function Nav(props){
    return(
        <nav className = 'firstNav'>
            <div>
                <Link to ="/">
                    <button>Home</button>
                </Link>
            </div>
            <div className="loginRegister">
                <Link to ="login">
                    <button className= "login">Login</button>
                </Link>
                <Link to = "register">
                    <button className="register">Register</button>
                </Link>
            </div>
        </nav>
    )
}
export default Nav