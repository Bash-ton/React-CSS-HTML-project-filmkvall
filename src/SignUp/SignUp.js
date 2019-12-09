import React from "react";
import { Component } from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
        return(
            <div>
                <input className={"releaseYear"} onChange={evt => this.updateEmail(evt)} />
                <input className={"releaseYear"} onChange={evt => this.updatePass(evt)}/>
                <button onClick={() => console.log(this.props.user.doCreateUserWithEmailAndPassword(this.state.email,this.state.pass))}> Submit</button>
            </div>);

    }
}

export default SignUp;