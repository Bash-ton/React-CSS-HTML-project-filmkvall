import model from "../Data/apifetch";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash';
import "./SearchResult.css"


class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "Loading",
            type: this.props.type
        };
    }

    componentDidUpdate(prevProps) {
        if((this.props.title !== prevProps.title || this.props.type !== prevProps.type)){
            if(this.props.type === "actor"){
                this.getActor()
                return
            }
            this.getPicture();
        }
    }

    getActor() {
        let debounceCall = _.debounce(() => {
            model.getActorByName(this.props.title).then(act => {
                this.setState(
                    {
                        status: "loaded",
                        result: act
                    }
                )
            })
                .catch(() => {
                    this.setState(
                        {status: "error"}
                    )
                });
        }, 1000);
        debounceCall();
    }

    getPicture(){
        if(this.props.title !== ""){
            let debounceCall = _.debounce(() => {
                    model.getInfoByTitle(this.props.title,this.props.type).then(mov => {
                    this.setState(
                        {
                            status: "loaded",
                            result: mov
                        }
                    )
                })
                    .catch(() => {
                        this.setState(
                            {status: "error"}
                        )
                    });
            },1000);
            debounceCall();
        }
        else {
            this.setState(
                {
                    status: "no search",
                }
            )
        }
    }

    hideResults(){
        document.getElementById("search-result-given").style.display = "none";
    }
    addDefaultSrc(ev){
        ev.target.src = "../movie_reel.png"
    }


    render() {
        let searchResults = null;
        switch (this.state.status) {
            case "loading":
                searchResults = <em>Loading...</em>;
                break;
            case "no search":
                searchResults = <div></div>;
                break;
			case "loaded":
				switch (this.props.type) {
					case "movie":
						searchResults = this.state.result.results.slice(0, 3).map(movie => (
							<Link key={movie.id} className={"search-result-link"} to={"/Details/?movie&" + movie.id} onClick={() => this.hideResults()}>
								<div className={"search-result"}>
									<img alt={""} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} onError={this.addDefaultSrc} />
									<div className={"search-title"}>
										<p>{movie.title}</p>
										<p>{movie.release_date}</p>
									</div>
								</div>
							</Link>)
						);
						break;
					case "tv":
						searchResults = this.state.result.results.slice(0, 3).map(tv => (
							<Link className={"search-result-link"} to={"/Details/?tv&" + tv.id} onClick={() => this.hideResults()}>
								<div className={"search-result"}>
									<img alt={""} src={"https://image.tmdb.org/t/p/w500" + tv.poster_path} onError={this.addDefaultSrc} />
									<div className={"search-title"}>
										<p>{tv.name}</p>
										<p>{tv.first_air_date}</p>
									</div>
								</div>
							</Link>)
						);
						break;
					case "actor":
						searchResults = this.state.result.results.slice(0, 3).map(actor =>
							(
								<Link to={"/Info/?" + actor.id}>
									<div className={"search-result"}>
										<img alt={""} src={"https://image.tmdb.org/t/p/w500" + actor.profile_path} onError={this.addDefaultSrc} />
										<div className={"search-title"}>
											<p> {actor.name} </p>
										</div>
									</div>
								</Link>
							)
						);
						break;
					default:
						break;
				}
				break;
			default:
				break;
        }

        return(
            <div className={"search-result-body"}>
                {searchResults}
            </div>);
    }
}

export default SearchResult;
