import * as firebase from 'firebase';
import Observable from "./Observable";
import {fireconf} from "./apiConfig";

class User extends Observable {
    constructor() {
        super();
        firebase.initializeApp(fireconf);
        firebase.analytics();
        firebase.auth();
        this.user = this.getUser();
    }


    getUser(){

        this.user = firebase.auth().currentUser;
        return this.user;
    }

    authListener() {
       firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = firebase.auth().currentUser;

            } else {
                console.log(user)
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