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
            url: searchId,
            status: "Loading",
            type: typeAndId[0],
            id: typeAndId[1]
        }

    }
    componentDidMount() {
        this.getMovie();
    }

    componentDidUpdate() {
        if (window.location.href !== this.state.url) {
            let searchId = window.location.href;
            let urlSplit = searchId.split("?");
            let typeAndId = urlSplit[1].split("&");
            this.setState({
                url: searchId,
                status: "Loading",
                type: typeAndId[0],
                id: typeAndId[1]
            },()=>{
                this.getMovie()
            });
        }
    }

    getMovie(){
        model.getDetailsById(this.state.type,this.state.id).then(obj =>{
            this.setState(
                {
                    movie: obj
                }
            );
        })
.catch(() => {
    this.setState(
        {status:"error"}
    )
}).then(()=> model.getCreditsById(this.state.type,this.state.id)).then(obj =>{
            this.setState(
                {
                    cast: obj,
                    status:"Loaded"
                }
            )
        })
            .catch(() => {
                this.setState(
                    {status:"error"}
                )}
            )
}

//todo inforamtion to add: cast, title,poster,synopsis,release_date,rating,similar_movies,original_lang,Budget,runtime,tagline
    render(){
        let name = null;
        let movie = null;
        let cast = null;
        switch (this.state.status) {
            case("Loading"):
                movie = <em>Loading...</em>;
            break;
            case("Loaded"):
                console.log(this.state);
                if (this.state.type === "tv")
                    name = this.state.movie.name;
                else
                    name = this.state.movie.title;
                cast = this.state.cast.cast.map(actors =>(<li>
                    {actors.name} : {actors.character}
                </li>));
                movie = <div>
                    <img src = {"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path}/>
                    <h1>{name}</h1>
                    <p>{this.state.movie.overview}</p>
                    <p> First released: {this.state.movie.release_date}</p>
                    <p>original language:{this.state.movie.original_language}</p>
                    <p>Budget: {this.state.movie.budget}usd</p>
                    <p>Runtime: {this.state.movie.runtime}min</p>
                    <p>tagline: {this.state.movie.tagline}</p>
                </div>;
                break;
        }


        return(
            <div>
                {movie}
                {cast}
            </div>
        )
    }
}

export default Details;