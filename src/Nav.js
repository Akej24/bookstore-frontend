import React from "react";
import "./css/Nav.css";

class Nav extends React.Component {
  render() {
    return (
      <>
        <div id="nav">
          <a href="/">
            <span>home page</span>
          </a>
          <a href="/login">
            <span>log in</span>
          </a>
          <a href="/registration">
            <span>register</span>
          </a>
          <a href="/createBook">
            <span>book form</span>
          </a>
          <a href="/getAllBooks">
            <span>books table</span>
          </a>
        </div>
      </>
    )
  }
}

export default Nav;