import React from "react";
import { Component } from "react";
import * as firebase from "firebase";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    checkCredentials(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
        });
    }


    render(){
        return(
            <div>
                Hello
            </div>);

    }
}

export default SignUp;