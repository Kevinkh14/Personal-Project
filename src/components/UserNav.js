import React,{Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import '../styles/userNav.css'
import {connect} from 'react-redux'
import {updateUser} from '../redux/userReducer'
import axios from 'axios'


class UserNav extends Component{
    constructor(props){
        super(props)
        this.state={
            redirect:false,
            menuOpenStatus:'side-menu'
        }
    }
    toggle=()=>{
        if(this.state.menuOpenStatus ==="side-menu-close"|| this.state.menuOpenStatus ==="side-Menu"){
            this.setState({menuOpenStatus: "side-menu-open"});
        }
        else if(this.state.menuOpenStatus ==="side-menu-open"){
            this.setState({menuOpenStatus:"side-menu-close"})
        }
    }
    
    logout=()=>{
        axios
        .get('/auth/logout')
        .then(()=>{
            this.props.updateUser({})
            this.setState({redirect:true})
        })
        .catch(err=>console.log(err))
    }
    render(){
        if(this.state.redirect === true){
            return <Redirect to = "/"/>
        }
        return(
            <div className ='nav-div'>
            <nav className ='usernav'>
                <div>
                    <Link to ="/UserHome">
                        <button className ='worp'>Worp</button>
                    </Link>
                </div>
                <div>
                    <input placeholder ='Search' className ='search-bar'></input>
                </div>
                <div>
                   <button  className ='hamBut'> <img onClick ={this.toggle}className ='imgtwo' src='https://cdn1.iconfinder.com/data/icons/different-menu-vol-2-1/512/menu_line_Bullet_Hamburger-512.png'/></button>

                </div>
                    <div className ={`${this.state.menuOpenStatus}hidden-by-default`}>
                        <Link to = '/Profile'>
                            <button>profile</button>
                        </Link>
                        <button onClick ={this.logout}>Logout</button>
                    </div>
            </nav></div>
        )
    }
}
export default connect(undefined,{
    updateUser
})(UserNav)