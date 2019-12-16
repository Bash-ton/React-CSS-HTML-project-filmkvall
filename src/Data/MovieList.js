import React from 'react'
import Observable from "./Observable";

class MovieList extends Observable {
    constructor(){
        super();
        this._list = [];
    }

    getFullList() {
        return this._list;
    }
    addToList(Movie){
        this._list.push(Movie);
    }
    removeFromList(id){
        id = parseInt(id)
        let temp = this._list.findIndex(elem => elem.id === id );
        this._list.splice(temp,1);
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




