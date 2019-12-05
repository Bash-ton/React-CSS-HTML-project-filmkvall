import React from "react";
import { Component } from "react";
import firebase from "./../Firebase";

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
    render(){
        return(
            <div>
                <input className={"releaseYear"} onChange={evt => this.updateEmail(evt)} />
                <input className={"releaseYear"} onChange={evt => this.updatePass(evt)}/>
                <button onClick={() => this.registerUser(this.state.email,this.state.pass)}> Submit</button>
            </div>);

    }
}

export default SignUp;