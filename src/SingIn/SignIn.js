import React from "react";
import { Component } from "react";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user.getUser()
        };
    }

    componentDidMount() {
        this.props.user.addObserver(this);
    }

    componentWillUnmount() {
        this.props.user.removeObserver(this);
    }

    update(){
        this.setState({
            user: this.props.user
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
        if(this.state.user === 0){
            sessionState =
               (<div>
                    <input className={"releaseYear"} onChange={evt => this.updateEmail(evt)} />
                    <input className={"releaseYear"} onChange={evt => this.updatePass(evt)}/>
                    <button onClick={() => this.props.user.doSignInUserWithEmailAndPassword(this.state.email,this.state.pass)}> Login</button>
                </div>);
        }
        else{
            sessionState = (<p>You are logged in</p>)
            console.log(this.state.user.getUser());
        }
        return(<div>
                    {sessionState}
               </div>)


    }
}

export default SignIn;