import React from 'react'
import Observable from "./Observable";

import * as firebase from 'firebase';
import { fireconf } from "./apiConfig";

//add import
import userInstance from "./userModel"
import swal from "sweetalert";

class MovieList extends Observable {
    constructor(props){
		super(props);

		this._list = null;
		this.listName = null;


	}


	//get the wanted list (1 out of 4 total)
	setList(listName, userID) {

		this.listName = listName;
		firebase.database().ref("userLists/" + userID + "/" + listName).on("value", snap => this._list = snap.val());

	}

	removeFromList(movieID, userID) {

		//unique to remove
		let temp = this._list.findIndex(elem => elem.id === movieID);
		this._list.splice(temp, 1);

		//same as add, fix later
		switch (this.listName) {
			case "storedList1":
				firebase.database().ref("userLists/" + userID).update({
					storedList1: this._list
				});
				break;
			case "storedList2":
				firebase.database().ref("userLists/" + userID).update({
					storedList2: this._list
				});

				break;
			case "storedList3":
				firebase.database().ref("userLists/" + userID).update({
					storedList3: this._list
				});

				break;
			case "storedList4":
				firebase.database().ref("userLists/" + userID).update({
					storedList4: this._list
				});

				break;
			default:
				break;
		}

	}

	addToList(movie, userID) {
		//prevent crash when new list user
		if (this._list === null) {
			this._list = [];
		}

		//prevent duplicates, unique to add
		let temp = this._list.findIndex(elem => elem.id === movie.id);


		//unique to add
		if (temp < 0) {
			this._list.push(movie);


			//same as remove, fix later
			switch (this.listName) {
				case "storedList1":
					firebase.database().ref("userLists/" + userID).update({
						storedList1: this._list
					});
					break;
				case "storedList2":
					firebase.database().ref("userLists/" + userID).update({
						storedList2: this._list
					});

					break;
				case "storedList3":
					firebase.database().ref("userLists/" + userID).update({
						storedList3: this._list
					});

					break;
				case "storedList4":
					firebase.database().ref("userLists/" + userID).update({
						storedList4: this._list
					});

					break;
				default:
					break;
			}

			swal("Added to your list!", "Check out your lists at 'MyPage'", "success");
		} else {
			swal("Already added to yout list!", "", "info");
		}




	}
	//return this list
	getList() {
		return this._list;

	}

}

export const movieList = new MovieList();
