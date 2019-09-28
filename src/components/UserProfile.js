import React,{Component} from 'react'
import UserNav from './UserNav'
import '../styles/userProfile.css'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Post from './Post'

export default class UserProfile extends Component{
    constructor(){
        super ()
        this.state={
            pastPost:[],
            username:"",
            forumName:"",
            createPostStatus:false,
            redirect :false
        }
    }
    componentDidMount(){
        axios.get("/api/user/post").then(response=>{
            this.setState({pastPost:response.data})
        })
        axios.get('/api/username').then(res=>{
            this.setState({username:res.data})
            console.log(res)
        })
    }
    update=(pastPost)=>{
        this.setState({pastPost:pastPost})
    }
    createForum =()=>{
        axios.post("/api/forum").then(response=>{
            this.setState({forumName:response.data})
            this.setState({redirect:true})
        })
    }
    render(){
        if (this.state.redirect === true){
           return <Redirect to ='/forum'/>
        }
        let sortedPosts = this.state.pastPost.sort((a, b) => {
            if(a.post_id < b.post_id) {
                return a
            } else if(b.post_id > a.post_id) {
                return b;
            } else {
                return 0;
            }
        })
        return(
            <div className='userProf'>
            
                <div>
                    <UserNav/>
                </div>
                <div className = 'profile'>
                    <div className='joined-profile'>
                        <div className ='profile-container'><h1>{this.state.username}</h1></div>
                      
                        <button onClick={this.createForum}>create Forum</button>
                        <li className ='joined'>Joined Threads</li>
                    </div>
                    <div className = "pastPostDiv">
                        <h2 className = 'pastPost'>Past Post</h2>
                        <div className = 'pastPost-container'>
                            {sortedPosts.map((individualPost,i) =>{
                                console.log(individualPost)
                                return(
                                    <>
                                        <Post
                                        content ={individualPost.content_of_post}
                                        id ={individualPost.post_id}
                                        url={individualPost.img_url}
                                        onUserProfile ={true}
                                        key ={i}
                                        update ={this.update}
                                        />
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
