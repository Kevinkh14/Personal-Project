import React,{Component} from 'react'
import UserNav from './UserNav'
import '../styles/userHome.css'
import axios from 'axios'
import Post from './Post'


export default class UserHome extends Component{
    constructor(props){
        super(props)
        this.state={
            content:"",
            allPost:[]
        }

    }
    componentDidMount(){
        this.fetchPost();
    }
    handleChangeOfPost=(e)=>{
        this.setState({content:e.target.value})
    }
    handlePost=(e)=>{
        e.preventDefault()
        axios
            .post("/api/post",{
                content:this.state.content
            })
            this.fetchPost()
    }
    update= (allPost)=>{
        this.setState({allPost:allPost})
    }
    fetchPost=()=>{
        axios.get('/api/AllPost').then(response=>{
            this.setState({allPost:response.data})
        })           
    }

    render(){
        return(
            <div>
                <UserNav/>
                <div className='userHome'>
                    <div className ='post-div'>
                        {this.state.allPost.map((indivisualPost,index) =>{
                            return(
                                <>
                                    <Post
                                    content ={indivisualPost.content_of_post}
                                    update ={this.update}
                                    username ={indivisualPost.username}
                                    key={index}
                                    />
                                </>
                            )
                        })}
                    </div>
                    <footer className ='foot'>.</footer>
                    <div className = 'create-post'>
                        <input placeholder ='Create Post' onChange={this.handleChangeOfPost} style={{"cursor":"text"}}></input>
                        <button className ='create-post-but' onClick ={this.handlePost}>Create Post</button>
                    </div>
                </div>
            </div>
        )
    }
}
