import React, { Component } from "react";
import "./MyPage.css"

import ListContainer from "../ListContainer/ListContainer";


class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
			user: this.props.userModel.getUser(),
			
		};
    }

	componentDidMount() {
		console.log("mounted");
        this.props.userModel.addObserver(this);
    }

	componentWillUnmount() {
		console.log("unmounted");
        this.props.userModel.removeObserver(this);
    }

	update() {
		console.log("update");
        this.setState({
            user: this.props.userModel.getUser()
        })
    }

    render() {
        let user = null;
        let profileImg = null;


         switch(this.state.user){
             case null:
                user = <p>Please login</p>;
                break;
             case undefined:
                 user = <p>Loading</p>;
                 break;
             default:
                if (this.state.user.photoURL === null) {
                profileImg = "../Logo_Filmkvall.png"
                    user = <div className={"profilePic"}>
                        <img src={profileImg} alt={""}/>
                        <p>{this.state.user.email}</p>
                    </div>
                }
                else{
                profileImg = this.state.user.photoURL
                 user = <div className={"profilePic"}>
                <img src={profileImg} alt={""}/>
                <p>{this.state.user.email}</p>
            </div>}
                break;
        }
		//
        return(
            <div>
				{user}
				{this.state.user ? 
					<ListContainer userID={this.props.userModel.getUser().uid} /> : null
				}
            </div>
        );
    }
}

export default MyPage;