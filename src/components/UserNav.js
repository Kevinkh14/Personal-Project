import React from 'react'
import {Link} from 'react-router-dom'

function UserNav(props){
    return(
        <nav>
            <Link to ="/UserHome">
                <button>Home</button>
            </Link>
            <Link to = '/Profile'>
                <button>profile</button>
            </Link>
        </nav>
    )
}
export default UserNav