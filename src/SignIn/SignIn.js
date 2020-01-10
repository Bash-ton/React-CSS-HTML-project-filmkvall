import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./SingIn.css"


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userModel.getUser(),
            errorMessage: ""
        };
    }

    componentDidMount() {
        this.props.userModel.addObserver(this);
    }

    componentWillUnmount() {
        this.props.userModel.removeObserver(this);
    }

    update(){
        this.setState({
            user: this.props.userModel.getUser()
        })
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
    handleLogin(e){
    if(e.charCode === 13){
        this.props.userModel.doSignInUserWithEmailAndPassword(this.state.email,this.state.pass);
        }
    }

    render(){
        let sessionState = "";
        if(this.state.user === null){
                sessionState =
                    (<div>
                        <div className={"login-fields"}>
                            <input placeholder={"Email..."} className={"email-input"} onChange={evt => this.updateEmail(evt)} onKeyPress={evt=> this.handleLogin(evt)}/>
                            <input placeholder={"Password..."} id={"password"} className={"password-input"} type={"password"} onChange={evt => this.updatePass(evt)} onKeyPress={evt=> this.handleLogin(evt)}/>
                            <button className={"login-btn"} onClick={() => this.props.userModel.doSignInUserWithEmailAndPassword(this.state.email,this.state.pass)}> Login</button>
                        </div>
                        <div>
                        <Link to={"/ResetPassword"}>
                            <button className={"password-reset-btn"}>
                                Reset Password
                            </button>
                        </Link>
                        </div>
                    </div>);
        }
        else{
            sessionState = (<p>You are logged in</p>);
   
        }
        return(<div>
                    {sessionState}
               </div>)


    }
}

export default SignIn;
