import * as React from "react";
import APIURL from '../../../../helpers/environment'
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
interface AfricaDisplayProps {
  blogs: [BlogJSON];
  setBlogToComment(id: number): void;
  setCommentToEdit(comment: CommentJSON): void;
  createOn(): void;
  editOn(): void;
  sessionToken: string | null;
}

interface AfricaDisplayState {
  singleBlog: BlogJSON;
  singleBlogComments: [CommentJSON];
  singleView: boolean;
  blogId: number;
}

interface BlogJSON {
  id: number;
  entry: string;
  image: string;
  destination: string;
  createdAt: string;
  owner: string;
}

interface CommentJSON {
  id: number;
  comment: string;
  createdAt: string;
  owner: string;
}

class AfricaDisplay extends React.Component<
  AfricaDisplayProps,
  AfricaDisplayState,
  BlogJSON
> {
  constructor(props: AfricaDisplayProps) {
    super(props);
    this.state = {
      singleBlog: {
        id: 0,
        entry: "",
        image: "",
        destination: "",
        createdAt: "",
        owner: "",
      },
      singleBlogComments: [
        {
          id: 0,
          comment: "",
          createdAt: "",
          owner: "",
        },
      ],
      singleView: false,
      blogId: 0,
    };
  }

  seeMoreClicked = (seeBlog: BlogJSON, postId: number) => {
    this.setState({
      singleView: true,
      singleBlog: seeBlog,
      blogId: postId,
    });
  };

  backClicked = () => {
    this.setState({
      singleView: false,
    });
  };

  fetchComments = () => {
    fetch(`${APIURL}comments/${this.state.blogId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((comments) => {
        console.log(comments);
        this.setState({
          singleBlogComments: comments,
        });
      });
  };

  deleteComment = (comment: CommentJSON) => {
    fetch(`${APIURL}comments/delete/${comment.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.sessionToken}`,
      }),
    }).then(() => this.fetchComments());
  };

  componentDidUpdate(
    prevProps: Readonly<AfricaDisplayProps>,
    prevState: Readonly<AfricaDisplayState>
  ) {
    if (prevState.singleBlog !== this.state.singleBlog) {
      this.fetchComments();
    }
  }

  AfricaMapper = () => {
    return this.props.blogs.map((blog: BlogJSON, index) => {
      if (blog.destination === "Africa") {
        return (
          <Col key={index}>
            <Card className="blog-card">
              <CardTitle className="blog-title"> {blog.owner} </CardTitle>
              <CardImg className="blog-image" src={blog.image} />
              <CardBody>
                <CardTitle> {blog.destination} </CardTitle>
                <CardText> {blog.entry} </CardText>
              </CardBody>
            </Card>
            <Button
              className="see-more-btn"
              onClick={() => {
                this.seeMoreClicked(blog, blog.id);
              }}
            >
              {" "}
              See more{" "}
            </Button>
          </Col>
        );
      } else {
          return null
      }
    });
  };
  CommentsMapper = () => {
    return this.state.singleBlogComments.map((comment: CommentJSON) => {
      return (
        <>
          <CardBody className="comment-box">
            <h5 className="comment-header"> {comment.owner} </h5>

            <CardText className="comment-text">{comment.comment}</CardText>
            <Button
              className="comment-edit-btn"
              color="success"
              onClick={() => {
                this.props.setCommentToEdit(comment);
                this.props.editOn();
              }}
            >
              {" "}
              Edit{" "}
            </Button>
            <Button
              className="comment-delete-btn"
              color="danger"
              onClick={() => {
                this.deleteComment(comment);
              }}
            >
              {" "}
              Delete{" "}
            </Button>
          </CardBody>
        </>
      );
    });
  };
  render() {
    return (
      <div className="tr-wrapper">
        <Row>
          {this.state.singleView === false ? (
            Array.isArray(this.props.blogs) ? (
              this.AfricaMapper()
            ) : null
          ) : (
            <>
              <Card className="single-blog-card">
                <CardImg
                  className="single-blog-image"
                  src={this.state.singleBlog.image}
                />
                <CardBody>
                  <CardTitle className="single-blog-title">
                    {" "}
                    {this.state.singleBlog.destination}{" "}
                  </CardTitle>
                  <CardText className="single-blog-text">
                    {" "}
                    {this.state.singleBlog.entry}{" "}
                  </CardText>
                  <Button
                    className="comment-btn"
                    onClick={() => {
                      this.props.setBlogToComment(this.state.singleBlog.id);
                      this.props.createOn();
                    }}
                  >
                    {" "}
                    Comment{" "}
                  </Button>
                  <Button className="back-btn" onClick={this.backClicked}>
                    {" "}
                    Back{" "}
                  </Button>
                </CardBody>
              </Card>
              {this.CommentsMapper()}
            </>
          )}
        </Row>
      </div>
    );
  }
}

export default AfricaDisplay;
