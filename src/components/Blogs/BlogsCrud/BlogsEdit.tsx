import * as React from "react";
import APIURL from '../../../helpers/environment'
import { Modal, ModalBody, Button } from "reactstrap";

interface BlogsEditProps {
  userBlogs: [BlogJSON];
  fetchBlogs(): void;
  editUpdateBlog(blog: BlogJSON): void;
  updateOn(): void;
  updateOff(): void;
  sessionToken: string | null;
  updateActive: boolean;
  blogToUpdate: BlogJSON;
}

interface BlogsEditState {
  editImage: string;
  editEntry: string;
  isOpen: boolean;
}

interface BlogJSON {
  destination: string;
  image: string;
  entry: string;
  id: number;
}

class BlogsEdit extends React.Component<
  BlogsEditProps,
  BlogsEditState,
  BlogJSON
> {
  constructor(props: BlogsEditProps) {
    super(props);
    this.state = {
      editEntry: this.props.blogToUpdate.entry,
      editImage: "",
      isOpen: false,
    };
  }

  blogUpdate = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    fetch(`${APIURL}posts/edit/${this.props.blogToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        entry: this.state.editEntry,
        image: this.state.editImage,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.sessionToken}`,
      }),
    }).then((res) => {
      this.props.fetchBlogs();
      this.props.updateOff();
    });
  };

  handleEntryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      editEntry: event.target.value,
    });
  };

  handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      editImage: event.target.value,
    });
  };

  render() {
    return (
      <Modal className="my-blog-modal sm" isOpen={true}>
        <form action="" className="modal-form">
          <ModalBody>
            <input
              className="modal-input"
              type="text"
              value={this.state.editImage}
              onChange={this.handleImageChange}
              placeholder="Change your image..."
            />
          </ModalBody>
          <ModalBody>
            <textarea
              placeholder="Update your blog..."
              className="modal-textarea"
              value={this.state.editEntry}
              onChange={this.handleEntryChange}
            ></textarea>
          </ModalBody>
          <ModalBody>
            <Button className="comment-btn" onClick={this.blogUpdate}>
              {" "}
              Save{" "}
            </Button>
            <Button className="back-btn" onClick={this.props.updateOff}>
              {" "}
              Close{" "}
            </Button>
          </ModalBody>
        </form>
      </Modal>
    );
  }
}

export default BlogsEdit;
