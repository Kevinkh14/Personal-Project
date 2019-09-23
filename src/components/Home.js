import React,{Component} from 'react'
import Nav from "./Nav"
import '../styles/home.css'

export default class Home extends Component{

    render(){
        return(
            <div>
                <Nav/>
                <h1>Home</h1>
            </div>
        )
    }
}
