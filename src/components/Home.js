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
        axios.get("/api/profile").then(response=>{
            this.setState({url:response.data[0].avatar_img_url})
        
    })
    }

    
    

    render(){
        return(
            <div>
                <Nav/>
                <div className ='non-post'>
                {this.state.allPost.map((individualPost,i) =>{
                    console.log(individualPost)
                            return(
                                <>
                                    <Post
                                    content ={individualPost.content_of_post}
                                    update ={this.update}
                                    username={individualPost.username}
                                    url ={individualPost.img_url}
                                    key ={i}
                                    />
                                </>
                            )
                        })}
                </div>
                <footer>
                    
                </footer>
            </div>
        )
    }
}
