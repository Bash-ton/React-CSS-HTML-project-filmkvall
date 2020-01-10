import React, {Component} from "react";
import {Link} from "react-router-dom";
import userRatingInstance from "../Data/userRating"
import PeopleDetails from "../PeopleDetails/PeopleDetails";
import StarRating from 'react-svg-star-rating'

class Rating extends Component {

    constructor(props) {
        super(props);
        this.state= {
            id :this.props.id,
            theRate : <StarRating/>
        };
    }

    render() {
    let hello = this.state;
    let temp = null;
    let rating = userRatingInstance.getRating(this.state.id);
        if(rating !== null){
            this.state.theRate = rating.Rating;
        }
        else{
             temp = 0;
        }
        return(
        <div>
        <div>{temp}</div>
          <p>Rating : </p><span><StarRating isHalfRating = {true} handleOnClick = {(rating)=>{userRatingInstance.addRating(rating,this.state.id)}}/></span>
           </div>)
    }

}
export default Rating;