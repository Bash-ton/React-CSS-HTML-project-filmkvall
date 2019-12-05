import React from "react";
import { Component } from "react";
import * as firebase from "firebase";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    registerUser(email,password){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
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