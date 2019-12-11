import React, { Component } from "react";
import firebase from "firebase";

class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: firebase.auth().currentUser
        }
    }

    componentDidMount() {
        this.props.user.addObserver(this);
    }

    componentWillUnmount() {
        this.props.user.removeObserver(this);
    }

    render() {

        return(
            <div>

            </div>
        );
    }


}

export default MyPage;