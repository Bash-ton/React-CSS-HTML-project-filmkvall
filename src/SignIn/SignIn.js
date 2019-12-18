import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
			user: this.props.userModel.getUser(),

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

    render(){

        let sessionState = "";
        if(this.state.user === null){
                sessionState =
                    (<div>
                        <div>
                            <input placeholder={"Email..."} className={"email-input"} onChange={evt => this.updateEmail(evt)} />
                            <input placeholder={"Password..."} className={"password-input"} onChange={evt => this.updatePass(evt)}/>
                            <button onClick={() => this.props.userModel.doSignInUserWithEmailAndPassword(this.state.email,this.state.pass)}> Login</button>
                        </div>
                        <div>
                        <Link to={"/ResetPassword"}>
                                reset password
                            </Link>
                        </div>
                    </div>);
        }
        else{
            sessionState = (<p>You are logged in</p>);
            console.log(this.state.user);
        }
        return(<div>
                    {sessionState}
               </div>)


    }
}

export default SignIn;