import React,{Component} from 'react'
import axios from 'axios'
import '../styles/post.css'

class Post extends Component{
    constructor(){
        super()
        this.state={
            editStatus:false,
            inputField:"",
        }
    }

    //cloudinary
    // componentDidMount(){
    //     axios.get("/test").then(response=>{
    //         console.log(response)
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
            this.props.update(response.data);
        })
    }
    render(){
        const {content}=this.props
        return(
            <div className ='div-container'>
                <div className ='post-container'>
                    {
                    this.state.editStatus ===false ?
                    <>
                    <div className = 'content-in'>
                        <div className ='name-div'>
                            <h2 className ='name'>{this.props.username}</h2>
                        </div>
                        <div className = 'text-pic'>
                            <div className ='text'>
                                <h1 className ='content'>{content}</h1>
                            </div>
                            <div className ='img-div'>
                                <img className ="img-post" src ={this.props.url}></img>
                            </div>
                        </div>
                    </div>
                    </>
                    :
                    <>
                        <input defaultValue ={content} onChange={(e)=>this.setState({inputField:e.target.value})}></input>
                    </>
                }
                {this.props.onUserProfile ===true ?
                <>
                <button onClick = {this.handleDelete}>Delete</button>
                {this.state.editStatus ===false?
                    <button onClick = {()=> this.setState({editStatus:true})}>Edit</button>
                    :
                    <button onClick ={this.handleEdit}>save</button>
                }
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