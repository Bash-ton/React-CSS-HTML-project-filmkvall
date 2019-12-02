import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import "./App.css";

class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <Route
                path=""
                render={() => <Home/>}
            />
          </header>
        </div>
    );
  }
}

export default App;
