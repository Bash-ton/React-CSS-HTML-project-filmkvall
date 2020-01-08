import React, { Component } from "react";

import { Link } from "react-router-dom";
import model from "../Data/apifetch";

import "./List.css";
import { movieList } from "../Data/MovieList";
import ClipLoader from "react-spinners/ClipLoader";




class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeList: null,
			loading: false,

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
		//start loading
		this.setState({
			loading: true
		});

		//prevents memory leak when unmounting
		if (this._isMounted) {

			let movieID = Number(event.target.id);
			movieList.setList(this.props.name, this.props.userID);

			setTimeout(() => {
				movieList.removeFromList(movieID, this.props.userID);
				//stop loading
				this.setState({
					loading: false
				});
			}, 1000);
		}

		
	}

	//fetch the active list from DB
	fetchActiveList() {
		let createdList = null;

	
	
		//'_isMounted' prevents memory leak when unmounting
		//'resetList' prevents new user to see old user's list
		if (this._isMounted && this.props.resetList) {
			
		


			//Empty list text
			if (movieList.getList() === null) {
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

			
			}


			if (movieList.getList() != null) {
				
				switch (this.props.name) {
					case "storedList2":
					case "storedList4":
						createdList = movieList.getList().map(movie => (
							<div key={movie.id}>
								
									<div className={"list-result"} >
									<Link className={"list-result-link"} to={"/Details/?movie&" + movie.id}>
										<img className={"list-img"} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
										<div className={"list-title"}>
											<p>{movie.title}</p>
											<p>{movie.release_date}</p>
										</div>
									</Link>
										<div className="sweet-loading">
											<ClipLoader
												size={40}
												color={"red"}
												loading={this.state.loading}
											/>
										</div>
									{this.state.loading ? null :
										<button className={"deleteFromListBtn"} onClick={this.removeFromList} id={movie.id} value={movie}>Remove</button>
									}
									</div>
								
								
							</div>
						));
				
						break;
					case "storedList1":
					case "storedList3":
						createdList = movieList.getList().map(tv => (
							<div key={tv.id}>
								
									<div className={"list-result"}>
									<Link to={"/Details/?tv&" + tv.id}>
										<img className={"list-img"} src={"https://image.tmdb.org/t/p/w500" + tv.poster_path} />
										<div className={"list-title"}>
											<p>{tv.name}</p>
											<p>{tv.first_air_date}</p>
										</div>
									</Link>
									<div className="sweet-loading">
										<ClipLoader
											size={40}
											color={"red"}
											loading={this.state.loading}
										/>
									</div>
									{this.state.loading ? null :
										<button className={"deleteFromListBtn"} onClick={this.removeFromList} id={tv.id} value={tv}>Remove</button>
									}
									</div>
								
								
							</div>
						));
						//stop loading
						break;
					default:
						//stop loading
						break;


				}
				//stop loader
			

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
