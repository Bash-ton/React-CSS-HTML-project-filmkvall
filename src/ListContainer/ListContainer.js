import React, {Component} from "react";
//import "./listContainer.css";
import {Link} from "react-router-dom";
import model from "../Data/apifetch";
import "./ListContainer.css";

//import list instances
import { watchedMovies } from "../Data/MovieList";
import { watchedSeries } from "../Data/MovieList";
import { wantMovies } from "../Data/MovieList";
import { wantSeries } from "../Data/MovieList";

class ListContainer extends Component{
	constructor(props) {
		super(props);

		this.state = {
			listType: "watch-movies",
			listName: wantMovies,
		};

		console.log(this.props.userID);

	}
	
	componentDidMount() {
		console.log("first");
		

	}
	componentWillUnmount() {
		console.log("unmounted");
	}



	chooseList = (event) => {
		let activeChild = null;

		switch (event.target.id) {
			
			case "watch-movies":
				activeChild = document.querySelector(".active");
				activeChild.className = null;
				event.target.className = "active";

				this.setState({
					listType: "watch-movies",
					listName: wantMovies
				})

				break;
			case "watch-series":
				activeChild = document.querySelector(".active");
				activeChild.className = null;
				event.target.className = "active";

				this.setState({
					listType: "watch-series",
					listName: wantSeries,
				})

				break;
			case "history-movies":
				activeChild = document.querySelector(".active");
				activeChild.className = null;
				event.target.className = "active";

				this.setState({
					listType: "history-movies",
					listName: watchedMovies,
				})
				break;
			case "history-series":
				activeChild = document.querySelector(".active");
				activeChild.className = null;
				event.target.className = "active";

				this.setState({
					listType: "history-series",
					listName: watchedSeries,
				})
				break;
			default:
				break;

		}
		
	}
	//add remove button
	render() {
		let createdList = null;

		createdList = (
			<div class={"EmptyList"}>
				<br />
				This list is empty...
				<br />
				<br />
				<br />
				<br />
			</div>
		)
		
		if (this.state.listName.getFullList(this.state.listType) != null) {

			

			switch (this.state.listType) {
				case "watch-movies":
				case "history-movies":
					createdList = this.state.listName.getFullList(this.state.listType).map(movie => (
						<Link className={"search-result-link"} to={"/Details/?movie&" + movie.id}>
							<div className={"search-result"} >
								<img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
								<div className={"search-title"}>
									<p>{movie.title}</p>
									<p>{movie.release_date}</p>
								</div>
							</div>
						</Link>
					));					
					break;
				case "watch-series":
				case "history-series":
					createdList = this.state.listName.getFullList(this.state.listType).map(tv => (
						<Link to={"/Details/?tv&" + tv.id}>
							<div className={"search-result"}>
								<img src={"https://image.tmdb.org/t/p/w500" + tv.poster_path} />
								<div className={"search-title"}>
									<p>{tv.name}</p>
									<p>{tv.first_air_date}</p>
								</div>
							</div>
						</Link>
					));
					break;
				default:
					break;

			}
		}
		
		return (
			<div class={"MyList"}>
				<div id="navbar" class="hvr-shadow">
					<div onClick={this.chooseList} id={"watch-movies"} class="active" >Watch List Movies</div>
					<div onClick={this.chooseList} id={"watch-series"}>Watch List Series</div>
					<div onClick={this.chooseList} id={"history-movies"}>Already Seen Movies</div>
					<div onClick={this.chooseList} id={"history-series"}>Already Seen Series</div>
				</div>
				<div class={"createdlistTV"}>{createdList}</div>

			</div>
			
		);


	}

}

export default ListContainer;