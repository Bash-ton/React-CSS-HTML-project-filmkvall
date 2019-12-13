import React from "react";
import { Component } from "react";


class ResetPassword extends Component {
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

    render(){
        return(<div>
                <p>
                    Please provide the email linked to the account
                </p>
                    <input className={"releaseYear"} onChange={evt => this.updateEmail(evt)} />
                    <button onClick={() => this.props.userModel.doResetPassword(this.state.email)}>Send Link</button>
                </div>
        );
    }
}

export default ResetPassword;