import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import model from "../Data/apifetch";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "Loading"
        };
    }
    componentDidMount() {
        this.getMov();
        this.getSer();
    }

    getMov(){
        model.getTrendingMovie().then(obj => {
            this.setState(
                {
                    trendingMovie: obj
                }
            )
        })
            .catch(() => {
                this.setState(
                    {status:"error"}
                )
            })
    }

    getSer(){
        model.getTrendingSeries().then(obj => {
            this.setState(
                {
                    trendingSerie: obj,
                    status: "Loaded"
                }
            )
        })
            .catch(() => {
                this.setState(
                    {status:"error"}
                )
            });
    }


    render() {
        let trendingListMovie = null;
        let trendingListSerie = null;
        switch (this.state.status) {
            case "Loading":
                trendingListMovie = <em>Loading...</em>;
                trendingListSerie = <em>Loading...</em>;
                break;
            case "Loaded":
                trendingListMovie = this.state.trendingMovie.results.splice(0,4).map(movie =>(
                    <Link to="/Details">
                        <img className="image" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} value = {movie}/>
                    </Link>
                    )
                )
                trendingListSerie = this.state.trendingSerie.results.splice(0,4).map(serie =>(
                        <Link to ="/Details">
                            <img className="image" src={"https://image.tmdb.org/t/p/w500" + serie.poster_path}/>
                        </Link>

                    )
                )
        }
        return (
            <div>
                <p>Welcome to the dinner planner React Startup code!</p>
                <div className="gridcontainer">
                <div className="gridcontainer1">{trendingListMovie}</div>
                <div className="gridcontainer1">{trendingListSerie}</div>
                </div>
                <Link to="/search">
                    <button className= "standard-btn" >Start planning</button>
                </Link>

            </div>
        );
    }
}

export default Home;
