import React from 'react'

class Threads extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <h1>{this.props.forumName}</h1>
            </div>
        )
    }
}
export default Threads;