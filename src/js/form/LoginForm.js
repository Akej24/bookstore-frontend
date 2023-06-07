import React, { useState } from "react"
import axios from "axios";
import Nav from "../ui/Nav";
import '../../css/form/Form.css';

export default function LoginForm() {

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const { email, password } = user;

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/login", user);
  }

  return (
    <>
      <Nav />
      <div class="submission-form">
        <form onSubmit={(e) => onSubmit(e)}>
          <h1><span>Log in</span></h1>
          <label htmlFor="email" class="inputBox">
            <span>
              Email
            </span>
            <input
              type="text"
              name="email"
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </label>
          <label htmlFor="password" class="inputBox">
            <span>
              Password
            </span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
          </label>
          <input type="submit" class="buttonBox" value="Send" />
          <input type="reset" class="buttonBox" value="Reset" />
        </form>
      </div>
    </>
  );
}
