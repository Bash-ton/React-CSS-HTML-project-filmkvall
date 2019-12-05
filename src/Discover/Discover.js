import React, {Component} from "react";
import SearchResult from "../SearchResult/SearchResult";
import SearchResultActor from "../SearchResultActor/SearchResultActor";

class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "Loading",
            adult: false
        }
    }


    updateActor(evt) {
        this.setState({
            actor : evt.target.value
        });
    }

    updateType(evt) {
        this.setState({
            type : evt.target.value
        });
    }
    updateReleaseYear(evt){
        this.setState({
            releaseYear : evt.target.value
        });
    }
    updateIncludeAdult(evt){
        if(evt.target.checked(true)){
            this.setState({
                adult: true
            })
        }
        else{
            this.setState({
                adult: false
            })
        }

    }

    render() {

        return (
            <div>
                <div>
                    <select id={"search-select-type"} onChange={evt => this.updateType(evt)}>
                        <option value={"movie"}>Movie</option>
                        <option value={"tv"}>Tv-Series</option>
                    </select>
                    <div>
                        <input className={"actorName"} onChange={event => this.updateActor(event)}/>
                        <SearchResultActor actor = {this.state.actor}/>
                    </div>

                    <input className={"releaseYear"} onChange={event => this.updateReleaseYear(event)}/>
                    <input type="checkbox" className={"includeAdult"} onChange={event => this.updateIncludeAdult(event)}/>
                </div>
            </div>
        );
    }
}

export default Discover;