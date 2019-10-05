import React from 'react';
import './App.css';
import routes from "./routes"
import {connect} from "react-redux"
import{updateUser} from './redux/userReducer'
import axios from 'axios';
import style from './styles/Main.scss'

class App extends React.Component{

  componentDidMount(){
    axios.get("/auth/user").then(response=>{
      console.log(response.data)
      this.props.updateUser(response.data)
    })
  }

  render(){
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}
export default connect(undefined,{updateUser}) (App);
