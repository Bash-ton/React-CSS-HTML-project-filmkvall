import React, {Component} from "react";
import "./Details.css";
import {Link} from "react-router-dom";
import model from "../Data/apifetch";

//import list instances
import { watchedMovies } from "../Data/MovieList";
import { watchedSeries } from "../Data/MovieList";
import { wantMovies } from "../Data/MovieList";
import { wantSeries } from "../Data/MovieList";


class Details extends Component {

    constructor(props) {
        super(props);
        let searchId = window.location.href;
        let urlSplit = searchId.split("?");
        let typeAndId = urlSplit[1].split("&");
        this.state= {
            status: "Loading",
            type: typeAndId[0],
            id: typeAndId[1]
        }

    }
    componentDidMount() {
        this.getMovie();
        this.getCredits();
    }

    getCredits(){
        model.getCreditsById(this.state.type,this.state.id).then(obj =>{
            console.log(obj);
            this.setState(
                {
                    cast: obj
                }
            )
            this.forceUpdate();
        })
    .catch(() => {
    this.setState(
        {status:"error"}
    )}
    )
    }

    getMovie(){
        model.getDetailsById(this.state.type,this.state.id).then(obj =>{
            this.setState(
                {
                    movie: obj,
                    status:"Loaded"
                }
            );
            this.forceUpdate();
        })
.catch(() => {
    this.setState(
        {status:"error"}
    )
})
}
	
	addToList = (event) => {
		switch (event.target.id) {
			case "watch":
				switch (this.state.type) {
					case "tv":
						wantSeries.addToList(this.state.movie);
						console.log("watch tv");
						break;
					default://movie
						wantMovies.addToList(this.state.movie);
						console.log("watch movie");
						//console.log(wantMovies.getFullList());
						break;
				}
				break;
			case "history":
				switch (this.state.type) {
					case "tv":
						watchedSeries.addToList(this.state.movie);
						console.log("hist tv");
						break;
					default://movie
						watchedMovies.addToList(this.state.movie);
						console.log("hist movie");
						break;
				}
				break;
			default:
				break;

		}

	}

//todo inforamtion to add: cast, title,poster,synopsis,release_date,rating,similar_movies,original_lang,Budget,runtime,tagline
    render(){
        let name = null;
        let movie = null;
        switch (this.state.status) {
            case("Loading"):
                movie = <em>Loading...</em>;
            break;
            case("Loaded"):
                if (this.state.type === "tv")
                    name = this.state.movie.name;
                else
                    name = this.state.movie.title;
                movie = <div><img src = {"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path}/>
                <h1>{name}</h1>
                <p>{this.state.movie.overview}</p>
					<p> </p>
					<button onClick={this.addToList} id={"watch"}>Add to watchList</button>
					<button onClick={this.addToList} id={"history"}>Add to already watched list</button>
                </div>;
                break;
        }


        return(
            <div>
                {movie}
            </div>
        )
    }
}

export default Details;