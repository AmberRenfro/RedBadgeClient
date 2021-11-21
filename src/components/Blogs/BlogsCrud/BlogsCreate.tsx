import * as React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";

interface BlogsCreateProps {
  sessionToken: string | null;
}

interface BlogsCreateState {
  destination: string;
  entry: string;
  image: string;
  success: boolean;
}

class BlogsCreate extends React.Component<BlogsCreateProps, BlogsCreateState> {
  constructor(props: BlogsCreateProps) {
    super(props);
    this.state = {
      destination: "",
      entry: "",
      image: "",
      success: false,
    };
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch("http://localhost:3000/posts/create", {
      method: "POST",
      body: JSON.stringify({
        destination: this.state.destination,
        entry: this.state.entry,
        image: this.state.image,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((blog) => {
        this.setState({
          destination: "",
          entry: "",
          image: "",
          success: true,
        });
      });
  };

  handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      destination: e.currentTarget.value,
    });
  };

  handleEntryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      entry: e.target.value,
    });
  };

  handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      image: e.target.value,
    });
  };

  render() {
    return (
      <>
        <form className="create-blog">
          <div className="row">
            <div className="col">
              <input
                type="text"
                value={this.state.image}
                onChange={this.handleImageChange}
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Image url"
              />
            </div>
            <div className="col">
              <select
                className="form-select"
                aria-label="Default select example"
                value={this.state.destination}
                onChange={this.handleDestinationChange}
              >
                <option selected>Destination</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Middle East">MiddleEast</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <textarea
              value={this.state.entry}
              onChange={this.handleEntryChange}
              className="form-control"
              id="FormControlText"
              placeholder="Tell us about your experience..."
            ></textarea>
          </div>
          <Button
            type="submit"
            color="danger"
            onClick={this.handleSubmit}
            className="submit-button"
          >
            {" "}
            Submit{" "}
          </Button>
        </form>
        {this.state.success === true ? <Redirect to="/blogs" /> : null}
      </>
    );
  }
}

export default BlogsCreate;
