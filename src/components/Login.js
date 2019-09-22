import React,{Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser} from '../redux/userReducer'

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

     handleLoginClick=()=>{
        const {username, password} = this.state;
        if(username === "" && password === "") {
            this.setState({triedToClick: true});
        } else {
            axios.post("/auth/login", {
                username, password
            }).then(response => {
                this.props.updateUser(response.data);
                this.setState({shouldRedirect: true,})
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
                <Link to = "/">
                    <button>Home</button>
                </Link>
                <h1>login</h1>
                <input placeholder="Username" name = "username" onChange ={this.handleChange}></input>
                <input placeholder="Password" name ="password" onChange ={this.handleChange}></input>
                <button onClick ={this.handleLoginClick}>Login</button>
                
            </div>
        )
    }
}
export default connect(undefined,{
    updateUser
})(Login)