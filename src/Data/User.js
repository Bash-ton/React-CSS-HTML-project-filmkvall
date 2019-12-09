import * as firebase from 'firebase';
import Observable from "./Observable";
import {fireconf} from "./apiConfig";

class User extends Observable {
    constructor() {
        super();
        firebase.initializeApp(fireconf);
        firebase.analytics();
        firebase.auth();
        this.user = null;
    }


    getUser(){

        let user = firebase.auth().currentUser;
        return user;
    }

    authListener() {
       firebase.auth().onAuthStateChanged((hello) => {
            if (hello) {
                this.user = firebase.auth().currentUser;

            } else {
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