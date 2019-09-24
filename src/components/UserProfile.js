import React,{Component} from 'react'
import UserNav from './UserNav'
import '../styles/userProfile.css'

export default class UserProfile extends Component{

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
                    <div className = 'pastPost-container'>
                        <h1 className = 'pastPost'>Past Post</h1>
                    </div>
                </div>
            </div>
        )
    }
}
