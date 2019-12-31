import Observable from "./Observable";
import * as firebase from "firebase";
import {fireconf} from "./apiConfig";

class UserRating extends Observable {
    constructor(props) {
        super();


    }

}

const userRatingInstance = new UserRating();
export default userRatingInstance;