import React from 'react'
import {Link} from 'react-router-dom'

function Nav(props){
    return(
        <nav>
            <Link to ="/">
                <button>Home</button>
            </Link>
            <Link to ="login">
                <button>Login</button>
            </Link>
            <Link to = "register">
                <button>Register</button>
            </Link>
        </nav>
    )
}
export default Nav