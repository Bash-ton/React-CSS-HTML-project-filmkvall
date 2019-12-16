import React, {Component} from "react";
//import "./listContainer.css";
import {Link} from "react-router-dom";
import model from "../Data/apifetch";

//import list instances
import { watchedMovies } from "../Data/MovieList";
import { watchedSeries } from "../Data/MovieList";
import { wantMovies } from "../Data/MovieList";
import { wantSeries } from "../Data/MovieList";

class ListContainer extends Component{
	constructor(props) {
		super(props);
	
		// We create the state to store the various statuses
		// e.g. API data loading or error
	}


	render(){
		return (
			<div id="navbar">
				<button>ett</button>
				<button>tva</button>
				<button>tre</button>
				<button>fyra</button>
			</div>
			
			
			);

	}

}

export default ListContainer;