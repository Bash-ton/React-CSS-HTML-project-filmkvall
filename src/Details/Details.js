import React, {Component} from "react";
import "./Details.css";
import {Link} from "react-router-dom";
import model from "../Data/apifetch";

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