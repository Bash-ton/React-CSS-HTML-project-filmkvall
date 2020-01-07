import React, {Component} from "react";
import {Link} from "react-router-dom";
import userRatingInstance from "../Data/userRating"
import PeopleDetails from "../PeopleDetails/PeopleDetails";

class Rating extends Component {

    constructor(props) {
        super(props);
        this.state= {
            id :this.props.id,
        };
    }

    render() {
    let hello = this.state;
    let temp = null;
    let rating = userRatingInstance.getRating(this.state.id);
        if(rating !== null){
            temp = rating.Rating;
        }
        else{
             temp = 0;
        }
        return(<div>
            <p>{temp}</p>
            <button onClick={() => userRatingInstance.addRating(3,this.state.id)}>Send Link</button>
            </div>)
    }

}
export default Rating;