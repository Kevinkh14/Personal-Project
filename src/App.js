import React from 'react';
import './App.css';
import routes from "./routes"
import {connect} from "react-redux"
import{updateUser} from './redux/userReducer'
import axios from 'axios';

class App extends React.Component{

  componentDidMount(){
    axios.get("/auth/user").then(response=>{
      console.log(response.data)
      this.props.updateUser(response.data)
      // this.props.getSession()
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
