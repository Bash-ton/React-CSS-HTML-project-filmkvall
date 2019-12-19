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
        this.getTrending();
    }

    getTrending(){
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
            }).then(()=>model.getTrendingSeries()).then(obj => {
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
                trendingListMovie = this.state.trendingMovie.results.slice(0,4).map(movie =>(
                    <Link to={"/Details/?movie&" + movie.id}>
                        <img className="image" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={""}/>
                    </Link>
                    )
                )
                trendingListSerie = this.state.trendingSerie.results.slice(0,4).map(serie =>(
                        <Link to ={"/Details/?tv&" + serie.id}>
                            <img className="image" src={"https://image.tmdb.org/t/p/w500" + serie.poster_path} alt={""}/>
                        </Link>
                    )
                )
                break;
            default:

        }
        return (
            <div>
                <div className="gridcontainer">
                <div className="gridcontainer1">{trendingListMovie}</div>
                <div className="gridcontainer1">{trendingListSerie}</div>
                </div>
            </div>
        );
    }
}

export default Home;
