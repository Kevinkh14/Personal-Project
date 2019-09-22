import React,{Component} from 'react'
import axios from 'axios'
import {Link,Redirect} from 'react-router-dom'
import{connect} from "react-redux"
import {updateUser} from '../redux/userReducer'

 class Register extends Component{
    constructor(){
        super();
        this.state={
            username:"",
            password:"",
            email:"",
            redirect:false,
            triedToClick:false,
            serverErrorMessage:""
        }
    }
    handleChange=e=>{    
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleRegister=()=>{
        const {username,password,email} = this.state;
        if(username!==""&&password!==""&&email!==""){
            axios.post("/auth/register",{
                username,password,email
            }).then(response =>{
                this.props.updateUser(username,email)
                this.setState({redirect:true})
            }).catch(err =>{this.setState({serverErrorMessage:err.response.data.error})})
        }else{
            this.setState({triedToClick:true})
        }
    }

    render(){
        if(this.state.redirect ===true){
            return <Redirect to= "/UserHome"/>
        }
        return(
            <div>
                {this.state.triedToClick === true ? <h1>Please Fill in all the Fields</h1> : null}
                {this.state.serverErrorMessage !== "" ? <h1>{this.state.serverErrorMessage}</h1> : null}
                <Link to = "/">
                    <button>Home</button>
                </Link>
                <h1>Register</h1>
                <input placeholder ="Username" name ="username" onChange={this.handleChange}></input>
                <input placeholder="Password" name ="password" onChange={this.handleChange}></input>
                <input placeholder ="Email" name ="email" onChange={this.handleChange}></input>
                <button onClick ={this.handleRegister}>Register</button>
                
            </div>
        )
    }
}
export default connect (undefined,{
    updateUser
})(Register)