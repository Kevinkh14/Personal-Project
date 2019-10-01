import React,{Component} from 'react'
import UserNav from './UserNav'
import '../styles/userProfile.css'
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
            this.setState({profilePic:response.data})
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
        console.log({forum:e.target.value})
    }
    createForum =()=>{
        const {forum} = this.state
        axios.post(`/api/forum/`,{
            forum
        }
        ).then(response=>{
            this.setState({redirect:true})
        })
           
    }
    handleprofilePic=()=>{
        axios.post('/api/profile',{
            url:this.state.url
        })
        
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
            this.props.updateUser(response.data)
        })
    }
    getPastThreads =()=>{
        axios.get("/api/user/pastThreads").then(response=>{
            this.setState({pastThreads:response.data})
        })

    }
    render(){
            const widget = window.cloudinary.createUploadWidget(
                {
                cloudName: "kevin14",
                uploadPreset: "xoy9arl8",
                sources: ["local", "url", "dropbox", "facebook", "instagram"]
                },
                (error, result) => {
                this.checkUploadResult(error, result);
                })
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
                        <div className ='profile-container'>
                            <div className ='avatar'>{this.state.profilePic.map((img)=>{
                                return(
                                    <img src ={img.avatar_img_url}/>
                                )
                            })}</div>
                            <h1>{this.props.username}</h1>
                            <button onClick ={()=>widget.open()}>add pic</button>
                            <button onClick ={this.handleprofilePic}>set</button>
                        </div>
                        <input placeholder='Forum Name' onChange ={this.handleForumName}></input>
                        <button onClick={this.createForum}>create Forum</button>
                        <li className ='joined'>Joined Threads</li>
                        {/* <div>{this.pastThreads.map((individualThreads)=>{
                            return(
                                <Threads
                                forumName ={individualThreads.forum_name}
                                id ={individualThreads.forum_id}
                                updateThreads ={this.updateThreads}
                                />
                            )
                        })}</div> */}
                    </div>
                    <div className = "pastPostDiv">
                        <h2 className = 'pastPost'>Past Post</h2>
                        <div className = 'pastPost-container'>
                            {sortedPosts.map((individualPost,i) =>{
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
export default connect(undefined,{updateUser}) (UserProfile);