import React from "react";
import Nav from "./Nav";
import "./css/HomePage.css";

class HomePage extends React.Component{
    render(){
        return(
            <>
                <Nav />
                <div id="homepage">
                    <h1>Welcome to home page!</h1>
                </div><br />
            </>
        );
    }
}

export default HomePage;