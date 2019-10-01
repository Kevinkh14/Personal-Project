import React,{Component} from 'react'
import UserNav from './UserNav'
import {Redirect} from 'react-router-dom'
import '../styles/userHome.css'
import axios from 'axios'
import Post from './Post'


export default class Forums extends Component{
    constructor(props){
        super(props)
        this.state={
            content:"",
            allPost:[],
            url:""
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
        console.log(this.state.url)
        axios
            .post("/api/post",{
                content:this.state.content,
                url:this.state.url
            })
            this.fetchPost()
    }
    update= (allPost)=>{
        this.setState({allPost:allPost})
    }
    fetchPost=()=>{
        axios.get('/api/forumPost').then(response=>{
            this.setState({allPost:response.data})
        })           
    }
    checkUploadResult = (error,resultEvent) => {
        if (resultEvent.event === "success") {
            console.log("Picture uploaded successfully")
            console.log(resultEvent.info.url);
            this.setState({url: resultEvent.info.url});
        }
    };
    //cloudinary
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
          
        return(
            <div>
                <UserNav/>
                <div className='userHome'>
                    {this.props.forum}
                    <div className ='post-div'>
                        {this.state.allPost.map((individualPost,index) =>{
                            return(
                                <>
                                    <Post
                                    content ={individualPost.content_of_post}
                                    username ={individualPost.username}
                                    url ={individualPost.img_url}
                                    key={index}
                                    update ={this.update}
                                    />
                                </>
                            )
                        })}
                    </div>
                    <footer className ='foot'>.</footer>
                    <div className = 'create-post'>
                        <input placeholder ='Create Post' onChange={this.handleChangeOfPost} style={{"cursor":"text"}}></input>
                            <button className ='create-post-but' onClick ={this.handlePost}>Create Post</button>
                        <button onClick ={()=>widget.open()}>add pic</button>
                    </div>
                </div>
            </div>
        )
    }
}
