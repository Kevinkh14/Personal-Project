import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/nav.css'

class Nav extends React.Component{
    constructor(){
        super()
        this.state={
            menuOpenStatus :'down-menu'
        }
    }

    toggle=()=>{
        if(this.state.menuOpenStatus ==="down-menu-close"|| this.state.menuOpenStatus ==="down-menu"){
            this.setState({menuOpenStatus: "down-menu-open"});
        }
        else if(this.state.menuOpenStatus ==="down-menu-open"){
            this.setState({menuOpenStatus:"down-menu-close"})
        }
    }
    render(){
        return(
            <div>
                <div className ={this.state.menuOpenStatus}>
                    <Link to ="login">
                        <button className= "login">Login</button>
                    </Link>
                    <Link to = "register">
                        <button className="register">Register</button>
                    </Link>
                </div>
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
                        <button className= 'hamBut' onClick = {this.toggle}>
                            <img className = 'imgone'src='https://cdn1.iconfinder.com/data/icons/different-menu-vol-2-1/512/menu_line_Bullet_Hamburger-512.png' alt=''/>
                        </button>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Nav