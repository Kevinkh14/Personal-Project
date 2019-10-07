import React,{Component} from 'react'
import Nav from "./Nav"
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
                <div className ='non-post'>
                {this.state.allPost.map((individualPost,i) =>{
                            return(
                                <>
                                    <Post
                                    content ={individualPost.content_of_post}
                                    update ={this.update}
                                    username={individualPost.username}
                                    url ={individualPost.img_url}
                                    likes = {individualPost.likes}
                                    profPic ={individualPost.avatar_img_url}
                                    onHome ={true}
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
