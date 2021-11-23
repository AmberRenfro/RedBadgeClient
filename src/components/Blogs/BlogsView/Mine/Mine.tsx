import * as React from "react";
import APIURL from '../../../../helpers/environment'
import BlogsEdit from "../../BlogsCrud/BlogsEdit";
import BlogsDisplay from "../../BlogsCrud/BlogsDisplay";
import { Container } from "reactstrap";

interface MineProps {
  sessionToken: string | null;
}

interface MineState {
  userBlogs: [BlogJSON];
  updateActive: boolean;
  blogToUpdate: BlogJSON;
}

interface BlogJSON {
  destination: string;
  entry: string;
  image: string;
  id: number;
}

class Mine extends React.Component<MineProps, MineState, BlogJSON> {
  constructor(props: MineProps) {
    super(props);
    this.state = {
      userBlogs: [
        {
          entry: "",
          destination: "",
          image: "",
          id: 0,
        },
      ],
      blogToUpdate: {
        entry: "",
        destination: "",
        image: "",
        id: 0,
      },
      updateActive: false,
    };
  }

  fetchBlogs = () => {
    fetch(`${APIURL}posts/mine`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((blogs) => {
        console.log(blogs);
        this.setState({
          userBlogs: blogs,
        });
      });
  };

  editUpdateBlog = (blog: BlogJSON) => {
    this.setState({
      blogToUpdate: blog,
    });
    console.log(blog);
  };

  updateOn = () => {
    this.setState({
      updateActive: true,
    });
  };

  updateOff = () => {
    this.setState({
      updateActive: false,
    });
  };

  componentDidUpdate(prevProps: Readonly<MineProps>) {
    if (this.props.sessionToken !== prevProps.sessionToken) {
      this.fetchBlogs();
    }
  }
  render() {
    return (
      <>
        <Container>
          <BlogsDisplay
            fetchBlogs={this.fetchBlogs}
            userBlogs={this.state.userBlogs}
            updateOn={this.updateOn}
            updateOff={this.updateOff}
            updateActive={this.state.updateActive}
            editUpdateBlog={this.editUpdateBlog}
            blogToUpdate={this.state.blogToUpdate}
            sessionToken={this.props.sessionToken}
          />
        </Container>
        {this.state.updateActive ? (
          <BlogsEdit
            fetchBlogs={this.fetchBlogs}
            userBlogs={this.state.userBlogs}
            updateOn={this.updateOn}
            updateOff={this.updateOff}
            updateActive={this.state.updateActive}
            editUpdateBlog={this.editUpdateBlog}
            blogToUpdate={this.state.blogToUpdate}
            sessionToken={this.props.sessionToken}
          />
        ) : null}
      </>
    );
  }
}

export default Mine;
