import React,{Component} from 'react'
import Nav from "./Nav"
import '../styles/home.css'
import Post from './Post'
import axios from 'axios'

export default class Home extends Component{
    constructor(){
        super()
        this.state ={
            allPost:[]
        }
    }
    componentDidMount(){
        axios.get('/api/getNonUserPost').then(response=>{
            this.setState({allPost:response.data})
        })
    }

    render(){
        return(
            <div>
                <Nav/>
                <h1>Home</h1>
                <div className ='non-post'>
                {this.state.allPost.map((indivisualPost,i) =>{
                            return(
                                <>
                                    <Post
                                    content ={indivisualPost.content}
                                    update ={this.update}
                                    key ={i}
                                    />
                                </>
                            )
                        })}
                </div>
            </div>
        )
    }
}
