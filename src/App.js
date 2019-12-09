import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import Details from "./Details/Details";
import Discover from "./Discover/Discover";
import "./App.css";
import Searchbar from "./Searchbar/Searchbar";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SingIn/SignIn";
import userInstance from "./Data/User"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



  render() {
    return (
        <div className="App">
          <header className="App-header">
                  <Searchbar user={userInstance}/>
          </header>
            <Route
                exact path="/"
                render={() => <Home/>}
            />
            <Route
                path={"/SignUp"}
                render={()=> <SignUp user={userInstance}/>}
            />
            <Route
                path={"/SignIn"}
                render={()=> <SignIn user={userInstance}/>}
            />
            <Route
                path="/Details"
                render={() => <Details/>}
            />
            <Route
                path={"/Discover"}
                render={() => <Discover/>}
            />
        </div>
    );
  }
}

export default App;
