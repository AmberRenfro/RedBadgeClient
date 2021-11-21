import * as React from "react";
import { Container } from "reactstrap";
import BlogsCreate from "./BlogsCreate";
import "../../../styles/Blogs/BlogsCreate.css";

interface BlogsIndexProps {
  sessionToken: string | null;
}

interface BlogsIndexState {}

class BlogsIndex extends React.Component<BlogsIndexProps, BlogsIndexState> {
  constructor(props: BlogsIndexProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="blogs-control-container">
        <BlogsCreate sessionToken={this.props.sessionToken} />
      </Container>
    );
  }
}

export default BlogsIndex;
