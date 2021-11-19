import * as React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from "react-router-dom";

interface AppProps {}
interface AppState {
  sessionToken: string | null,
  unhashedPw: null | string,
}
 
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {  
      sessionToken: "",
      unhashedPw: ""
    };
  }
  
  componentDidMount() {
    if (localStorage.getItem("token")){
      this.setState({
        sessionToken: localStorage.getItem("token"),
        unhashedPw: localStorage.getItem("unhashedPw")
      });
    };
  };
  
  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken
    });
    console.log(this.state.sessionToken)
  }

  
  updatePw = (newPw: string) => {
    localStorage.setItem("unhashedPw", newPw);
    this.setState({
      unhashedPw: newPw
    })
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({
      sessionToken: "",
      unhashedPw: ""
    })
  }
  
  render() { 
    return (  
      <div className="App">
      <Router>
        <Navbar updateToken={this.updateToken} clearToken={this.clearToken} sessionToken={this.state.sessionToken} updatePw={this.updatePw} unhashedPw={this.state.unhashedPw} />
      </Router>
    </div>
    );
  }
}
 
export default App;