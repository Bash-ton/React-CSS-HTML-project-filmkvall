import React from "react";
import { Component } from "react";
import * as firebase from "firebase";

class SignIn extends Component {
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
            console.log(errorMessage);
            // ...
        });
    }
    updateEmail (evt){
        this.setState({
            email: evt.target.value
        });
    }
    updatePass (evt){
        this.setState({
            pass: evt.target.value
        });
    }
    userIsAuthed(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                console.log(displayName);
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });
    }

    render(){
        let user = firebase.auth().currentUser;
        if(user !== null){
            console.log(user.email)
        }
        return(
            <div>
                <input className={"releaseYear"} onChange={evt => this.updateEmail(evt)} />
                <input className={"releaseYear"} onChange={evt => this.updatePass(evt)}/>
                <button onClick={() => this.checkCredentials(this.state.email,this.state.pass)}> Login</button>
            </div>);

    }
}

export default SignIn;