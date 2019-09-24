import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/nav.css'

function Nav(props){
    return(
        <nav className = 'firstNav'>
            <div>
                <Link to ="/">
                    <button className='worp'>Worp</button>
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
            <div>
                <img className = 'imgone'src='https://cdn1.iconfinder.com/data/icons/different-menu-vol-2-1/512/menu_line_Bullet_Hamburger-512.png'/>
            </div>
            
        </nav>
    )
}
export default Nav