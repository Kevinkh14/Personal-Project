import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { getComments, addComment } from "../redux/commentReducer";
import Comments from "./Comments";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editStatus: false,
      inputField: "",
      comment: false,
      commentContent: "",
      allComments: [],
      // profPic:""
    };
  }
  // componentDidMount(){

  // }

  handleEdit = () => {
    this.setState({ editStatus: false });
    axios
      .put(`/api/post/${this.props.id}`, { content: this.state.inputField })
      .then((response) => {
        this.props.update(response.data);
      });
  };
  handleDelete = () => {
    axios.delete(`/api/post/${this.props.id}`).then((response) => {
      this.props.update(response.data);
    });
  };
  handleLike = () => {
    axios.post(`/api/like/${this.props.postid}`).then((res) => {
      this.props.update(res.data);
      // window.location.reload(true)
      console.log(res.data);
    });
  };
  handleUnlike = () => {
    axios.put(`/api/like/${this.props.postid}`).then((response) => {
      console.log(response);
      // window.location.reload(true)
      this.props.update(response.data);
    });
  };
  handleOpen = () => {
    this.setState({ comment: true });
    axios.get(`/api/comments/${this.props.postid}`).then((response) => {
      this.setState({ allComments: response.data });
      console.log(response.data);
    });
  };
  handleClose = () => {
    this.setState({ comment: false });
  };
  handleComment = () => {
    axios
      .post(`/api/comment/${this.props.postid}`, {
        content: this.state.commentContent,
      })
      .then(() => {
        console.log(this.state.commentContent);
      });
  };
  handleChange = (e) => {
    this.setState({ commentContent: e.target.value });
    console.log(e.target.value);
  };

  render() {
    const { content } = this.props;
    return (
      <div className="div-container">
        <div className="post-container">
          {this.state.editStatus === false ? (
            <>
              <div className="content-in">
                <section className="top">
                  <div className="name-div">
                    <img
                      className="profPic"
                      src={this.props.profPic}
                      alt=""
                    ></img>
                    <h2 className="name">{this.props.username}</h2>
                  </div>
                </section>
                <section className="middle">
                  <div className="text-pic">
                    <div className="text">
                      <h1 className="content">{content}</h1>
                    </div>
                    <div className="img-div">
                      <img
                        className="img-post"
                        src={this.props.url}
                        alt=""
                      ></img>
                    </div>
                  </div>
                </section>

                <section className="bottom">
                  {this.props.onHome === false ? (
                    <>
                      <div className="likes">
                        <section className="like-icons">
                          <i
                            class="fa-solid fa-thumbs-up"
                            onClick={this.handleLike}
                          ></i>
                          <h2 className="like-counter">{this.props.likes}</h2>

                          <i
                            class="fa-solid fa-thumbs-down"
                            onClick={this.handleUnlike}
                          ></i>

                          <i
                            class="fa-solid fa-comment"
                            onClick={this.handleOpen}
                          ></i>
                        </section>
                        <div className="modal-div">
                          <Modal
                            className="modal"
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.comment}
                            onClose={this.handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                              timeout: 500,
                            }}
                          >
                            <Fade in={this.state.comment}>
                              <div className="comment-container">
                                <div className="comment-content">
                                  {this.state.allComments.map(
                                    (comments, index) => {
                                      console.log(comments);
                                      return (
                                        <>
                                          <Comments
                                            comments={comments.comment}
                                            username={comments.username}
                                            avatar={comments.avatar_img_url}
                                          />
                                        </>
                                      );
                                    }
                                  )}
                                </div>
                                <div className="comments">
                                  <div className="comment-input">
                                    <TextField
                                      variant="outlined"
                                      label="comment"
                                      name="comment"
                                      onChange={this.handleChange}
                                      required
                                    ></TextField>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={this.handleComment}
                                    >
                                      Post
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Fade>
                          </Modal>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="likes">
                      <h2 className="like-counter">{this.props.likes}</h2>
                    </div>
                  )}
                </section>
              </div>
            </>
          ) : (
            <>
              <input
                className={"input-edit"}
                defaultValue={content}
                onChange={(e) => this.setState({ inputField: e.target.value })}
              ></input>
            </>
          )}
          {this.props.onUserProfile === true ? (
            <>
              <div className="delete-edit-div">
                <button className="delete-but" onClick={this.handleDelete}>
                  Delete
                </button>
                {this.state.editStatus === false ? (
                  <button
                    className="edit-but"
                    onClick={() => this.setState({ editStatus: true })}
                  >
                    Edit
                  </button>
                ) : (
                  <button className="save-but" onClick={this.handleEdit}>
                    save
                  </button>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}
export default Post;

// const mapStateToProps = reduxState => {
//     return{
//         comments: reduxState.commentReducer.comments
//     }
// }

// export default connect(mapStateToProps, {
//     getComments,
//     addComment
// })(Post)
