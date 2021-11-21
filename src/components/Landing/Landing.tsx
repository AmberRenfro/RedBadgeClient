import * as React from "react";
import landingVideo from "../../assets/videos/video.mp4";
import "../../styles/Landing/landing.css";

interface LandingProps {}
interface LandingState {}

class Landing extends React.Component<LandingProps, LandingState> {
  constructor(props: LandingProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <video className="videoTag" autoPlay loop muted>
          <source src={landingVideo}></source>
        </video>
        <div className="text">
          <h2>Never Stop</h2>
          <h3>Exploring</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sint
            quis dolor dolorum, laborum reiciendis praesentium sunt illum eos
            similique nisi velit ipsum porro consectetur optio a veniam harum
            odit.
          </p>
          <a href="/blogs">Explore</a>
        </div>
      </>
    );
  }
}

export default Landing;
