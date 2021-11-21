import { KeyObject } from "crypto";
import * as React from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import { JsonObjectExpression } from "typescript";

interface CommentsEditProps {
  sessionToken: string | null;
  editOff(): void;
  commentToEdit: CommentJSON;
}

interface CommentsEditState {
  isOpen: boolean;
  comment: string;
}

interface CommentJSON {
  id: number;
  comment: string;
  createdAt: string;
}

interface ResponseJSON {
  status: number;
  statusText: string;
}

class CommentsEdit extends React.Component<
  CommentsEditProps,
  CommentsEditState
> {
  constructor(props: CommentsEditProps) {
    super(props);
    this.state = {
      isOpen: false,
      comment: "",
    };
  }

  checkStatus(response: { status: number; statusText: string }) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  }

  parseJSON(response: any) {
    return response.json;
  }

  editComment = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    fetch(
      `http://localhost:3000/comments/edit/${this.props.commentToEdit.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          comment: this.state.comment,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${this.props.sessionToken}`,
        }),
      }
    )
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.props.editOff)
      .catch(function () {
        alert("Not Authorized");
      });
  };

  handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      comment: e.target.value,
    });
  };
  render() {
    return (
      <>
        <Modal className="comment-modal" isOpen={true}>
          <form onSubmit={this.editComment}>
            <ModalBody className="modal-body">
              <textarea
                className="modal-text-area"
                placeholder="edit comment..."
                value={this.state.comment}
                onChange={this.handleCommentChange}
              ></textarea>
            </ModalBody>
            <Button className="comment-btn" type="submit">
              {" "}
              Save{" "}
            </Button>
            <Button className="back-btn" onClick={this.props.editOff}>
              {" "}
              Close{" "}
            </Button>
          </form>
        </Modal>
      </>
    );
  }
}

export default CommentsEdit;
