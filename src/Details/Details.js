import React, {Component} from "react";
import "./Details.css";
import {Link} from "react-router-dom";
import model from "../Data/apifetch";

class Details extends Component {

    constructor(props) {
        super(props);
        this.state= {
            status: "Loading"
        }

    }
    componentDidMount() {
        this.getMovie();
    }

    getMovie(){
        model.getMovieByTitle().then(obj =>{
            this.setState(
                {
                    movie: obj,
                    status:"Loaded"
                }
            )
        })
.catch(() => {
    this.setState(
        {status:"error"}
    )
})
}


    render(){
        let movie = null;
        switch (this.state.status) {
            case("Loading"):
                movie = <em>Loading...</em>;
            break;
            case("Loaded"):
                debugger
                movie = <div><img src = {"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path}/>
                <h1>{this.state.movie.title}</h1></div>;
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