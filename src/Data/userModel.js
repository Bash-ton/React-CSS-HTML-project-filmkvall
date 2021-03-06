import * as firebase from 'firebase';
import Observable from "./Observable";
import { fireconf } from "./apiConfig";
import userRatingInstance from "./userRating"


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
        this.authListener();
    }

    getUser(){
        return this.user;
	}

    authListener() {
       firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (user.emailVerified) {
                    this.user = firebase.auth().currentUser;
                    userRatingInstance.setUserID(user.uid);
                    userRatingInstance.getList();
                    this.notifyObservers();
                } else {
                    user.sendEmailVerification(); //Send email verification
                    alert("PleaseVerifyYourEmail") //Show success message
                }
            }
            else {
                userRatingInstance.setUserID(null);
                userRatingInstance.clearList();
                this.user = null;
                this.notifyObservers();
            }
        });
    }

    doSignOutUser(){
		firebase.auth().signOut().then(function () {
      
        }, function(error) {
            console.error('Sign Out Error', error);
			});

        this.authListener();
    }

    doSignInUserWithEmailAndPassword(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(err) {
            if (err.code === 'auth/wrong-password') {
                alert( "The password is incorrect please try again");
            }
            else if(err.code === "auth/user-disabled"){
                alert("Wow i dont know what you did to get your account disabled but im sure you deserved it");
            }
            else if(err.code === "auth/user-not-found"){
                alert("There is no user corresponding to the given email.")
            }
            else if(err.code === "auth/invalid-email"){
                alert("The email address is not valid.")
            }
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
