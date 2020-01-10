import Observable from "./Observable";
import * as firebase from "firebase";
import {fireconf} from "./apiConfig";

class UserRating extends Observable {
    constructor(props) {
        super();
        this._list = [];
        this.userID = null

    }

    getList(){
        firebase.database().ref("userRating/" + this.userID).on("value",
                snap => {
                    if(snap.val() !== null){
                        this._list = snap.val();
                    }
                    else{
                        this._list = [];
                    }
                });
    }
    clearList(){
        this._list = [];
    }
    setUserID(id){
        this.userID = id
    }
    getRating(MovieID){
        if(this._list > 0){
            return this.list[this._list.findIndex(elem => elem.id === MovieID)];
        }
        return null;
    }
    
    removeRating(MovieID){
        let temp = this._list.findIndex(elem => elem.id === MovieID);
        this._list.splice(temp, 1);
        firebase.database().ref("userRating/ " + this.userID ).update({RatingList: this._list});
    }
    addRating(Rating,MovieID){
        let movie = {ID: MovieID, Rating : Rating};
        this._list.push(movie);
        firebase.database().ref("userRating/ " + this.userID ).update({RatingList: this._list});
    }
}

const userRatingInstance = new UserRating();
export default userRatingInstance;