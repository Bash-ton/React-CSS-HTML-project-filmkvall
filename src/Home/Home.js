import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class Welcome extends Component {
    render() {
        return (
            <div className="Welcome">
                <p>Welcome to the dinner planner React Startup code!</p>
                <Link to="/search">
                    <button className= "standard-btn" >Start planning</button>
                </Link>
            </div>
        );
    }
}

export default Welcome;
