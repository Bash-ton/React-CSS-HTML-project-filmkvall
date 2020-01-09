
import React, { Component } from "react";
//import "./listContainer.css";
//import {Link} from "react-router-dom";
//import model from "../Data/apifetch";
import "./ListContainer.css";
import List from "../List/List";

class ListContainer extends Component{
	constructor(props) {
		super(props);

		this.state = {
			listName: "storedList2",
			mounted: false,
		};



	}
	componentDidMount() {
		//reset the active list when loging out
		this.setState({
			mounted: true,

		});

	}
	componentWillUnmount() {
		//reset active list when loging out
		this.setState({
			mounted: false,

		});

	}

	chooseList = (event) => {
		let activeChild = null;

		switch (event.target.id) {
			
			case "watch-movies":
				activeChild = document.querySelector(".active");
				activeChild.className = null;
				event.target.className = "active";

				this.setState({
					listName: "storedList2"
				})

				break;
			case "watch-series":
				activeChild = document.querySelector(".active");
				activeChild.className = null;
				event.target.className = "active";

				this.setState({
					listName: "storedList1",
				})

				break;
			case "history-movies":
				activeChild = document.querySelector(".active");
				activeChild.className = null;
				event.target.className = "active";

				this.setState({
					listName: "storedList4",
				})
				break;
			case "history-series":
				activeChild = document.querySelector(".active");
				activeChild.className = null;
				event.target.className = "active";

				this.setState({
					listName: "storedList3",
				})
				break;
			default:
				break;

		}
		
		
		
	}

	render() {

		return (
			<div className={"MyList"}>
				<div id="navbar" className="hvr-shadow">
					<div onClick={this.chooseList} id={"watch-movies"} className="active">Watch List Movies</div>
					<div onClick={this.chooseList} id={"watch-series"}>Watch List Series</div>
					<div onClick={this.chooseList} id={"history-movies"}>Already Seen Movies</div>
					<div onClick={this.chooseList} id={"history-series"}>Already Seen Series</div>
				</div>
				<List name={this.state.listName} userID={this.props.userID} resetList={this.state.mounted}/>

			</div>
			
		);


	}

}

export default ListContainer;