import React,{Component} from 'react'
import axios from 'axios'


class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            editStatus:false,
            inputField:"",
            // profPic:""
        }
    }
    // componentDidMount(){
    //     this.getProfilePic()
    // }
    // getProfilePic=()=>{
    //     axios
    //     .get("/api/profile").then(response=>{
    //         this.setState({profPic:response.data[0].avatar_img_url})
    //     })
    // }

    handleEdit=()=>{
        this.setState({editStatus:false})
        axios.put(`/api/post/${this.props.id}`,
        {content:this.state.inputField})
        .then(response=>{
            this.props.update(response.data)
        })
        
    }
    handleDelete=()=>{
        axios.delete(`/api/post/${this.props.id}`).then(response=>{
            this.props.update(response.data)
        })
    }
    handleLike=()=>{
        axios.post(`/api/like/${this.props.postid}`).then((res)=>{
            this.props.update(res.data)
            console.log(this.props.likes)
        })
    }
    handleUnlike=()=>{
        axios.put(`/api/like/${this.props.postid}`).then(response=>{
            console.log(response)
            this.props.update(response.data)
        })
    }
    
    render(){
        const {content}=this.props
        return(
            <div className ='div-container'>
                <div className ='post-container'>
                    {
                    this.state.editStatus ===false?
                    <>
                    <div className = 'content-in'>
                        <div className = 'left-of-post'>
                        <div className ='name-div'>
                            <img className ='profPic' src = {this.props.profPic} alt =''></img>
                            <h2 className ='name'>{this.props.username}</h2>
                        </div>
                        {this.props.onHome === false ?
                        <>
                        <div className='likes'>
                            <button className='img-like-but' onClick={this.handleLike}><img className='img-like' src="https://img.icons8.com/cotton/64/000000/facebook-like--v2.png" alt =''></img></button>
                            <h2 className ='like-counter'>{this.props.likes}</h2>
                            <button onClick ={this.handleUnlike} className ='unlike-but'><img className ='img-unlike' src="https://img.icons8.com/windows/32/000000/thumbs-down.png" alt =''/></button>
                        </div>
                        
                        </>
                        :
                        <div className ='likes'>
                            <h2 className ='like-counter'>{this.props.likes}</h2>
                         </div>
                         
                        }
                        </div>
                        <div className = 'text-pic'>
                            <div className ='text'>
                                <h1 className ='content'>{content}</h1>
                            </div>
                            <div className ='img-div'>
                                <img className ="img-post" src ={this.props.url}alt=""></img>
                            </div>
                        </div>
                    </div>
                   
                    </>
                    :
                    <>
                        <input className={'input-edit'}defaultValue ={content} onChange={(e)=>this.setState({inputField:e.target.value})}></input>
                    </>
                }
                {this.props.onUserProfile ===true ?
                <>
                <div className = 'delete-edit-div'>
                    <button className = 'delete-but' onClick = {this.handleDelete}>Delete</button>
                    {this.state.editStatus ===false?
                        <button  className ='edit-but'onClick = {()=> this.setState({editStatus:true})}>Edit</button>
                        :
                        <button className ='save-but' onClick ={this.handleEdit}>save</button>
                    }
                </div>
                </>
                :
                <></>
                }
                </div>
            </div>
        
        )
    }
}
export default Post;