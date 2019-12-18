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
        let price = null;
        let tagline = null;
        let runtime = null;
        let firstrelease = null;
        switch (this.state.status) {
            case("Loading"):
                movie = <em>Loading...</em>;
            break;
            case("Loaded"):
                if (this.state.type === "tv"){
                    name = this.state.movie.name;
                    price = "Seasons: " + this.state.movie.number_of_seasons + " Episodes: " + this.state.movie.number_of_episodes;
                    tagline = null;
                    runtime = "Episode Runtime: " + this.state.movie.episode_run_time + "min";
                    firstrelease = "First air date: " + this.state.movie.first_air_date;
                }
                else{
                    name = this.state.movie.title;
                    price = "Budget: " + this.state.movie.budget + "usd";
                    tagline = this.state.movie.tagline;
                    runtime = "Runtime: " + this.state.movie.runtime + "min";
                    firstrelease = "First released: " + this.state.movie.release_date;
                }
                cast = this.state.cast.cast.map(actors =>(<Link className={"details-actor"} to={"/Info/?" + actors.id} >
                     <p className={"castname"}>{actors.name} : {actors.character}</p>
                    </Link>
                ));
                movie = <div className={"Details"}>
                    <img  className={"item1"} src = {"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path}/>
                    <h1 className={"item2"}>{name}</h1>
                    <p className={"item3"}>{this.state.movie.overview}</p>
                    <p className={"item4"}>{firstrelease}</p>
                    <p className={"item5"}>original language: {this.state.movie.original_language}</p>
                    <p className={"item6"}>{price}</p>
                    <p className={"item7"}>{runtime}</p>
                    <p className={"item8"}>"{tagline}"</p>
                    <h2 className={"item10"}>Cast</h2>
                    <div className={"item9"}><div>{cast}</div></div>
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