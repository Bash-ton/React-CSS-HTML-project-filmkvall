import React, {Component} from "react";
import {Link} from "react-router-dom";
import model from "../../Data/apifetch";
import "./Cinematography.css"

class Cinematography extends Component {

    constructor(props) {
        super(props);
        this.state= {
            status: "Loading",
            cinematography: "hidden" ,
        }

        this._isMounted = false;

    }
    componentDidMount() {
        this._isMounted = true;
        this.getCinematography()
    }
    componentDidUpdate() {
        if (this._isMounted) {
            this.getCinematography();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getCinematography(){
        
        model.getActorCredits(this.props.id).then(obj =>{
            let credits = this.sortCreditsByDate(obj);
            this.setState(
                {
                    status: "Loaded",
                    credits: credits
                }
            )
        })
            .catch(() => {
                this.setState(
                    {status:"error"}
                )}
            )
    }

    sortCreditsByDate(credits){
        credits.cast = credits.cast.map(credit =>{
                if(credit.first_air_date !== undefined){
                    credit.release_date = credit.first_air_date;
                    return credit;
                }
                else{
                   return credit;
                }
            });

        return credits.cast.sort((a, b) => (a.release_date < b.release_date) ? 1 : (a.release_date === b.release_date) ? ((a.name > b.name) ? 1 : -1) : -1 )

    }
    addDefaultSrc(ev){
        ev.target.src = "../movie_reel.png"
    }


//todo inforamtion to add: cast, title,poster,synopsis,release_date,rating,similar_movies,original_lang,Budget,runtime,tagline
    render(){
        let credits = null
        let button = null
        switch (this.state.status) {
            case("Loading"):
                credits = <em>Loading...</em>;
                break;


            case("Loaded"):
                switch (this.state.cinematography) {
                    case "hidden":
                        credits = this.state.credits.slice(0,4).map(credit => (
							<div key={credit.id}>
                                <Link className={"movie-link"} to={"/Details/?" + credit.media_type + "&" + credit.id }>
									<img alt={""} className={"cinemaImg"} src={"https://image.tmdb.org/t/p/w500" + credit.poster_path} onError={this.addDefaultSrc}/>
                                    <p>{credit.title}</p>
                                </Link>
                            </div>
                            )
                        );
                        button = <button className={"nav-button"} onClick={() => this.setState({cinematography: "show"})}>Show full cinematography</button>;
                        break;



					case "show":
						credits = this.state.credits.map(credit => (
							<div key={credit.id}>
								<Link className={"movie-link"} to={"/Details/?" + credit.media_type + "&" + credit.id}>
									<img alt={""} src={"https://image.tmdb.org/t/p/w500" + credit.poster_path} />
									<p>{credit.title}</p>
								</Link>
							</div>
						)
						);
						button = <button className={"nav-button"} onClick={() => this.setState({ cinematography: "hidden" })}>Hide cinematography</button>
						break;
					default:
						break;

				}
				break;
			default:
				break;
        }
        return(
            <div>
                <div className={"actor-movie-list"}>
                    {credits}
                </div>
                {button}
            </div>
        )
    }
}

export default Cinematography;