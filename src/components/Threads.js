import React from 'react'
import {Link} from 'react-router-dom'


class Threads extends React.Component{
    
    render(){
        return(
            <div>
                <Link to ='/forum'>
                    <h1>{this.props.forum}</h1>
                </Link>
                {console.log(this.props.forum)}
            </div>
        )
    }
}
export default Threads;