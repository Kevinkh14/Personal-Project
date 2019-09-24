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
        axios.get('/api/AllPost').then(response=>{
            this.setState({allPost:response.data})
        })
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
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    update= (allPost)=>{
        this.setState({allPost:allPost})
    }

    render(){
        return(
            <div>
                <UserNav/>
                <div className='userHome'>
                    <div className ='post-div'>
                        <h1>User Home</h1>
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
                    <div className = 'create-post'>
                        <input placeholder ='Create Post' onChange={this.handleChangeOfPost} style={{"cursor":"text"}}></input>
                        <button className ='create-post-but' onClick ={this.handlePost}>Create Post</button>
                    </div>
                </div>
                <footer>
                    
                </footer>
            </div>
        )
    }
}
