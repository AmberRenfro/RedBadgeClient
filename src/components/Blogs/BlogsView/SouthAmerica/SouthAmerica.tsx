import * as React from "react";
import APIURL from '../../../../helpers/environment'
import CommentsCreate from "../../../Comments/CommentsCreate";
import CommentsEdit from "../../../Comments/CommentsEdit";
import SouthAmericaDisplay from "./SouthAmericaDisplay";

interface SouthAmericaProps {
  sessionToken: string | null;
}

interface SouthAmericaState {
  blogs: [BlogJSON];
  blogToComment: number;
  commentToEdit: {
    id: number;
    comment: string;
    createdAt: string;
  };
  editActive: boolean;
  createActive: boolean;
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

class SouthAmerica extends React.Component<
  SouthAmericaProps,
  SouthAmericaState
> {
  constructor(props: SouthAmericaProps) {
    super(props);
    this.state = {
      blogs: [
        {
          id: 0,
          entry: "",
          image: "",
          destination: "",
          createdAt: "",
          owner: "",
        },
      ],
      blogToComment: 0,

      commentToEdit: {
        id: 0,
        comment: "",
        createdAt: "",
      },

      createActive: false,
      editActive: false,
    };
  }

  fetchBlogs = () => {
    fetch(`${APIURL}posts/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((blogs) => {
        console.log(blogs);
        this.setState({
          blogs: blogs,
        });
      });
  };

  setBlogToComment = (id: number) => {
    this.setState({
      blogToComment: id,
    });
  };

  setCommentToEdit = (comment: CommentJSON) => {
    this.setState({
      commentToEdit: comment,
    });
  };

  createOn = () => {
    this.setState({
      createActive: true,
    });
  };

  createOff = () => {
    this.setState({
      createActive: false,
    });
  };

  editOn = () => {
    this.setState({
      editActive: true,
    });
  };

  editOff = () => {
    this.setState({
      editActive: false,
    });
  };

  componentDidMount() {
    this.fetchBlogs();
  }

  render() {
    return (
      <>
        <SouthAmericaDisplay
          blogs={this.state.blogs}
          setBlogToComment={this.setBlogToComment}
          setCommentToEdit={this.setCommentToEdit}
          createOn={this.createOn}
          editOn={this.editOn}
          sessionToken={this.props.sessionToken}
        />
        {this.state.createActive ? (
          <CommentsCreate
            sessionToken={this.props.sessionToken}
            blogToComment={this.state.blogToComment}
            createOff={this.createOff}
          />
        ) : null}
        {this.state.editActive ? (
          <CommentsEdit
            sessionToken={this.props.sessionToken}
            commentToEdit={this.state.commentToEdit}
            editOff={this.editOff}
          />
        ) : null}
      </>
    );
  }
}

export default SouthAmerica;
