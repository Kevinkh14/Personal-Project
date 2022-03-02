import React, { Component } from "react";

class comments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="indiv-comment">
        <img className="comment-avatar" src={this.props.avatar}></img>
        <h1 id="comment-username">
          {this.props.username}: <p id="comment">{this.props.comments}</p>
        </h1>
      </div>
    );
  }
}

export default comments;
