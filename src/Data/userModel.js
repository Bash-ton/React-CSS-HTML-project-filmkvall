import * as firebase from 'firebase';
import Observable from "./Observable";
import {fireconf} from "./apiConfig";

class UserModel extends Observable {
    constructor() {
        super();
        firebase.initializeApp(fireconf);
        firebase.analytics();
        firebase.auth();
        this.user = this.setUser();
    }

    setUser(){
        this.authListener();
    }

    getUser(){
        return this.user;
    }

    authListener() {
       firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = firebase.auth().currentUser;
                this.notifyObservers();
            } else {
                this.user = null;
                this.notifyObservers();
            }
        });
    }

    doSignOutUser(){
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);
        });
        this.authListener();
    }

    doSignInUserWithEmailAndPassword(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

        this.authListener();
    }
    doSendAuthenticationToEmail(){
        this.user.sendEmailVerification().then(function() {
            // Email sent.
        }).catch(function(error) {
            // An error happened.
        });
    }

    doCreateUserWithEmailAndPassword(email, password){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else if(errorCode == 'auth/invalid-email') {
                alert("Invalid email");
            }
            else if(errorCode == 'auth/operation-not-allowed') {
                alert("The service is not available, please try again later");
            }
            else if(errorCode == 'auth/email-already-in-use') {
                alert("The email is already in use \n If you have forgotten your password you can reset it please check the link below");
            }
            // ...
        });
    }


}
const userInstance = new UserModel();
export default userInstance;