import * as React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Landing from "../Landing/Landing";
import SignupLogin from "../SignupLogin/SignupLogin";
import BlogCards from "../Blogs/BlogCards";
import BlogsIndex from "../Blogs/BlogsCrud/BlogIndex";
import Africa from "../Blogs/BlogsView/Africa/Africa";
import Asia from "../Blogs/BlogsView/Asia/Asia";
import Europe from "../Blogs/BlogsView/Europe/Europe";
import MiddleEast from "../Blogs/BlogsView/MiddleEast/MiddleEast";
import Mine from "../Blogs/BlogsView/Mine/Mine";
import NorthAmerica from "../Blogs/BlogsView/NorthAmerica/NorthAmerica";
import SouthAmerica from "../Blogs/BlogsView/SouthAmerica/SouthAmerica";

interface NavbarState {}
interface NavbarProps {
  updateToken(newToken: string): void;
  updatePw(newPw: string): void;
  clearToken(): void;
  sessionToken: string | null;
  unhashedPw: string | null;
}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {};
  }

  menuToggle = () => {
    const toggle = document.querySelector(".toggle");
    const showcase = document.querySelector(".showcase");

    toggle?.classList.toggle("active");
    showcase?.classList.toggle("active");
  };

  render() {
    const { updateToken, updatePw, clearToken, sessionToken, unhashedPw } =
      this.props;
    return (
      <>
        <section className="showcase">
          <header>
            <h2 className="logo">
              {" "}
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                {" "}
                All Abroad{" "}
              </Link>{" "}
            </h2>
            <div onClick={this.menuToggle} className="toggle"></div>
          </header>
          <Switch>
            <Route exact path="/">
              {" "}
              <Landing />{" "}
            </Route>
            <Route exact path="/login">
              {" "}
              <SignupLogin
                updateToken={updateToken}
                clearToken={clearToken}
                sessionToken={sessionToken}
                updatePw={updatePw}
                unhashedPw={unhashedPw}
              />{" "}
            </Route>
            <Route exact path="/blogs">
              {" "}
              <BlogCards />{" "}
            </Route>
            <Route exact path="/blogCrud">
              <BlogsIndex sessionToken={sessionToken} />{" "}
            </Route>
            <Route exact path="/africa">
              {" "}
              <Africa sessionToken={sessionToken} />{" "}
            </Route>
            <Route exact path="/asia">
              {" "}
              <Asia sessionToken={sessionToken} />{" "}
            </Route>
            <Route exact path="/europe">
              {" "}
              <Europe sessionToken={sessionToken} />{" "}
            </Route>
            <Route exact path="/middleeast">
              {" "}
              <MiddleEast sessionToken={sessionToken} />{" "}
            </Route>
            <Route exact path="/mine">
              {" "}
              <Mine sessionToken={sessionToken} />{" "}
            </Route>
            <Route exact path="/northamerica">
              {" "}
              <NorthAmerica sessionToken={sessionToken} />{" "}
            </Route>
            <Route exact path="/southamerica">
              {" "}
              <SouthAmerica sessionToken={sessionToken} />{" "}
            </Route>
          </Switch>
        </section>
        <div className="menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/blogs">Destinations</a>
            </li>
            {sessionToken !== "" ? (
              <>
                <li>
                  {" "}
                  <a href="/" onClick={clearToken}>
                    {" "}
                    Logout{" "}
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="/mine">My blogs</a>{" "}
                </li>
              </>
            ) : (
              <li>
                <a href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      </>
    );
  }
}

export default Navbar;
