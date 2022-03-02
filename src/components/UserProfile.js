import React, { Component } from "react";
import UserNav from "./UserNav";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Post from "./Post";
import Threads from "./Threads";
import { connect } from "react-redux";
import { updateUser } from "../redux/userReducer";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastPost: [],
      pastThreads: [],
      username: "",
      forum: "",
      profilePic: [],
      url: "",
      id: "",
      forumId: "",
      createPostStatus: false,
      redirect: false,
      profilePicstatus: false,
    };
  }
  componentDidMount() {
    axios.get("/api/user/post").then((response) => {
      this.setState({ pastPost: response.data });
    });
    this.getProfilePic();
    this.getUser();
    this.getPastThreads();
  }
  getProfilePic = () => {
    axios.get("/api/profile").then((response) => {
      this.setState({ url: response.data[0].avatar_img_url });
    });
  };
  update = (pastPost) => {
    this.setState({ pastPost: pastPost });
  };
  updateThreads = (pastThreads) => {
    this.setState({ pastThreads: pastThreads });
  };
  handleForumName = (e) => {
    this.setState({ forum: e.target.value });
  };
  createForum = () => {
    const { forum, id } = this.state;
    console.log(this.state);
    axios
      .post(`/api/forum`, {
        forum,
        id,
      })
      .then(() => {
        window.location.reload(true);
      });
  };
  handleprofilePic = () => {
    const { url } = this.state;
    axios.post("/api/profile", {
      url,
    });
    console.log(url);
    this.setState({ profilePicstatus: false });
  };
  checkUploadResult = (error, resultEvent) => {
    if (resultEvent.event === "success") {
      console.log("Picture uploaded successfully");
      console.log(resultEvent.info.url);
      this.setState({ url: resultEvent.info.url });
      this.setState({ profilePicstatus: true });
    }
  };
  getUser = () => {
    axios.get("/auth/user").then((response) => {
      console.log(response.data);
      this.setState({ username: response.data.username, id: response.data.id });
    });
  };
  getPastThreads = () => {
    axios.get("/api/pastThreads").then((response) => {
      this.setState({ pastThreads: response.data });
    });
  };
  render() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "kevin14",
        uploadPreset: "xoy9arl8",
        sources: ["local", "url", "dropbox", "facebook", "instagram"],
        cropping: true,
        cropping_aspect_ratio: 1,
        show_skip_crop_button: false,
        Default: false,
      },
      (error, result) => {
        this.checkUploadResult(error, result);
      }
    );
    return (
      <div className="userProf">
        <div>
          <UserNav />
        </div>
        <div className="profile">
          <div className="joined-profile">
            <div className="profile-container">
              <div className="avatar">
                <img className="avatarImg" src={this.state.url} alt="" />
              </div>
              <h1 className="usernameh1">{this.state.username}</h1>
              <div>
                {this.state.profilePicstatus === false ? (
                  <>
                    <button
                      className="pic-but"
                      onClick={() => widget.open()}
                      startIcon={<CloudUploadIcon />}
                    >
                      {" "}
                      Edit Profile Picture
                    </button>
                  </>
                ) : (
                  <button
                    onClick={this.handleprofilePic}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
            <div className="thread-in-but">
              <input
                placeholder="Thread Name"
                onChange={this.handleForumName}
              ></input>
              <button className="createThread" onClick={this.createForum}>
                Create Thread
              </button>
            </div>
            <li className="joined">Joined Threads</li>
            <div>
              {this.state.pastThreads.map((individualThreads, i) => {
                return (
                  <Threads
                    forum={individualThreads.forum_name}
                    forumid={individualThreads.forum_id}
                    updateThreads={this.updateThreads}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
          <div className="pastPostDiv">
            <h2 className="pastPost">Past Post</h2>
            <div className="pastPost-container">
              {this.state.pastPost.map((individualPost, i) => {
                return (
                  <>
                    <Post
                      content={individualPost.content_of_post}
                      id={individualPost.post_id}
                      url={individualPost.img_url}
                      onUserProfile={true}
                      onHome={false}
                      likes={individualPost.likes}
                      profPic={individualPost.avatar_img_url}
                      key={i}
                      update={this.update}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(undefined, { updateUser })(UserProfile);
