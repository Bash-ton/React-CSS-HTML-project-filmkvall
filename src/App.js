import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import Details from "./Details/Details";
import Discover from "./Discover/Discover";
import "./App.css";
import Searchbar from "./Searchbar/Searchbar";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import MyPage from "./MyPage/MyPage";
import ResetPassword from "./ResetPassword/ResetPassword";
import PeopleDetails from "./PeopleDetails/PeopleDetails";
import userInstance from "./Data/userModel"


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
                  <Searchbar userModel={userInstance}/>
          </header>
            <Route
                exact path="/"
                render={() => <Home/>}
            />
            <Route
                path={"/SignUp"}
                render={()=> <SignUp userModel={userInstance}/>}
            />
            <Route
                path={"/SignIn"}
                render={()=> <SignIn userModel={userInstance}/>}
            />
            <Route
                path={"/ResetPassword"}
                render={()=> <ResetPassword userModel={userInstance}/>}
            />
            <Route
                path="/Details"
				render={() => <Details userModel={userInstance}/>}
            />
            <Route
                path={"/Discover"}
                render={() => <Discover/>}
            />
            <Route
                path={"/MyPage"}
				render={() => <MyPage userModel={userInstance} />}
            />
            <Route
                path={"/Info"}
                render={() => <PeopleDetails userModel={userInstance}/>}
            />
        </div>
    );
  }
}

export default App;
