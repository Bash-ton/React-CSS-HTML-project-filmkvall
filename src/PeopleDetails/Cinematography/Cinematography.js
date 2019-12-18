import React, {Component} from "react";
import {Link} from "react-router-dom";
import model from "../../Data/apifetch";

class Cinematography extends Component {

    constructor(props) {
        super(props);
        this.state= {
            status: "Loading",
            id: this.props.id
        }

    }
    componentDidMount() {
        this.getCinematography()
    }

    getCinematography(){
        model.getActorCredits(this.state.id).then(obj =>{
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
        return credits.cast.sort((a, b) => (a.release_date > b.release_date) ? 1 : (a.release_date === b.release_date) ? ((a.name > b.name) ? 1 : -1) : -1 )

    }

//todo inforamtion to add: cast, title,poster,synopsis,release_date,rating,similar_movies,original_lang,Budget,runtime,tagline
    render(){
        let credits = null;
        switch (this.state.status) {
            case("Loading"):
                credits = <em>Loading...</em>;
                break;
            case("Loaded"):
                credits = this.state.credits.map(credit => (
                    <Link to={"/Details/?" + credit.media_type + "&" + credit.id }>
                    <img src={"https://image.tmdb.org/t/p/w500" + credit.poster_path}/>
                    <p>{credit.title}</p>
                    </Link>
                    )
                );
                break;
        }
        return(
            <div>
                {credits}
            </div>
        )
    }
}

export default Cinematography;