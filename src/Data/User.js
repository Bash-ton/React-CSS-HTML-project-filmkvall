import * as firebase from 'firebase';
import Observable from "./Observable";
import {fireconf} from "./apiConfig";

class User extends Observable {
    constructor() {
        super();
        firebase.initializeApp(fireconf);
        firebase.analytics();
        firebase.auth();
        this.user = 0;
    }


    getUser(){
        return firebase.auth().currentUser;
    }

    authListener() {
       firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('user changed..', user);
                this.user = user;

            } else {
                // No user is signed in.
                console.log("NoUser");
                this.user = null;
            }
        });
        this.notifyObservers();
    }

    doSignOutUser(){
        firebase.auth.signOut().then(function () {
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);

        });
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

    doCreateUserWithEmailAndPassword(email, password){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }


}
const userInstance = new User();
export default userInstance;