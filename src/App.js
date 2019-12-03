import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import Details from "./Details/Details";
import "./App.css";

class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <Route
                path="/Home"
                render={() => <Home/>}
            />
            <Route
                path="/Details"
                render={() => <Details/>}
            />
          </header>
        </div>
    );
  }
}

export default App;
