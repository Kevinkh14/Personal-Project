import React,{Component} from 'react'
import axios from 'axios'
import '../styles/post.css'

class Post extends Component{
    constructor(props){
        super(props)
        
    }
    render(){
        const {content}=this.props
        console.log(content)
        return(
            <div className ='div-container'>
                <div className ='post-container'>

                    <h1 className ='content'>{content}</h1>
                </div>
            </div>
        )
    }
}
export default Post;