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
            user: this.props.userModel.getUser(),
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
        this.props.userModel.addObserver(this);
        document.addEventListener("click", this.handelClick,false)
    }

    componentWillUnmount() {
        this.props.userModel.removeObserver(this);
        document.removeEventListener("click", this.handelClick,false)
    }

    handelClick = (e)=> {
        if(this.node === e.target){
            document.getElementById("search-result-given").style.display = "block"
            return;
        }
        document.getElementById("search-result-given").style.display = "none";
    }

    update(){
        this.setState({
            user: this.props.userModel.getUser()
        })
    }
    getType(){
        if(this.state.type === "movie")
            return "Movie";
        else if(this.state.type === "actor"){
            return "Actor"
        }
        else{
            return "Tv-Series"
        }
    }

    render() {
        let userState = null;
        if(this.state.user === null){
            userState = (
                <div className={"user-authentication"}>
                    <Link to={"/SignIn"} >
                        <button className={"nav-button"}>SignIn</button>
                    </Link>
                    <Link to={"/SignUp"}>
                        <button className={"nav-button"}>SignUp</button>
                    </Link>
                </div>
            )
        }
        else{
            userState = (
                <div className={"user-authentication"}>
                    <Link to={"/MyPage"}>
                        <button className={"nav-button"}><i className="fa fa-home">MyPage</i></button>
                    </Link>
                    <button className={"nav-button"} onClick={() => this.props.userModel.doSignOutUser()}>SignOut</button>
                </div>
                )
            }

        return (
            <div className={"search-body"}>
                <Link to={"/"}>
                    <img src={"../Logo_2.png"}/>
                </Link>
                <div className={"search-field"}>
                    <select onChange={evt => this.updateType(evt)}>
                        <option value={"movie"}>Movie</option>
                        <option value={"tv"}>Tv-Series</option>
                        <option value={"actor"}>Actor</option>
                    </select>
                    <div>
                        <input className={"search-input"} placeholder={"Search " + this.getType()} onClick={evt => this.handelClick(evt)} onChange={evt => this.updateTitle(evt)} ref={node => this.node = node}/>
                        <div id={"search-result-given"}>
                            <SearchResult title={this.state.title} type={this.state.type}/>
                        </div>
                    </div>
                </div>

                <div className={"search-buttons"}>
                    {userState}
                </div>
            </div>
        );
}
}

export default Searchbar;
