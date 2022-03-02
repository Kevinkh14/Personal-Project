import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// import '../styles/userNav.css'
import { connect } from "react-redux";
import { updateUser } from "../redux/userReducer";
import axios from "axios";

class UserNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      menuOpenStatus: "side-menu",
    };
  }
  toggle = () => {
    if (
      this.state.menuOpenStatus === "side-menu-close" ||
      this.state.menuOpenStatus === "side-menu"
    ) {
      this.setState({ menuOpenStatus: "side-menu-open" });
    } else if (this.state.menuOpenStatus === "side-menu-open") {
      this.setState({ menuOpenStatus: "side-menu-close" });
    }
  };

  logout = () => {
    axios
      .get("/auth/logout")
      .then(() => {
        this.props.updateUser({});
        this.setState({ redirect: true });
      })
      .catch((err) => console.log(err));
  };
  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="nav-div">
        <div className={`${this.state.menuOpenStatus} hidden-by-default`}>
          <Link to="/UserHome">
            <button className="home-but">Home</button>
          </Link>
          <Link to="/Profile">
            <button className="prof-but">profile</button>
          </Link>
          <button onClick={this.logout} className="logout-but">
            Logout
          </button>
        </div>
        <nav className="usernav">
          <div>
            <Link to="/UserHome">
              <button className="worp">Worp</button>
            </Link>
          </div>
          <section className="search-btns">
            <div>
              <input placeholder="Search" className="search-bar"></input>
            </div>
            <div className="full-size">
              <Link to="/UserHome">
                <button className="home-but">Home</button>
              </Link>
              <Link to="/Profile">
                <button className="prof-but">profile</button>
              </Link>
              <button onClick={this.logout} className="logout-but">
                Logout
              </button>
            </div>
          </section>
          <div className="hambut-div">
          <i class="fa-solid fa-bars fa-2xl"   onClick={this.toggle} ></i>
         
          </div>
        </nav>
      </div>
    );
  }
}
export default connect(undefined, {
  updateUser,
})(UserNav);
