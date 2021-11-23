import * as React from "react";
import APIURL from '../../helpers/environment'
import { Modal, ModalBody, Button } from "reactstrap";

interface CommentsCreateProps {
  blogToComment: number;
  sessionToken: string | null;
  createOff(): void;
}

interface CommentsCreateState {
  isOpen: boolean;
  comment: string;
}

class CommentsCreate extends React.Component<
  CommentsCreateProps,
  CommentsCreateState
> {
  constructor(props: CommentsCreateProps) {
    super(props);
    this.state = {
      isOpen: false,
      comment: "",
    };
  }

  createComment = () => {
    fetch(`${APIURL}comments/create`, {
      method: "POST",
      body: JSON.stringify({
        comment: this.state.comment,
        postId: this.props.blogToComment,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((comment) => {
        console.log(comment);
        this.props.createOff();
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
          <form onSubmit={this.createComment}>
            <ModalBody className="modal-body">
              <textarea
                className="modal-text-area"
                placeholder="Leave a comment..."
                value={this.state.comment}
                onChange={this.handleCommentChange}
              ></textarea>
            </ModalBody>
            <Button className="comment-btn" type="submit">
              {" "}
              Save{" "}
            </Button>
            <Button className="back-btn" onClick={this.props.createOff}>
              {" "}
              Close{" "}
            </Button>
          </form>
        </Modal>
      </>
    );
  }
}

export default CommentsCreate;
