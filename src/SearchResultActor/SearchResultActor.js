import React, {Component} from "react";
import _ from "lodash";
import model from "../Data/apifetch";

class SearchResultActor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "Loading"
        }

    }
    componentDidUpdate(prevProps) {
        if(this.props.actor !== prevProps.actor) {
            this.getActorSearch();
        }
    }

    componentDidMount() {
        this.getActorSearch();
    }


    getActorSearch() {
        let debounceCall = _.debounce(() => {
            model.getActorByName(this.props.actor).then(act => {
                this.setState(
                    {
                        status: "loaded",
                        actor: act
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

    render(){
        let actorSearch = null;
            switch (this.state.status) {
                case "loading":
                    actorSearch = <em>Loading...</em>;
                    break;
                case "no search":
                    actorSearch = <div>Fuck off</div>;
                    break;
                case "loaded":
                    actorSearch = this.state.actor.results.slice(0, 3).map(actor =>
                        (
                        <div>
                            <div className={"search-Result"}></div>
                            <img src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}/>
                            <p value = {actor.id}> {actor.name} </p>
                            </div>
                        )
                    );
            }
    return(
        <div>
            {actorSearch}
        </div>
    )
    }
}

export default SearchResultActor;
