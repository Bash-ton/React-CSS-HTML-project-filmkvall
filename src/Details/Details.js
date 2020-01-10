import React, {Component} from "react";
import "./Details.css";
import {Link} from "react-router-dom";
import model from "../Data/apifetch";
import Rating from "../Rating/Rating.js"

import { movieList } from "../Data/MovieList";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";


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
			id: typeAndId[1],
			loading: false,
        }
        this._isMounted = false;
    }

    componentDidMount() {
        this.getMovie();
        this._isMounted = true;
    }
    componentWillMount() {
        this._isMounted = false;
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
                }
            )
        })
            .catch(() => {
                this.setState(
                    {status:"error"}
                )}
            ).then(()=> model.getSimilar(this.state.type,this.state.id)).then(obj =>{
            this.setState(
                {
                    similar: obj,
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

	addToList = (event) => {
		//change to loading
		this.setState({
			loading: true
		});
		if (this.props.userModel.getUser() != null) {
			switch (event.target.id) {
				case "watchBtn":
					switch (this.state.type) {
						case "tv":
							movieList.setList("storedList1", this.props.userModel.getUser().uid);
							setTimeout(() => {
								movieList.addToList(this.state.movie, this.props.userModel.getUser().uid);

								this.setState({
									loading: false
								});
							}, 1000);
							break;
						default://movie

							movieList.setList("storedList2", this.props.userModel.getUser().uid);
							setTimeout(() => {
								movieList.addToList(this.state.movie, this.props.userModel.getUser().uid);

								this.setState({
									loading: false
								});
							}, 1000);
							break;
					}
					break;
				case "historyBtn":
					switch (this.state.type) {
						case "tv":

							movieList.setList("storedList3", this.props.userModel.getUser().uid);
							setTimeout(() => {
								movieList.addToList(this.state.movie, this.props.userModel.getUser().uid);

								this.setState({
									loading: false
								});
							}, 1000);
							break;
						default://movie

							movieList.setList("storedList4", this.props.userModel.getUser().uid);
							setTimeout(() => {
								movieList.addToList(this.state.movie, this.props.userModel.getUser().uid);

								this.setState({
									loading: false
								});
							}, 1000);

							break;
					}
					break;
				default:
					break;

			}
		} else {
			swal("You have to log in to manage your lists", "If you don't already have an account, use the 'signUp' button to create one!", "error");
			this.setState({
				loading: false
			});

		}

	}

    addDefaultSrc(ev){
        ev.target.src = "../movie_reel.png"
    }

//todo inforamtion to add: rating
    render(){
        let name = null;
        let movie = null;
        let cast = null;
        let price = null;
        let tagline = null;
        let runtime = null;
        let firstrelease = null;
        let language = null;
        let like = null;
        switch (this.state.status) {
            case("Loading"):
                movie = <em>Loading...</em>;
                break;
            case("Loaded"):
                if (this.state.type === "tv") {
                    name = this.state.movie.name;
                    price = "Seasons: " + this.state.movie.number_of_seasons + " Episodes: " + this.state.movie.number_of_episodes;
                    tagline = null;
                    runtime = "Episode Runtime: " + this.state.movie.episode_run_time + "min";
                    firstrelease = "First air date: " + this.state.movie.first_air_date;
                } else {
                    name = this.state.movie.title;
                    if (this.state.movie.budget !== 0) {
                        price = "Budget: " + this.state.movie.budget + "usd"
                    } else {
                        price = "Budget: Unknown/Undisclosed"
                    }
                    if (this.state.movie.tagline === "")
                        tagline = null;
                    else
                        tagline = '"' + this.state.movie.tagline + '"';
                    runtime = "Runtime: " + this.state.movie.runtime + "min";
                    firstrelease = "First released: " + this.state.movie.release_date;
                }
				cast = this.state.cast.cast.map(actors => (<Link  className={"details-actor"} to={"/Info/?" + actors.id}>
					<p className={"castname"}>{actors.name} is {actors.character}</p>
                    </Link>
                ));
                switch (this.state.movie.original_language) {
                    case ("fr"):
                        language = "French";
                        break;
                    case ("en"):
                        language = "English";
                        break;
                    case ("es"):
                        language = "Spanish";
                        break;
                    case ("pt"):
                        language = "Portuguese";
						break;
					default:
						break;
                }
                like = this.state.similar.results.slice(0, 4).map(movies => (
                    <Link to={"/Details/?" + this.state.type + "&" + movies.id}>
						<img className={"sim-pic"} src={"https://image.tmdb.org/t/p/w500" + movies.poster_path} alt={""} onError={this.addDefaultSrc}/>
                    </Link>));
                movie = <div className={"Details"}>

					<img className={"poster"} src={"https://image.tmdb.org/t/p/w500" + this.state.movie.poster_path} alt={""} onError={this.addDefaultSrc}/>
                    <h1 className={"title"}>{name}</h1>
                    <p className={"synopsis"}>{this.state.movie.overview}</p>
                    <p className={"releaseDate"}>{firstrelease}</p>
                    <p className={"orgiLang"}>original language: {language}</p>
                    <p className={"price"}>{price}</p>
                    <p className={"time"}>{runtime}</p>
                    <p className={"tagline"}>{tagline}</p>
                    <h2 className={"castTitle"}>Cast</h2>
                    <div className={"cast"}>
                        <div>{cast}</div>
                    </div>
                    <div className={"similar"}>{like}</div>

					<div className={"item13"}>
						<div className="sweet-loading">
							<ClipLoader
								size={40}
								color={"red"}
								loading={this.state.loading}
							/>
						</div>
						{this.state.loading ? null :
							<button className={"item14"} onClick={this.addToList} id={"watchBtn"}>Add to watchList</button>}
						{this.state.loading ? null :
							<button className={"item15"} onClick={this.addToList} id={"historyBtn"}>Add to already watched list</button>
						}
						
					</div>
                </div>;
				break;
			case ("error"):
				movie = <em>somethig went wrong!
					Please reload and try again!</em>;
				break;
			default:
				break;
        }
        return(
            <div>
                <Rating id={this.state.id}/>
                {movie}
            </div>
        )
    }
}



export default Details;
