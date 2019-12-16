import * as firebase from 'firebase';
import Observable from "./Observable";
import {fireconf} from "./apiConfig";

class UserModel extends Observable {
    constructor() {
        super();
        firebase.initializeApp(fireconf);
        firebase.analytics();
        firebase.auth();
        this.user = null;
        this.setUser();
    }

    setUser(){
        this.user = firebase.auth().currentUser
        this.notifyObservers()
    }

    getUser(){
        return this.user;

    }

    authListener() {
       firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if(user.emailVerified){
                    this.user = firebase.auth().currentUser;
                    this.notifyObservers();
                }
                else{
                    user.sendEmailVerification(); //Send email verification
                    alert("PleaseVerifyYourEmail") //Show success message
                }
            }
            else {
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
            // ...
        });

        this.authListener();
    }

    doCreateUserWithEmailAndPassword(email, password){
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user)=> {
                //Login is triggered --> line 4 in app.js
                user.sendEmailVerification(); //Send email verification
                alert("Please Verify Your Email"); //Show success message
                firebase.auth().signOut(); //Logout is triggered --> line 16 in app.js
            })
            .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.');
            } else if(errorCode === 'auth/invalid-email') {
                alert("Invalid email");
            }
            else if(errorCode === 'auth/operation-not-allowed') {
                alert("The service is not available, please try again later");
            }
            else if(errorCode === 'auth/email-already-in-use') {
                alert("The email is already in use \n If you have forgotten your password you can reset it please check the link below");
            }
            // ...
        })
    }

    doResetPassword(email){
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            // Email sent.
        }).catch(function(error) {
            // An error happened.
        });
    }

}
const userInstance = new UserModel();
export default userInstance;