import React,{Component} from 'react'
import UserNav from './UserNav'
import '../styles/userProfile.css'
import Axios from 'axios'
import Post from './Post'

export default class UserProfile extends Component{
    constructor(){
        super ()
        this.state={
            pastPost:[]
        }
    }
    componentDidMount(){
        Axios.get("/api/user/post").then(response=>{
            this.setState({pastPost:response.data})
        })
    }
    render(){
        return(
            <div className='userProf'>
                <div>
                    <UserNav/>
                </div>
                <div className = 'profile'>
                    <div className='joined-profile'>
                        <div className ='profile-container'></div>
                        <li className ='joined'>Joined Threads</li>
                    </div>
                    <div className = "pastPostDiv">
                        <h2 className = 'pastPost'>Past Post</h2>
                        <div className = 'pastPost-container'>
                            {this.state.pastPost.map((individualPost,i) =>{
                                return(
                                    <>
                                        <Post
                                        content ={individualPost.content_of_post}
                                        update ={this.update}
                                        key ={i}
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
