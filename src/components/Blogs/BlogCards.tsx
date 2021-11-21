import * as React from "react";
import "../../styles/Blogs/CardsPage.css";
interface BlogCardsProps {}
interface BlogCardsState {}

class BlogCards extends React.Component<BlogCardsProps, BlogCardsState> {
  constructor(props: BlogCardsProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="tr-wrapper">
          <div className="tr-card">
            <div className="tr-badge"></div>
            <img
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=868&q=80format=1500w"
              alt="Africa"
            />
            <div className="trinfo">
              <div className="tripn">Africa</div>
              <p>
                Africa is a world of its own, known for their rich cultural
                heritage and natural beauty. From Cape Town to Cairo you're sure
                to find new adventure.
              </p>
              <ul>
                <button>
                  <a href="/africa">Explore</a>
                </button>
                <button>
                  <a href="/blogCrud">Post</a>
                </button>
              </ul>
            </div>
          </div>
          <div className="tr-card">
            <div className="tr-badge"></div>
            <img
              src="https://images.unsplash.com/photo-1522547902298-51566e4fb383?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80format=1500w"
              alt="Asia"
            />
            <div className="trinfo">
              <div className="tripn">Asia</div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi aperiam facilis, omnis cum adipisci molestiae
                laudantium. Laudantium vero enim deleniti eaque optio sint
                cumque incidunt quia, sapiente explicabo a aliquam?
              </p>
              <ul>
                <button>
                  <a href="/asia">Explore</a>
                </button>
                <button>
                  <a href="/blogCrud">Post</a>
                </button>
              </ul>
            </div>
          </div>
          <div className="tr-card">
            <div className="tr-badge"></div>
            <img
              src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=383&q=80format=1500w"
              alt="Europe"
            />
            <div className="trinfo">
              <div className="tripn">Europe</div>
              <p>
                She is my favorite person-- beautiful, funny, and smart. The
                conversations we have make me thankful to have found such an
                intelligent and interesting person to share my time with. I
                wouldn't trade her for the world.{" "}
              </p>
              <ul>
                <button>
                  <a href="/europe">Explore</a>
                </button>
                <button>
                  <a href="/blogCrud">Post</a>
                </button>
              </ul>
            </div>
          </div>
          <div className="tr-card">
            <div className="tr-badge"></div>
            <img
              src="https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80format=1500w"
              alt="Belgium"
            />
            <div className="trinfo">
              <div className="tripn">Middle East</div>
              <p>
                She is my favorite person-- beautiful, funny, and smart. The
                conversations we have make me thankful to have found such an
                intelligent and interesting person to share my time with. I
                wouldn't trade her for the world.{" "}
              </p>
              <ul>
                <button>
                  <a href="/middleeast">Explore</a>
                </button>
                <button>
                  <a href="/blogCrud">Post</a>
                </button>
              </ul>
            </div>
          </div>
          <div className="tr-card">
            <div className="tr-badge"></div>
            <img
              src="https://images.unsplash.com/photo-1580655653885-65763b2597d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80format=1500w"
              alt="Belgium"
            />
            <div className="trinfo">
              <div className="tripn">North America</div>
              <p>
                She is my favorite person-- beautiful, funny, and smart. The
                conversations we have make me thankful to have found such an
                intelligent and interesting person to share my time with. I
                wouldn't trade her for the world.{" "}
              </p>
              <ul>
                <button>
                <a href="/northamerica">Explore</a>
                </button>
                <button>
                  <a href="/blogCrud">Post</a>
                </button>
              </ul>
            </div>
          </div>
          <div className="tr-card">
            <div className="tr-badge"></div>
            <img
              src="https://images.unsplash.com/photo-1461863109726-246fa9598dc3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80format=1500w"
              alt="Belgium"
            />
            <div className="trinfo">
              <div className="tripn">South America</div>
              <p>
                She is my favorite person-- beautiful, funny, and smart. The
                conversations we have make me thankful to have found such an
                intelligent and interesting person to share my time with. I
                wouldn't trade her for the world.{" "}
              </p>
              <ul>
                <button>
                  <a href="/southamerica">Explore</a>
                </button>
                <button>
                  <a href="/blogCrud">Post</a>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BlogCards;
