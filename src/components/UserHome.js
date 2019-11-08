import React,{Component} from 'react'
import UserNav from './UserNav'
import Threads from './Threads'
import axios from 'axios'
import Post from './Post'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import TextField from '@material-ui/core/TextField'


export default class UserHome extends Component{
    constructor(props){
        super(props)
        this.state={
            content:"",
            allPost:[],
            url:"",
            like:"",
            allThreads:[],
            createPost:false
        }

    }
    componentDidMount(){
        this.fetchPost();
        this.getAllThreads();
    }
    handleChangeOfPost=(e)=>{
        this.setState({content:e.target.value})
    }
    handlePost=(e)=>{
        e.preventDefault()
        axios
            .post("/api/post",{
                content:this.state.content,
                url:this.state.url
            })
            .then(()=>{this.setState({content:""})},
            this.fetchPost(),
            window.location.reload(true)
            )
        this.setState({createPost:false})
    }
    update = (allPost)=>{
        this.setState({allPost:allPost})
    }
    fetchPost=()=>{
        axios.get('/api/AllPost').then(response=>{
            this.setState({allPost:response.data})
        })           
    }
    getAllThreads =()=>{
        axios.get("/api/allThreads").then(response=>{
            this.setState({allThreads:response.data})
        })

    }
    handleOpen =()=>{
        this.setState({createPost:true})
    }
    handleClose =()=>{
        this.setState({createPost:false})
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
            uploadPreset: "zfjpjtrr",
            sources: ["local", "url", "dropbox", "facebook", "instagram"]
            },
            (error, result) => {
            this.checkUploadResult(error, result);
            })
        return(
            <div>
                <UserNav/>
                <div className = 'allThreads'>
                    <h1 className = 'allThreads-h1'>All Threads</h1>
                <div>{this.state.allThreads.map((individualThreads,index)=>{
                            return(
                                <Threads
                                forum ={individualThreads.forum_name}
                                forumid ={individualThreads.forum_id}
                                updateThreads ={this.updateThreads}
                                key ={index}
                                />
                            )
                    })}</div>
                </div>
                <div className='userHome'>
                    <div className ='post-div'>
                        {this.state.allPost.map((individualPost,index) =>{
                            return(
                                <>
                                    <Post
                                    content ={individualPost.content_of_post}
                                    username ={individualPost.username}
                                    url ={individualPost.img_url}
                                    likes ={individualPost.likes}
                                    postid ={individualPost.post_id}
                                    profPic ={individualPost.avatar_img_url}
                                    key={index}
                                    onHome ={false}
                                    update ={this.update}
                                    />
                                </>
                            )
                        })}
                    <div className ='foot'>.</div>
                    </div>
                    <div className = 'create-post'>
                        <Button variant = 'contained' color ='primary' onClick ={this.handleOpen}> Create post </Button>
                        <Modal
                         aria-labelledby="simple-modal-title"
                         aria-describedby="simple-modal-description"
                         open={this.state.createPost}
                         onClose={this.handleClose}
                         closeAfterTransition
                         BackdropComponent={Backdrop}
                         BackdropProps ={{
                             timeout: 500,
                         }} >
                             <Fade in={this.state.createPost}>
                                 <div className = 'create'>
                                    <img className = 'thumnail' src ={this.state.url} alt =""/>
                                    <div className = 'create-content'>
                                        <div className ='create-input'>
                                            <TextField variant ='outlined' className ='create-input' label = 'Create Post' onChange={this.handleChangeOfPost} style={{"cursor":"text"}}value ={this.state.content}></TextField>
                                        </div>
                                        <Button variant = 'contained' className='add-pic-but' onClick ={()=>widget.open()}>add pic</Button>
                                        <Button variant = 'contained' color ='primary' className ='create-post-but' onClick ={this.handlePost}>Post</Button>
                                    </div>
                                </div>
                             </Fade>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}
