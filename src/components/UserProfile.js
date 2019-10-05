import React,{Component} from 'react'
import UserNav from './UserNav'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Post from './Post'
import Threads from './Threads'
import {connect} from 'react-redux'
import {updateUser} from '../redux/userReducer'

class UserProfile extends Component{
    constructor(props){
        super (props)
        this.state={
            pastPost:[],
            pastThreads:[],
            username:"",
            forum:"",
            profilePic:[],
            url:"",
            id:"",
            forumId:"",
            createPostStatus:false,
            redirect :false
        }
    }
    componentDidMount(){
        axios.get("/api/user/post").then(response=>{
            this.setState({pastPost:response.data})
        })
        this.getProfilePic()
        this.getUser()
        this.getPastThreads()
    }
    getProfilePic=()=>{
        axios
        .get("/api/profile").then(response=>{
            this.setState({url:response.data[0].avatar_img_url})
        })
    }
    update=(pastPost)=>{  
        this.setState({pastPost:pastPost})
    }
    updateThreads=(pastThreads)=>{
        this.setState({pastThreads:pastThreads})
    }
    handleForumName=(e)=>{
        this.setState({forum:e.target.value})
    }
    createForum =()=>{
        const {forum,id,forumId} = this.state
        console.log(this.state)
        axios.post(`/api/forum`,{
            forum, id, forumId
        }
        ).then(response=>{
            this.setState({redirect:true})
            console.log(this.state.id)
            console.log(response)
        })
           
    }
    handleprofilePic=()=>{
        const{url}=this.state
        axios.post('/api/profile',{
           url
        })
        console.log(url)
        
    }
    checkUploadResult = (error,resultEvent) => {
        if (resultEvent.event === "success") {
            console.log("Picture uploaded successfully")
            console.log(resultEvent.info.url);
            this.setState({url: resultEvent.info.url});
        }
    };
    getUser=()=>{
        axios.get("/auth/user").then(response=>{
            console.log(response.data)
            this.setState({username:response.data.username,id:response.data.id})
        })
    }
    getPastThreads =()=>{
        axios.get("/api/pastThreads").then(response=>{
            this.setState({pastThreads:response.data})
        })

    }
    render(){
            const widget = window.cloudinary.createUploadWidget(
                {
                cloudName: "kevin14",
                uploadPreset: "xoy9arl8",
                sources: ["local", "url", "dropbox", "facebook", "instagram"],
                
                },
                (error, result) => {
                this.checkUploadResult(error, result);
                })
        if (this.state.redirect === true){
           return <Redirect to ='/forum'/>
        }
        // let sortedPosts = this.state.pastPost.sort((a, b) => {
        //     if(a.post_id < b.post_id) {
        //         return a
        //     } else if(b.post_id > a.post_id) {
        //         return b;
        //     } else {
        //         return 0;
        //     }
        // })
        return(
            <div className='userProf'>
            
                <div>
                    <UserNav/>
                </div>
                <div className = 'profile'>
                    <div className='joined-profile'>
                        <div className ='profile-container'>
                            <div className ='avatar'>
                            <img className='avatarImg' src ={this.state.url} alt =""/>
                            </div>
                            <h1 className ='usernameh1'>{this.state.username}</h1>
                            <button className ='pic-but' onClick ={()=>widget.open()}>Add Profile Picture</button>
                            <button className ='set-but' onClick ={this.handleprofilePic}>Set Profile Picture</button>
                        </div>
                        <input className ='createThread-input' placeholder='Thread Name' onChange ={this.handleForumName}></input>
                        <button className ='createThread' onClick={this.createForum}>Create Thread</button>
                        <li className ='joined'>Joined Threads</li>
                        <div>{this.state.pastThreads.map((individualThreads)=>{
                            console.log(individualThreads)
                            return(
                                <Threads
                                forum ={individualThreads.forum_name}
                                forumid ={individualThreads.forum_id}
                                updateThreads ={this.updateThreads}
                                />
                            )
                        })}</div>
                    </div>
                    <div className = "pastPostDiv">
                        <h2 className = 'pastPost'>Past Post</h2>
                        <div className = 'pastPost-container'>
                            {this.state.pastPost.map((individualPost,i) =>{
                                console.log(individualPost)
                                return(
                                    <>
                                        <Post
                                        content ={individualPost.content_of_post}
                                        id ={individualPost.post_id}
                                        url={individualPost.img_url}
                                        onUserProfile ={true}
                                        onHome ={false}
                                        likes ={individualPost.likes}
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
export default connect(undefined,{updateUser}) (UserProfile);