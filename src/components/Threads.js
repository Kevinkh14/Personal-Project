import React from "react";
import { Link } from "react-router-dom";

class Threads extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/forum/${this.props.forumid}`}>
          <h1 className="threads">w/{this.props.forum}</h1>
        </Link>
      </div>
    );
  }
}
export default Threads;
