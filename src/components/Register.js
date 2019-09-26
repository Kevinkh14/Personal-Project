import React,{Component} from 'react'
import axios from 'axios'
import {Link,Redirect} from 'react-router-dom'
import{connect} from "react-redux"
import {updateUser} from '../redux/userReducer'
import '../styles/register.css'

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
            <div >
                <nav>
                    <Link to = "/">
                        <button className ='worp'>Worp</button>
                    </Link>
                </nav>
                <div>
                </div>
                <div className="regDiv">
                    <div className='inputs'>
                        {this.state.triedToClick === true ? <li className ='errorMessage'>Please Fill in all the Fields.</li> : null}
                        {this.state.serverErrorMessage !== "" ? <li className ='errorMessage'>{this.state.serverErrorMessage}</li> : null}
                        <h1 style ={{"fontFamily": "'Saira', sans-serif"}}>Register</h1>
                        <input placeholder ="Username" name ="username" onChange={this.handleChange}className="username"></input>
                        <input placeholder="Password" name ="password" onChange={this.handleChange}className="password" type ='password'></input>
                        <input placeholder ="Email" name ="email" onChange={this.handleChange}className = "email"></input>
                        <button onClick ={this.handleRegister} className="signUP">Register</button>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default connect (undefined,{
    updateUser
})(Register)