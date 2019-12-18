import React from 'react'
import Observable from "./Observable";

import * as firebase from 'firebase';
import { fireconf } from "./apiConfig";

//add import
import userInstance from "./userModel"

class MovieList extends Observable {
    constructor(props){
		super(props);

		this._list = [];
		this.user = [];

	}
	setUser(listName) {
		this.user = userInstance.getUserID();
		this.setList(listName);
	}

	setList(listName) {

		firebase.database().ref("userLists/" + this.user + "/" + listName + "/_list").once("value", snap => this._list = snap.val());
	}

	getFullList(stateName) {
		console.log(stateName);
		switch (stateName) {
			case "watch-series":
				this.setUser("storedList1");
				break;
			case "watch-movies":
				this.setUser("storedList2");
				break;
			case "history-series":
				this.setUser("storedList3");
				break;
			case "history-movies":
				this.setUser("storedList4");
				break;
			default:
				console.log("getFullList call went wrong from ListContainer");
				break;
		}
        return this._list;
    }
	addToList(Movie, listName) {
		this.setUser(listName);
		this._list.push(Movie);

		this.notifyObservers("addedItem");
    }
	removeFromList(id) {
		this.setUser();
        id = parseInt(id)
        let temp = this._list.findIndex(elem => elem.id === id );
		this._list.splice(temp, 1);

		this.notifyObservers("removedItem");
    }
    getAvrageRating(movie){
       let average = (this._list.map(movie => movie.vote_average).reduce((a,b) => a + b))/this._list.length
       return average.toFixed(2);
	}

}


export const watchedMovies = new MovieList();
export const watchedSeries = new MovieList();
export const wantMovies = new MovieList();
export const wantSeries = new MovieList();




