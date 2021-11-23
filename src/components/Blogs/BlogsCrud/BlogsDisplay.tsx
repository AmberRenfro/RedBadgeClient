import * as React from "react";
import APIURL from '../../../helpers/environment'
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

interface BlogsDisplayProps {
  userBlogs: [BlogJSON];
  fetchBlogs(): void;
  editUpdateBlog(blog: BlogJSON): void;
  updateOn(): void;
  updateOff(): void;
  sessionToken: string | null;
  updateActive: boolean;
  blogToUpdate: BlogJSON;
}

interface BlogsDisplayState {}

interface BlogJSON {
  destination: string;
  entry: string;
  image: string;
  id: number;
}

class BlogsDisplay extends React.Component<
  BlogsDisplayProps,
  BlogsDisplayState,
  BlogJSON
> {
  constructor(props: BlogsDisplayProps) {
    super(props);
    this.state = {};
  }

  deleteBlog = (blog: BlogJSON) => {
    fetch(`${APIURL}posts/delete/${blog.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.sessionToken}`,
      }),
    }).then(() => this.props.fetchBlogs());
  };

  blogMapper = () => {
    return this.props.userBlogs.map((blogs: BlogJSON, index) => {
      return (
        <>
          <Col key={index}>
            <Card className="my-blog-card">
              <CardImg className="blog-image" src={blogs.image} />
              <CardBody>
                <CardTitle> {blogs.destination} </CardTitle>
                <CardText> {blogs.entry} </CardText>
              </CardBody>
            </Card>
            <Button
              className="comment-btn"
              onClick={() => {
                this.props.editUpdateBlog(blogs);
                this.props.updateOn();
              }}
            >
              {" "}
              EDIT{" "}
            </Button>
            <Button
              className="back-btn"
              onClick={() => {
                this.deleteBlog(blogs);
              }}
            >
              {" "}
              DELETE{" "}
            </Button>
          </Col>
        </>
      );
    });
  };

  render() {
    return (
      <>
        <div className="tr-wrapper">
          <Row>
            {Array.isArray(this.props.userBlogs) ? this.blogMapper() : null}
          </Row>
        </div>
      </>
    );
  }
}

export default BlogsDisplay;
