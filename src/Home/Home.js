import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {ENDPOINT} from "../Data/apiConfig";
import model from "../Data/apifetch";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "Loading"
        };
    }
    componentDidMount() {
        this.getPicture();
    }

    getpic(){
        model.getTrending().then(obj => {
            this.setState(
                {
                    status:"loaded",
                    trending: obj
                }
            )
        })
            .catch(() => {
                this.setState(
                    {status:"error"}
                )
            });
    }

    getPicture(){
        model.getMovieByTitle("Pulp Fiction").then(obj => {
            this.setState(
                {
                    status:"loaded",
                    trending: obj
                }
            )
        })
            .catch(() => {
                this.setState(
                    {status:"error"}
                )
            });
    debugger
    }

    render() {
        debugger
        let trendingList = null;
        switch (this.state.status) {
            case "loading":
                trendingList = <em>Loading...</em>;
                break;
            case "loaded":
                debugger;
                trendingList = this.state.trending.results.map(movie =>(
                    <li>
                        <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}/>
                    </li>
                    )
                )
        }
        return (
            <div className="Welcome">
                <p>Welcome to the dinner planner React Startup code!</p>
                <div>{trendingList}</div>
                <div>{trendingList}</div>
                <Link to="/search">
                    <button className= "standard-btn" >Start planning</button>
                </Link>
            </div>
        );
    }
}

export default Home;
