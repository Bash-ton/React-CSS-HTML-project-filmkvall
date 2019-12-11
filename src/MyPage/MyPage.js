import React, { Component } from "react";
import "./MyPage.css"

class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userModel.getUser()
        };
    }

    componentDidMount() {
        this.props.userModel.addObserver(this);
    }

    componentWillUnmount() {
        this.props.userModel.removeObserver(this);
    }

    update(){
        this.setState({
            user: this.props.userModel.getUser()
        })
    }

    render() {
        let user = null;
        let profileImg = null;


        if (this.state.user === null){
           user = <p>Please login</p>
        }
        else{

                if (this.state.user.photoURL === null) {
                profileImg = "../Logo_Filmkvall.png"
                    user = <div className={"profilePic"}>
                        <img src={profileImg}/>
                        <p>{this.state.user.email}</p>
                    </div>
            }
                else{
                profileImg = this.state.user.photoURL

            user = <div className={"profilePic"}>
                <img src={profileImg}/>
                <p>{this.state.user.email}</p>
            </div>}
        }

        return(
            <div>
                {user}
            </div>
        );
    }


}

export default MyPage;