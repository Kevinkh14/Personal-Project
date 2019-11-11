import React, {Component} from 'react'

class comments extends Component{
    constructor(props){
        super(props)
        this.state ={

        }
    }
    render(){
        return(
            <div>
                <h1>{this.props.username}:{this.props.comments}</h1>
                
            </div>
        )
    }
}

export default comments