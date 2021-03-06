import React,{Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser} from '../redux/userReducer'
// import '../styles/login.css'


 class Login extends Component{
     constructor(){
         super()
         this.state={
             username:"",
             password:"",
             redirect:false,
             triedToClick:false,
             serverErrorMessage:""
         }
     }
     handleChange =(e)=>{
         this.setState({[e.target.name]:e.target.value})
     }

     handleLoginClick=(e)=>{
        const {username, password} = this.state;
        if(username === "" && password === "") {
            this.setState({triedToClick: true});
        } else {
            axios.post("/auth/login", {
                username, password
            }).then(response => {
                this.props.updateUser(response.data);
                this.setState({redirect: true})
            }).catch(err => {
                this.setState({serverErrorMessage: err.response.data.error});
            })
        }
     }
    render(){
        if(this.state.redirect === true){
            return <Redirect to = "/UserHome"/>
        }
        return(
            <div>
                <div className = "regDiv">
                    <nav className = 'worpNav'>
                        <Link to = "/">
                            <button className ='worp'>Worp</button>
                        </Link>
                    </nav>
                    <div className ='inputs'>
                        {this.state.serverErrorMessage !== "" ? <li className ='errorMessage'>{this.state.serverErrorMessage}</li> : null}
                        <h1 style ={{"fontFamily": "'Saira', sans-serif"}}>Login</h1>
                        <input placeholder="Username" name = "username" onChange ={this.handleChange} className ='user-name' type='text'></input>
                        <input placeholder="Password" name ="password" onChange ={this.handleChange} className ='pass-word' type ='password'></input>
                        <button onClick ={this.handleLoginClick} className ="loginBut">Login</button>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default connect(undefined,{
    updateUser
})(Login)