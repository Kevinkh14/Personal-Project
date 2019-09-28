import React from 'react'
import {Switch,Route} from "react-router-dom"
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import UserHome from "./components/UserHome"
import UserProfile from "./components/UserProfile"
import Forums from "./components/Forums"

export default (
    <Switch>
        <Route path = "/profile" component ={UserProfile}/>
        <Route path = "/Login" component = {Login}/>
        <Route path = "/Register" component ={Register}/>
        <Route path = "/UserHome" component ={UserHome}/>
        <Route path = "/forum" component ={Forums}/>
        <Route exact path = "/" component ={Home}/>
    </Switch>
)