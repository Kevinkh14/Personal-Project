import React, { Component } from "react";
import UserNav from "./UserNav";
import "../styles/userHome.css";
import axios from "axios";
import Post from "./Post";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";

export default class Forums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      allPost: [],
      url: "",
      forumid: "",
      createPost: false,
      empty: "",
    };
  }
  componentDidMount() {
    this.fetchPost();
  }
  handleChangeOfPost = (e) => {
    this.setState({ content: e.target.value });
  };
  handlePost = (e) => {
    e.preventDefault();
    console.log(this.state.url);
    axios.post(`/api/forumPost/${this.props.match.params.forumId}`, {
      content: this.state.content,
      url: this.state.url,
    });
    this.fetchPost();
    window.location.reload(true);
  };
  update = (allPost) => {
    this.setState({ allPost: allPost });
  };
  fetchPost = () => {
    axios
      .get(`/api/forumPost/${this.props.match.params.forumId}`)
      .then((response) => {
        if (response.data.length == 0) {
          this.setState({ empty: ["Hmmm its very quiet... too quiet"] });
        } else {
          console.log(response.data);
          this.setState({ allPost: response.data });
        }
      });
  };
  handleOpen = () => {
    this.setState({ createPost: true });
  };
  handleClose = () => {
    this.setState({ createPost: false });
  };

  checkUploadResult = (error, resultEvent) => {
    if (resultEvent.event === "success") {
      console.log("Picture uploaded successfully");
      console.log(resultEvent.info.url);
      this.setState({ url: resultEvent.info.url });
    }
  };
  //cloudinary
  render() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "kevin14",
        uploadPreset: "zfjpjtrr",
        sources: ["local", "url", "dropbox", "facebook", "instagram"],
      },
      (error, result) => {
        this.checkUploadResult(error, result);
      }
    );

    return (
      <div>
        <UserNav />
        <div className="userHome">
          <div className="post-div">
            <h1 className="empty-thread">{this.state.empty}</h1>
            {this.state.allPost.map((individualPost, index) => {
              return (
                <>
                  <Post
                    content={individualPost.content_of_post}
                    username={individualPost.username}
                    url={individualPost.img_url}
                    key={index}
                    likes={individualPost.likes}
                    onHome={false}
                    update={this.update}
                    profPic={individualPost.avatar_img_url}
                  />
                </>
              );
            })}
          </div>
          <footer className="foot">.</footer>
          <div className="create-post">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleOpen}
            >
              {" "}
              Create post{" "}
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.createPost}
              onClose={this.handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.createPost}>
                <div className="create">
                  <img className="thumnail" src={this.state.url} alt="" />
                  <div className="create-content">
                    <div className="create-input">
                      <TextField
                        variant="outlined"
                        className="create-input"
                        label="Create Post"
                        onChange={this.handleChangeOfPost}
                        style={{ cursor: "text" }}
                        value={this.state.content}
                      ></TextField>
                    </div>
                    <Button
                      variant="contained"
                      className="add-pic-but"
                      onClick={() => widget.open()}
                    >
                      add pic
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="create-post-but"
                      onClick={this.handlePost}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
