import React, {Component} from "react";
//import {Link} from "react-router-dom";
import model from "../Data/apifetch";
import "./PeopleDetails.css"
import Cinematography from "./Cinematography/Cinematography";

class PeopleDetails extends Component {

    constructor(props) {
        super(props);
        let searchId = window.location.href;
        let urlSplit = searchId.split("?");
        this.state= {
            status: "Loading",
            id: urlSplit[1]
        }
        this._isMounted = false;

    }
    componentDidMount() {
        this._isMounted = true;
        this.getPerson()
    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    componentDidUpdate() {
        if (this._isMounted) {
            if (window.location.href !== this.state.url) {
                let searchId = window.location.href;
                let urlSplit = searchId.split("?");

                this.setState({
                    url: searchId,
                    status: "Loading",
                    id: urlSplit[1]
                },()=>{
                    this.getPerson()
                });
            }
        }

    }

    getPerson(){
        model.getActorById(this.state.id).then(obj =>{
            this.setState(
                {
                    status: "Loaded",
                    actor: obj
                }
            )
        })
            .catch(() => {
                this.setState(
                    {status:"error"}
                )}
            )
    }

    addDefaultSrc(ev){
        ev.target.src = "../movie_reel.png"
    }

//todo inforamtion to add: cast, title,poster,synopsis,release_date,rating,similar_movies,original_lang,Budget,runtime,tagline
    render(){
        let movie = null;
        switch (this.state.status) {
            case("Loading"):
                movie = <em>Loading...</em>;
                break;
            case("Loaded"):
                movie = <div className={"actor-bio"}>
                    <img alt={""}
                         src={"https://image.tmdb.org/t/p/w500" + this.state.actor.profile_path}
                         onError={this.addDefaultSrc} />
                    <div>
                    <p> {this.state.actor.name}</p>
                    <p> {this.state.actor.place_of_birth} </p>
                    <p> {this.state.actor.known_for_department} </p>
                    <p> {this.state.actor.birthday}</p>
                    <p> {this.state.actor.biography}</p>
                    </div>
                    </div>;
				break;
			default:
				break;
        }
                return(
                    <div className={"actor-info"}>
                        {movie}
                        <Cinematography id = {this.state.id}/>
                    </div>
                )
    }
}

export default PeopleDetails;