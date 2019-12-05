import React, { Component } from "react";
import SearchResult from "../SearchResult/SearchResult";
import "./Searchbar.css";

class Searchbar extends Component {
    constructor(props) {
        super(props);
        // We create the state to store the various statuses
        // e.g. API data loading or error
        this.state = {
            title: "",
            type: "movie"
        }
    }

    updateTitle(evt) {
        this.setState({
            title : evt.target.value
        });
    }

    updateType(evt) {
        this.setState({
            type : evt.target.value
        });
    }

    render() {

        return (<div className={"search-body"}>
                <img src={"../Logo_Filmkvall.png"}/>
                    <div className={"search-field"}>
                        <select id={"search-select-type"} onChange={evt => this.updateType(evt)}>
                            <option value={"movie"}>Movie</option>
                            <option value={"tv"}>Tv-Series</option>
                        </select>
                        <input className={"search-input"} placeholder={"Search Movie"} onChange={evt => this.updateTitle(evt)}/>
                        <SearchResult title={this.state.title} type={this.state.type}/>
                    </div>
                    <div className={"login"}>
                        <button>LogIn</button>
                        <button>SignIn</button>
                    </div>

                </div>
                );
}
}

export default Searchbar;
