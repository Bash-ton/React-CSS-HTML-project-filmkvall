import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import Details from "./Details/Details";
import "./App.css";
import Searchbar from "./Searchbar/Searchbar";

class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
                  <Searchbar/>
          </header>
            <switch>
            <Route
                exact path="/"
                render={() => <Home/>}
            />
            <Route
                path="/Details"
                render={() => <Details/>}
            />
            </switch>
        </div>
    );
  }
}

export default App;
