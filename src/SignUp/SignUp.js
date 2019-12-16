import React from "react";
import { Component } from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.userModel.getUser()
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
        let session = null;
        if(this.state.user === null){
            session =
                (<div>
                    <input placeholder={"Email..."} className={"email-input"} onChange={evt => this.updateEmail(evt)} />
                    <input className={"Password..."} className={"password-input"} onChange={evt => this.updatePass(evt)}/>
                    <button onClick={() => this.props.userModel.doCreateUserWithEmailAndPassword(this.state.email,this.state.pass)}> Submit</button>
                </div>)
        }
        else{
            session =
                (<div>
                    <p>You are already logged in</p>
                </div>)
        }
        return(
            <div>
                {session}
            </div>

            );

    }
}

export default SignUp;