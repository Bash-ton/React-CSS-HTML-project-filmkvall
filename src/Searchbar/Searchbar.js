import React, { Component } from "react";
import SearchResult from "../SearchResult/SearchResult";
import "./Searchbar.css";
import { Link } from "react-router-dom";


class Searchbar extends Component {
    constructor(props) {
        super(props);
        // We create the state to store the various statuses
        // e.g. API data loading or error
        this.state = {
            title: "",
            user: this.props.user.getUser(),
            type: "movie"
        }
    }

    updateTitle(evt) {
        this.setState({
            title : evt.target.value
        });
    }

    updateType(evt) {
        this.setState({
            type : evt.target.value
        });
    }


    componentDidMount() {
        this.props.user.addObserver(this);
    }

    componentWillUnmount() {
        this.props.user.removeObserver(this);
    }

    update(){
        this.setState({
            user: this.props.user.getUser()
        });
        console.log(this.state.user)
    }

    render() {
        let userState = null;
        console.log(this.state.user);
        if(this.state.user === null){
            userState = (
                <div className={"user-authentication"}>
                    <Link to={"/SignIn"}>
                        <button>SignIn</button>
                    </Link>
                    <Link to={"/SignUp"}>
                        <button>SignUp</button>
                    </Link>
                </div>
            )
        }
        else{
            userState = (
                <div className={"user-authentication"}>
                    <Link to={"/MyPage"}>
                        <button>MyPage</button>
                    </Link>
                    <button onClick={this.props.user.doSignOutUser()}>SignOut</button>

                </div>

                )
            }

        return (
            <div className={"search-body"}>
                <Link to={"/"}>
                    <img src={"../Logo_2.png"}/>
                </Link>
                <div className={"search-field"}>
                    <select id={"search-select-type"} onChange={evt => this.updateType(evt)}>
                        <option value={"movie"}>Movie</option>
                        <option value={"tv"}>Tv-Series</option>
                    </select>
                    <input className={"search-input"} placeholder={"Search Movie"} onChange={evt => this.updateTitle(evt)}/>
                    <SearchResult title={this.state.title} type={this.state.type}/>
                </div>
                <div>
                    {userState}
                </div>
            </div>
        );
}
}

export default Searchbar;
