import React,{Component} from 'react'
import axios from 'axios'
import '../styles/post.css'

class Post extends Component{
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
                    <h2 className ='name'>{this.props.username}</h2>
                    <h1 className ='content'>{content}</h1>
                    <button>Edit</button>
                    <button onClick = {this.handleDelete}>Delete</button>
                </div>
            </div>
        )
    }
}
export default Post;