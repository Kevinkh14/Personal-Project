import React from 'react'


class Threads extends React.Component{
    
    render(){
        return(
            <div>
                <h1>{this.props.forum}</h1>
                {console.log(this.props.forum)}
            </div>
        )
    }
}
export default Threads;