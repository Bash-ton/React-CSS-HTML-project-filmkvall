import React, { Component } from "react";

import { Link } from "react-router-dom";
import model from "../Data/apifetch";

import "./List.css";
import { movieList } from "../Data/MovieList";




class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeList: null,

		}
		//prevents memory leak when unmounting
		this._isMounted = false;
		
	}

	

	componentDidMount() {
		//prevents memory leak when unmounting
		this._isMounted = true;

		movieList.setList(this.props.name, this.props.userID);
		this.fetchActiveList();
		
	}
	
	
	componentDidUpdate() {

		//prevents memory leak when unmounting
		if (this._isMounted) {
			movieList.setList(this.props.name, this.props.userID);

			setTimeout(() => {
				this.fetchActiveList();
			}, 1000);
		}

	}

	componentWillUnmount() {
		//prevents memory leak from async functions when unmounting
		this._isMounted = false;
	}


	//removes item from list
	removeFromList = (event) => {
		//prevents memory leak when unmounting
		if (this._isMounted) {

			let movieID = Number(event.target.id);
			movieList.setList(this.props.name, this.props.userID);

			setTimeout(() => {
				movieList.removeFromList(movieID, this.props.userID);
			}, 1000);
		}
	}

	//fetch the active list from DB
	fetchActiveList() {
		let createdList = null;

		//resets the old userlist if new user logs in
	
		//'_isMounted' prevents memory leak when unmounting
		//'resetList' prevents new user to see old user's list
		if (this._isMounted && this.props.resetList) {

			//Empty list text
			createdList = (
				<div className={"EmptyList"}>
					<br />
					This list is empty...
					<br />
					<br />
					<br />
					<br />
				</div>
			);


			if (movieList.getList() != null) {
				//start loading
				switch (this.props.name) {
					case "storedList2"://storedList2
					case "storedList4"://storedList4
						createdList = movieList.getList().map(movie => (
							<div key={movie.id}>
								<Link className={"search-result-link"} to={"/Details/?movie&" + movie.id}>
									<div className={"search-result"} >
										<img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
										<div className={"search-title"}>
											<p>{movie.title}</p>
											<p>{movie.release_date}</p>
										</div>
									</div>
								</Link>
								<button className={"deleteFromListBtn"} onClick={this.removeFromList} id={movie.id} value={movie}>Remove</button>
							</div>
						));
						//stop loading
						break;
					case "storedList1"://storedList1
					case "storedList3"://storedList3
						createdList = movieList.getList().map(tv => (
							<div key={tv.id}>
								<Link to={"/Details/?tv&" + tv.id}>
									<div className={"search-result"}>
										<img src={"https://image.tmdb.org/t/p/w500" + tv.poster_path} />
										<div className={"search-title"}>
											<p>{tv.name}</p>
											<p>{tv.first_air_date}</p>
										</div>
									</div>
								</Link>
								<button className={"deleteFromListBtn"} onClick={this.removeFromList} id={tv.id} value={tv}>Remove</button>
							</div>
						));
						//stop loading
						break;
					default:
						//stop loading
						break;


				}
			}
			this.setState({
				activeList: createdList,

			});
		}

	}

	render() {
		return (
			<div className={"ActiveList"}>{this.state.activeList}</div>
			);

	}
	
}
export default List;
